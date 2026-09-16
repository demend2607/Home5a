import asyncio

from fastapi import APIRouter, Request

from schemas.weather import WeatherResponse
from services.ha_exceptions import HAAuthError, HANotFoundError, HAClientConnectionError, HAClientError

from core.config import settings

router = APIRouter(prefix=settings.api.v1.health, tags=["Health"])
sensors = {
    "temperature_sensor": "sensor.t06_temperatura_na_ulitse_temperature",
    "temperature_forcast": "weather.pogoda",
    # "hall_light": "switch.0xa4c138fbcc257467"
}


@router.get("", description="Get info about sensor")
async def health_check(request: Request):
    ha_client = request.app.state.ha_client

    temp_task = ha_client.get_single_state(sensors["temperature_sensor"])
    forecast_task = ha_client.get_whole_state(sensors["temperature_forcast"])

    forecast_result = await asyncio.gather(
        temp_task, forecast_task, return_exceptions=True
    )

    return {"gis_meteo": forecast_result}

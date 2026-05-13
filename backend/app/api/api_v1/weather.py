import asyncio

from fastapi import APIRouter, Request

from schemas.weather import WeatherResponse
from services.ha_exceptions import HAAuthError, HANotFoundError, HAClientConnectionError, HAClientError

from core.config import settings
from services.weather_map import WEATHER_DESCRIPTIONS

router = APIRouter(prefix=settings.api.v1.weather, tags=["Weather"])

sensors = {
    "temperature_sensor": "sensor.0xa4c13828c74f0ad3_temperature",
    "temperature_forcast": "weather.home",
}


@router.get("", response_model=WeatherResponse)
async def get_weather(request: Request):
    ha_client = request.app.state.ha_client

    temp_task = ha_client.get_single_state(sensors["temperature_sensor"])
    forecast_task = ha_client.get_whole_state(sensors["temperature_forcast"])

    temp_result, forecast_result = await asyncio.gather(
        temp_task, forecast_task, return_exceptions=True
    )
    # print(forecast_result.get("state"))
    if ((forecast_result.get("state")) == 'clear-night'):
        forecast_result = {
            "description": 'Ясно',
            'icon_key': 'clear',
            "temperature": forecast_result.get("attributes", {}).get("temperature"),
            "apparent_temperature": forecast_result.get("attributes", {}).get("apparent_temperature"),
            "humidity": forecast_result.get("attributes", {}).get("humidity"),
            "wind_speed": forecast_result.get("attributes", {}).get("wind_speed"),
            "presure": forecast_result.get("attributes", {}).get("pressure"),
        }
    else:
        forecast_result = {
            # "description": forecast_result.get("state"),
            "description": WEATHER_DESCRIPTIONS.get(forecast_result.get("state")),
            'icon_key': forecast_result.get("state"),
            "temperature": forecast_result.get("attributes", {}).get("temperature"),
            "apparent_temperature": forecast_result.get("attributes", {}).get("apparent_temperature"),
            "humidity": forecast_result.get("attributes", {}).get("humidity"),
            "wind_speed": forecast_result.get("attributes", {}).get("wind_speed"),
            "presure": forecast_result.get("attributes", {}).get("pressure"),
        }

    return {"temp_from_ha": temp_result, "forecast_temp": forecast_result}

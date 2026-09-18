import asyncio

from fastapi import APIRouter, Request
from pydantic import TypeAdapter, ValidationError

from schemas.weather import WeatherResponse, WeatherFromForecast

from core.config import settings

from services.weather_map import WEATHER_DESCRIPTIONS

router = APIRouter(prefix=settings.api.v1.weather, tags=["Weather"])

sensors = {
    "temperature_home_sensor": "sensor.t06_temperatura_na_ulitse_temperature",
    "temperature_forcast": "weather.yandex_weather",
}


def _forecast_modification(
    forecast: WeatherFromForecast | None,
) -> WeatherFromForecast | None:

    if forecast is None:
        return forecast

    forecast.description = WEATHER_DESCRIPTIONS.get(
        forecast.state,
        forecast.state,
    )
    return forecast


@router.get("", response_model=WeatherResponse, description="Get weather from ho gis meteo + home outside sensor")
async def get_weather(request: Request):
    ha_client = request.app.state.ha_client

    temp_task = ha_client.get_single_state(
        sensors["temperature_home_sensor"])
    forecast_task = ha_client.get_whole_state(sensors["temperature_forcast"])

    temp_result, forecast_result = await asyncio.gather(
        temp_task, forecast_task, return_exceptions=True
    )
    if isinstance(temp_result, Exception):
        temp = None
    else:
        try:
            temp = TypeAdapter(float).validate_python(temp_result)
        except ValidationError:
            temp = None

    if isinstance(forecast_result, Exception):
        forecast = None
    else:
        try:
            forecast = WeatherFromForecast.model_validate(forecast_result)
        except ValidationError:
            forecast = None

    forecast = _forecast_modification(forecast)

    return WeatherResponse(
        temp_from_ha=temp,
        forecast_temp=forecast,
    )

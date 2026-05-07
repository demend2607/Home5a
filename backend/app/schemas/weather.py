from pydantic import BaseModel


class WeatherFromForecast(BaseModel):
    description: str
    icon_key: str
    temperature: float
    apparent_temperature: float
    humidity: float
    wind_speed: float
    presure: float


class WeatherResponse(BaseModel):
    temp_from_ha: float
    forecast_temp: WeatherFromForecast

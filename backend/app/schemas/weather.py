from pydantic import BaseModel, ConfigDict, Field


class YandexAtt(BaseModel):
    model_config = ConfigDict(extra="ignore")

    temperature: float
    wind_speed: float
    feels_like: float
    yandex_condition: str


class WeatherFromForecast(BaseModel):
    model_config = ConfigDict(extra="ignore")

    state: str
    description: str = ""
    attributes: YandexAtt


class WeatherResponse(BaseModel):
    temp_from_ha: float | None
    forecast_temp: WeatherFromForecast | None

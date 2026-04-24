from pydantic import BaseModel, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class RunConfig(BaseModel):
    host: str = "localhost"
    port: int = 8000


class ApiV1Prefix(BaseModel):
    prefix: str = "/v1"
    health: str = "/health"
    photo: str = "/photo"
    weather: str = "/weather"


class ApiPrefix(BaseModel):
    prefix: str = "/api"
    v1: ApiV1Prefix = ApiV1Prefix()


class WeatherConfig(BaseModel):
    api_key: str
    city: str = "Khabarovsk"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", extra="ignore", env_nested_delimiter="__"
    )
    run: RunConfig = RunConfig()
    api: ApiPrefix = ApiPrefix()
    weather: WeatherConfig


settings = Settings()

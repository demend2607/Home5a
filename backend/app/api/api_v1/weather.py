from fastapi import APIRouter, HTTPException
import httpx

from core.config import settings
from schamas.weather import WeatherResponse

router = APIRouter(prefix=settings.api.v1.weather)


@router.get("")
async def get_weather():
    HA_URL = "http://192.168.100.40:8123"
    HA_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxMjdlMzFiODg5NjM0MGIzODU1MDFmODc2NzQxMjE3NiIsImlhdCI6MTc3Njk1MTQ5OSwiZXhwIjoyMDkyMzExNDk5fQ.53nO17f1Olpgs2Ap5PqXMx5xRsAOtRvN8lQ1Jt_eoJY"
    entity_id = "weather.home"
    async with httpx.AsyncClient() as client:
        headers = {"Authorization": f"Bearer {HA_TOKEN}"}
    async with httpx.AsyncClient() as client:
        try:
            # Делаем запрос к API Home Assistant
            response = await client.get(f"{HA_URL}/api/states/{entity_id}", headers=headers, timeout=10.0)
            response.raise_for_status()  # Выбросит исключение для статусов 4xx/5xx
            return response.json()  # Возвращаем JSON с состоянием сущности
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 404:
                raise HTTPException(
                    status_code=404, detail=f"Сущность с ID '{entity_id}' не найдена.")
            raise HTTPException(
                status_code=e.response.status_code, detail=e.response.text)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

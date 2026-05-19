import asyncio
from typing import Literal

from fastapi import APIRouter, Request

from schemas.weather import WeatherResponse
from services.ha_exceptions import HAAuthError, HANotFoundError, HAClientConnectionError, HAClientError

from core.config import settings

router = APIRouter(prefix=settings.api.v1.sensor, tags=["Sensor"])
sensors = {
    "temperature_sensor": "sensor.0xa4c13828c74f0ad3_temperature",
    "temperature_forcast": "weather.home",
    "hall_light": "52_zal_switch_1"
}


@router.post("", description="Change sensor state [on/off]")
async def sensor_change_status(entity_id: str, state: Literal["on", "off"], request: Request):
    ha_client = request.app.state.ha_client
    domain = entity_id.split(".")[0]

    service = f"turn_{state}"

    # Make a call
    await ha_client.call_service(domain, service, entity_id)
    await asyncio.sleep(0.5)

    # get current status
    new_state = await ha_client.get_single_state(entity_id)
    return {"status": state, "new_state": new_state}

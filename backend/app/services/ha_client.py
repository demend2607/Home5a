import httpx
from typing import Dict, Any, List, Literal, Optional

from .ha_exceptions import HAClientError, HAAuthError, HANotFoundError, HAClientConnectionError


class HAClient:
    def __init__(self, base_url: str, token: str):
        self.base_url = base_url.rstrip('/')
        self.headers = {"Authorization": f"Bearer {token}",
                        "Content-Type": "application/json"}
        self.client = None

    async def start(self):
        self.client = httpx.AsyncClient(
            base_url=self.base_url,
            headers=self.headers,
            timeout=10.0
        )

    async def stop(self):
        if self.client:
            await self.client.aclose()

    async def _request(self, method: str, path: str, **kwargs):
        try:
            response = await self.client.request(method, path, **kwargs)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 401:
                raise HAAuthError("Неверный токен доступа")
            elif e.response.status_code == 404:
                raise HANotFoundError(f"Сущность {path} не найдена")
            else:
                raise HAClientError(
                    f"HTTP {e.response.status_code}: {e.response.text}")
        except httpx.TimeoutException:
            raise HAClientError("Таймаут подключения к Home Assistant")
        except Exception as e:
            raise HAClientError(f"Неизвестная ошибка: {e}")

    async def get_single_state(self, entity_id: str):
        responce = await self._request("GET", f"/api/states/{entity_id}")
        data = responce.get("state")
        return data

    async def get_whole_state(self, entity_id: str):
        return await self._request("GET", f"/api/states/{entity_id}")

    async def call_service(self, domain: str, service: str, entity_id: str):
        return await self._request("POST", f"/api/services/{domain}/{service}", json={"entity_id": entity_id})

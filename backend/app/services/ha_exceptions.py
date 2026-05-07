class HAClientError(Exception):
    """Базовое исключение для всех ошибок HA клиента."""
    pass


class HAClientConnectionError(HAClientError):
    """Ошибка соединения с Home Assistant (таймаут, сеть)."""
    pass


class HAAuthError(HAClientError):
    """Ошибка авторизации (401)."""
    pass


class HANotFoundError(HAClientError):
    """Сущность не найдена (404)."""
    pass


class HABadRequestError(HAClientError):
    """Некорректный запрос (400)."""
    pass

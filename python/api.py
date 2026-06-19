import os
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI

from mcp_server import mcp

_mcp_app = mcp.http_app(path="/")


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with _mcp_app.lifespan(app):
        yield


app = FastAPI(lifespan=lifespan)
app.mount("/mcp", _mcp_app)


@app.get("/health")
def health():
    return {"status": "ok"}


def _resolve_port() -> int:
    """Read PORT from the env, falling back to 8000 if missing or invalid.

    lnar may inject an out-of-range PORT; bind a valid port (1-65535) so the
    server still starts and the deploy readiness probe can reach it.
    """
    try:
        port = int(os.environ.get("PORT", "8000"))
    except ValueError:
        return 8000
    return port if 1 <= port <= 65535 else 8000


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=_resolve_port())

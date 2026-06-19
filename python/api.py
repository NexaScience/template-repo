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


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", "8000")))

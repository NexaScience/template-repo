import os

import uvicorn
from fastmcp import FastMCP
from starlette.applications import Starlette
from starlette.routing import Mount

mcp = FastMCP(name="mcp-server", version="0.1.0")


@mcp.tool
def hello(name: str = "world") -> str:
    """Sample tool. Replace these with your own tools."""
    return f"Hello, {name}!"


# Mount the MCP app at /mcp so the canonical endpoint is /mcp/ (trailing slash),
# matching how MCP clients and the lnar readiness probe reach the server.
_mcp_app = mcp.http_app(path="/")
app = Starlette(routes=[Mount("/mcp", app=_mcp_app)], lifespan=_mcp_app.lifespan)


def main() -> None:
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", "8000")))


if __name__ == "__main__":
    main()

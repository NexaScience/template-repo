# lnar-python-template

A minimal **MCP server** scaffold (Python + [FastMCP](https://github.com/jlowin/fastmcp)),
ready to deploy on lnar. Add your tools, push, and lnar builds and hosts it automatically.

## Add your tools

Edit `src/mcp_server/server.py` and define functions decorated with `@mcp.tool`:

```python
@mcp.tool
def add(a: float, b: float) -> float:
    """Return a + b."""
    return a + b
```

## Run locally

```bash
pip install .
PORT=8000 mcp-server
# MCP endpoint: http://localhost:8000/mcp/
```

Or with uvicorn directly:

```bash
uvicorn mcp_server.server:app --host 0.0.0.0 --port 8000
```

## Deploy (lnar)

- No Dockerfile needed — lnar generates one from `pyproject.toml`.
- The server binds `0.0.0.0:$PORT` and exposes the MCP endpoint at **`/mcp/`** over Streamable HTTP.
- Start command: `uvicorn mcp_server.server:app --host 0.0.0.0 --port $PORT`

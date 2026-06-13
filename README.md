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
pip install -r requirements.txt
PORT=8000 python src/mcp_server/server.py
# MCP endpoint: http://localhost:8000/mcp/
```

## Deploy (lnar)

- No Dockerfile needed — lnar installs `requirements.txt` and runs the server from source.
- Dependencies live in `requirements.txt`. This is **not** a pip-installable package,
  so there is no build step (and no `pip install .` ordering trap).
- The server binds `0.0.0.0:$PORT` and exposes the MCP endpoint at **`/mcp/`** over Streamable HTTP.
- Start command: `python src/mcp_server/server.py` (reads `$PORT`).

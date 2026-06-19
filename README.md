# lnar MCP server template

Dual-runtime template for lnar `create_mcp`. Pick the implementation language at
interview time; the generator promotes the matching subdirectory to the repo root
before editing, so the produced repo is a clean single-language project.

```
template-repo/
├── python/   FastAPI + FastMCP server (api.py, mcp_server.py, pyproject.toml)
└── node/     Node.js / TypeScript MCP server, ext-apps ready (main.ts, server.ts, package.json)
```

## Deployment contract (both runtimes)

Each runtime satisfies the lnar hosting readiness probe:

- reads the listen port from the environment (`PORT`) and binds `0.0.0.0`
- exposes the MCP server at `/mcp/` (a `POST /mcp/` JSON-RPC `initialize` returns HTTP 200)
- exposes a health endpoint

## python/

```bash
cd python
uv sync
uv run python api.py   # serves /mcp and /health on $PORT (default 8000)
```

## node/

```bash
cd node
npm install
npm start              # serves /mcp and /health on $PORT (default 8000)
```

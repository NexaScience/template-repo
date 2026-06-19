import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

import { createServer } from "./server.js";

const app = express();
app.use(express.json());

// Health endpoint (deployment readiness probe checks this).
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// MCP Streamable HTTP endpoint — stateless: one transport per request.
// POST /mcp/ performs the JSON-RPC initialize handshake (must return HTTP 200).
app.post("/mcp", async (req, res) => {
  try {
    const server = createServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    res.on("close", () => {
      transport.close();
      server.close();
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    console.error("Error handling MCP request:", err);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal server error" },
        id: null,
      });
    }
  }
});

// HARD REQUIREMENT: read the port from PORT and bind 0.0.0.0 (never localhost,
// never a hard-coded port) so the lnar deployment can reach the server.
// Guard against a missing/invalid injected PORT (non-numeric or outside the
// 1-65535 range): fall back to 8000 so the server still starts and the deploy
// readiness probe can reach it.
function resolvePort(raw: string | undefined): number {
  const parsed = Number(raw);
  if (Number.isInteger(parsed) && parsed >= 1 && parsed <= 65535) {
    return parsed;
  }
  return 8000;
}

const port = resolvePort(process.env.PORT);
app.listen(port, "0.0.0.0", () => {
  console.log(`MCP server listening on http://0.0.0.0:${port}/mcp`);
});

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

/**
 * Build the MCP server and register all tools.
 *
 * Add or change MCP tools here with `server.registerTool(...)`.
 *
 * Optional UI (ext-apps): this template is ext-apps ready. To surface an
 * interactive UI, register a `ui://` resource and link it from a tool result
 * via `_meta` (see https://github.com/modelcontextprotocol/ext-apps). The
 * default skeleton is headless / tools-only.
 */
export function createServer(): McpServer {
  const server = new McpServer({ name: "mcp-server", version: "0.1.0" });

  server.registerTool(
    "hello",
    {
      title: "Hello",
      description: "Greet someone by name.",
      inputSchema: { name: z.string().default("world") },
    },
    async ({ name }) => ({
      content: [{ type: "text", text: `Hello, ${name}!` }],
    }),
  );

  return server;
}

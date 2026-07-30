import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerCurrencyTool } from "./tools/currencyTool.js";

// Create the MCP server instance
const server = new McpServer({
    name: "CurrencyConverter",
    version: "1.0.0"
});

// Register all tools
registerCurrencyTool(server);

// Start server with Stdio transport
async function startServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("CurrencyConverter MCP Server Started");
}

startServer().catch((error) => {
    console.error("failed to start mcp server:", error);
    process.exit(1);
});

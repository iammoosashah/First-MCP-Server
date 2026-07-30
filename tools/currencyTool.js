import { z } from "zod";

/**
 * Registers the ConvertCurrency tool onto the given MCP server instance.
 * @param {import("@modelcontextprotocol/sdk/server/mcp.js").McpServer} server
 */
export function registerCurrencyTool(server) {
    server.tool(
        "ConvertCurrency",
        "convert amount from one currency to another currency",
        {
            amount: z.number().describe("enter the amount"),
            from: z.string().describe("enter from currency"),
            to: z.string().describe("enter to currency")
        },
        async ({ amount, from, to }) => {
            try {
                const res = await fetch(`https://open.er-api.com/v6/latest/${from.toUpperCase()}`);
                const data = await res.json();
                const rate = data.rates[to.toUpperCase()];

                if (!rate) {
                    throw new Error(`Unsupported currency code: ${to.toUpperCase()}`);
                }

                const converted = (amount * rate).toFixed(2);
                const result = `${amount} ${from.toUpperCase()} is equal to ${converted} ${to.toUpperCase()}`;

                return {
                    content: [
                        {
                            type: "text",
                            text: result
                        }
                    ]
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: "text",
                            text: `An error occurred while converting currency: ${error.message}`
                        }
                    ]
                };
            }
        }
    );
}

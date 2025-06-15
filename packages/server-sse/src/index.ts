import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

type Env = {
	AlgorandRemoteMCP: DurableObjectNamespace<AlgorandRemoteMCP>;
};
type State = { counter: number };
// Define our MCP agent with tools
export class AlgorandRemoteMCP extends McpAgent<Env, State, {}> {
	server = new McpServer({
		name: "Algorand Remote MCP",
		version: "1.0.0",
	});
	initialState: State = {
		counter: 1,
	};

	async init() {
		this.server.resource("counter", "mcp://resource/counter", (uri) => {
			return {
				contents: [{ uri: uri.href, text: String(this.state.counter) }],
			};
		});
		this.server.tool(
			"count",
			"Add to the counter, stored in the MCP",
			{ a: z.number() },
			async ({ a }) => {
				this.setState({ ...this.state, counter: this.state.counter + a });

				return {
					content: [
						{
							type: "text",
							text: String(`Added ${a}, total is now ${this.state.counter}`),
						},
					],
				};
			}
		);
		// Simple addition tool
		// this.server.tool(
		// 	"add",
		// 	{ a: z.number(), b: z.number() },
		// 	async ({ a, b }) => ({
		// 		content: [{ type: "text", text: String(a + b) }],
		// 	})
		// );

		// Calculator tool with multiple operations
		// this.server.tool(
		// 	"calculate",
		// 	{
		// 		operation: z.enum(["add", "subtract", "multiply", "divide"]),
		// 		a: z.number(),
		// 		b: z.number(),
		// 	},
		// 	async ({ operation, a, b }) => {
		// 		let result: number;
		// 		switch (operation) {
		// 			case "add":
		// 				result = a + b;
		// 				break;
		// 			case "subtract":
		// 				result = a - b;
		// 				break;
		// 			case "multiply":
		// 				result = a * b;
		// 				break;
		// 			case "divide":
		// 				if (b === 0)
		// 					return {
		// 						content: [
		// 							{
		// 								type: "text",
		// 								text: "Error: Cannot divide by zero",
		// 							},
		// 						],
		// 					};
		// 				result = a / b;
		// 				break;
		// 		}
		// 		return { content: [{ type: "text", text: String(result) }] };
		// 	}
		// );
	}
	onStateUpdate(state: State) {
		console.log({ stateUpdate: state });
	}
}
// export default AlgorandRemoteMCP.mount("/sse", {
//   binding: "AlgorandRemoteMCP",
// });

export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url);
		console.log("Request URL:", url.pathname);

		if (url.pathname === "/sse" || url.pathname === "/sse/message") {
			console.log("Serving SSE endpoint");
			console.log("Request Headers:", request.headers);
			return AlgorandRemoteMCP.serveSSE("/sse", {
				binding: "AlgorandRemoteMCP",
				// corsOptions: {
				// 	origin: "*",
				// 	methods: "GET, POST, OPTIONS",
				// 	headers: "Content-Type, Authorization",
				// 	maxAge: 3600,
				// },	
			}).fetch(request, env, ctx);
		}

		if (url.pathname === "/mcp") {
			console.log("Serving MCP endpoint");
		
			return AlgorandRemoteMCP.serve("/mcp").fetch(request, env, ctx);
		}

		return new Response("Not found", { status: 404 });
	},
};

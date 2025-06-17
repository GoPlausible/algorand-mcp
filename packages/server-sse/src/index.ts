import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { Env, State } from './types';
import { ResponseProcessor } from './utils';
import { 
	registerAccountTools, 
	registerGeneralTransactionTools, 
	registerAssetTransactionTools,
	registerAppTransactionTools,
	registerGroupTransactionTools,
	registerUtilityTools,
	registerAlgodTools,
	registerArc26Tools,
	registerApiTools,
	registerKnowledgeTools,
	registerWalletTools
} from './tools';
import { registerWalletResources, registerKnowledgeResources, registerGuideResource } from './resources';

// Define our MCP agent with tools
export class AlgorandRemoteMCP extends McpAgent<Env, State, {}> {
	server = new McpServer({
		name: "Algorand Remote MCP",
		version: "1.0.0",
	});
	
	// Initialize state with default values
	initialState: State = {
		items_per_page: 10
	};

	// Initialization function that sets up tools and resources
	async init() {
		// Configure ResponseProcessor with pagination settings
		console.log("Initializing Algorand Remote MCP...");
		console.log("Current state:", this.state);
		// Set default page size or use from state if available
		const itemsPerPage = this.state?.items_per_page || 10;
		ResponseProcessor.setItemsPerPage(itemsPerPage);
		
		// Register resources
		this.registerWalletResources();
		this.registerKnowledgeResources();
		this.registerGuideResources();
		
	// Register tools by category
	this.registerBasicUtilityTools();
	this.registerAccountTools();
	this.registerTransactionTools();
	this.registerAlgodTools();
	this.registerArc26Tools();
	this.registerApiTools();
	this.registerKnowledgeTools();
	this.registerWalletTools();
		
		// Additional tool categories will be added here
	}
	
	/**
	 * Register wallet resources
	 */
	private registerWalletResources() {
		// Register all wallet-related resources
		// Since this might contain parameters from env, we pass env to the function
		registerWalletResources(this.server, this.env as Env);
	}
	
	/**
	 * Register knowledge resources
	 */
	private registerKnowledgeResources() {
		// Register knowledge resources for documentation access
		// Pass environment for R2 bucket access
		registerKnowledgeResources(this.server, this.env as Env);
	}
	
	/**
	 * Register guide resources
	 */
	private registerGuideResources() {
		// Register guide resources for agent usage guidance
		registerGuideResource(this.server, this.env as Env);
	}
	
	/**
	 * Register basic utility tools
	 */
	private registerBasicUtilityTools() {
		// Register Algorand utility tools
		registerUtilityTools(this.server);
	}
	
	/**
	 * Register account management tools
	 */
	private registerAccountTools() {
		// Register all account-related tools
		registerAccountTools(this.server);
	}
	
	/**
	 * Register transaction management tools
	 */
	private registerTransactionTools() {
		// Register payment transaction tools
		registerGeneralTransactionTools(this.server);
		
		// Register asset transaction tools
		registerAssetTransactionTools(this.server);
		
		// Register application transaction tools
		registerAppTransactionTools(this.server);
		
		// Register group transaction tools
		registerGroupTransactionTools(this.server);
	}
	
	/**
	 * Register Algorand node interaction tools
	 */
	private registerAlgodTools() {
		// Register algod tools for TEAL compilation and simulation
		registerAlgodTools(this.server);
	}
	
	/**
	 * Register ARC-26 URI generation tools
	 */
	private registerArc26Tools() {
		// Register ARC-26 URI generation tools
		registerArc26Tools(this.server);
	}
	
	/**
	 * Register API integration tools
	 */
	private registerApiTools() {
		// Register external API integration tools
		registerApiTools(this.server);
	}
	
	/**
	 * Register Knowledge tools for documentation access
	 */
	private registerKnowledgeTools() {
		// Register knowledge documentation tools
		registerKnowledgeTools(this.server, this.env);
	}
	
	/**
	 * Register Wallet tools for wallet information access
	 */
	private registerWalletTools() {
		// Register wallet management tools
		registerWalletTools(this.server, this.env);
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
		
			return AlgorandRemoteMCP.serve("/mcp", {
				binding: "MCP_OBJECT"
			}).fetch(request, env, ctx);
		}

		return new Response("Not found", { status: 404 });
	},
};

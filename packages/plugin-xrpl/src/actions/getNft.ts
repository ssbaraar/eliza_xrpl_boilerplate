import {
	elizaLogger,
	Action,
	HandlerCallback,
	IAgentRuntime,
	Memory,
	State,
	generateText,
	ModelClass,
	composeContext,
	ActionExample,
	stringToUuid
} from "@elizaos/core";
import { getNftService } from "../services/getNftService";
import { formatNftDetailsTemplate } from "../templates";
import { getNftExamples } from "../examples/getNftExamples";

export const getNft: Action = {
	name: "GET_NFT",
	similes: [
		"NFT_INFO",
		"NFT_DETAILS",
		"CHECK_NFT",
		"VIEW_NFT",
		"SHOW_NFT"
	],
	description: "Gets details about an NFT on the XRP Ledger",

	validate: async (runtime: IAgentRuntime, message: Memory) => {
		const text = message.content.text || '';
		const nftIdMatch = text.match(/[A-F0-9]{64}/i);
		return !!nftIdMatch;
	},

	handler: async (
		runtime: IAgentRuntime,
		message: Memory,
		state: State,
		_options: { [key: string]: unknown },
		callback: HandlerCallback
	) => {
		try {
			const text = message.content.text || '';
			const nftIdMatch = text.match(/[A-F0-9]{64}/i);
			
			if (!nftIdMatch) {
				return false;
			}

			const nftId = nftIdMatch[0];
			elizaLogger.log(`Fetching details for NFT: ${nftId}`);

			const nftDetails = await getNftService(nftId);

			// Set state with pre-formatted strings
			state.nftId = nftDetails.tokenId;
			state.uri = nftDetails.uri;
			state.owner = nftDetails.owner;
			state.transferFee = nftDetails.transferFee / 1000;
			state.serialNumber = nftDetails.serialNumber;
			state.burnableStatus = (nftDetails.flags & 1) ? "Not Burnable" : "Is Burnable";
			state.transferableStatus = (nftDetails.flags & 8) ? "Not Transferable" : "Is Transferable";
			state.taxon = nftDetails.taxon;

			const context = composeContext({
				state,
				template: formatNftDetailsTemplate
			});

			const response = await generateText({
				runtime,
				context,
				modelClass: ModelClass.SMALL
			});

			// Create memory
			await runtime.messageManager.createMemory({
				id: stringToUuid(Date.now().toString()),
				content: { text: response },
				userId: runtime.agentId,
				roomId: message.roomId,
				agentId: runtime.agentId
			});

			if (callback) {
				callback({
					text: response,
					inReplyTo: message.id
				});
			}

			return true;

		} catch (error: any) {
			elizaLogger.error("Error in XRPL NFT info handler:", error);
			if (callback) {
				const errorMessage = error.message || "An error occurred while retrieving the NFT details.";
				callback({
					text: `❌ Failed to get NFT details: ${errorMessage}`,
					inReplyTo: message.id
				});
			}
			return false;
		}
	},
	examples: getNftExamples as ActionExample[][],
} as Action;

export default getNft;
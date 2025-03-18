import { type Plugin } from "@elizaos/core";
import createNft from "./actions/createNFT";
import getBalance from "./actions/getBalance";
import sendTransaction from "./actions/sendTransaction";

export const xrplPlugin: Plugin = {
	name: "@elizaos-plugins/plugin-xrpl",
	description: "Plugin for interacting with the XRP Ledger",
	config: [],
	actions: [
		createNft,
		getBalance,
		sendTransaction,
	],
	providers: [],
	evaluators: [],
	services: [],
	clients: [],
	adapters: []
};

export { xrplPlugin as default };

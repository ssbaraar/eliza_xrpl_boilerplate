import { type Plugin } from "@elizaos/core";

import createNft from "./actions/createNFT";
import getBalance from "./actions/getBalance";
import sendTransaction from "./actions/sendTransaction";
import getTransaction from "./actions/getTransaction";
import getNft from "./actions/getNft";

export const xrplPlugin: Plugin = {
	name: "@elizaos-plugins/plugin-xrpl",
	description: "Plugin for interacting with the XRP Ledger",
	config: [],
	actions: [
		createNft,
		getBalance,
		getTransaction,
		sendTransaction,
		getNft,
	],
	providers: [],
	evaluators: [],
	services: [],
	clients: [],
	adapters: []
};

export { xrplPlugin as default };

import { ActionExample } from "@elizaos/core";

export const getBalanceExamples: ActionExample[][] = [
	[
		{
			user: "{{user1}}",
			content: { text: "Yo Bob, tu peux checker le wallet {walletXrpAddress} ?" }
		},
		{
			user: "{{agent}}",
			content: { text: "Yes mon pote ! Je regarde ce que ce wallet a dans le ventre ! 🚀", action: "GET_BALANCE" }
		}
	],
	[
		{
			user: "{{user1}}",
			content: { text: "Combien de XRP a {walletXrpAddress} ?" }
		},
		{
			user: "{{agent}}",
			content: { text: "Je check ça direct frérot, on va voir combien de XRP il y a là-dedans ! 😎", action: "GET_BALANCE" }
		}
	],
	[
		{
			user: "{{user1}}",
			content: { text: `Quel est le solde de {walletXrpAddress} stp` }
		},
		{
			user: "{{agent}}",
			content: { text: "Carrément ! Je jette un œil aux XRP de ce wallet, deux secondes ! 🔥", action: "GET_BALANCE" }
		}
	],
	[
		{
			user: "{{user1}}",
			content: { text: "Il a combien sur cette adresse {walletXrpAddress}" }
		},
		{
			user: "{{agent}}",
			content: { text: "Je regarde ça pour vous, un instant ! 🔍", action: "GET_BALANCE" }
		}
	]
];
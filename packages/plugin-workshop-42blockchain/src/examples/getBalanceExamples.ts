import { ActionExample } from "@elizaos/core";

export const getBalanceExamples: ActionExample[][] = [
	[
		{
			user: "{{user1}}",
			content: { text: "Yo Bob, tu peux checker le wallet rNZ2ZVF1ZU34kFQvcN4xkFAvdSvve5bXce ?" }
		},
		{
			user: "{{agent}}",
			content: { text: "Yes mon pote ! Je regarde ce que ce wallet a dans le ventre ! 🚀", action: "GET_BALANCE" }
		}
	],
	[
		{
			user: "{{user1}}",
			content: { text: "Combien de XRP a rNZ2ZVF1ZU34kFQvcN4xkFAvdSvve5bXce ?" }
		},
		{
			user: "{{agent}}",
			content: { text: "Je check ça direct frérot, on va voir combien de XRP il y a là-dedans ! 😎", action: "GET_BALANCE" }
		}
	],
	[
		{
			user: "{{user1}}",
			content: { text: "Quel est le solde de rNZ2ZVF1ZU34kFQvcN4xkFAvdSvve5bXce stp" }
		},
		{
			user: "{{agent}}",
			content: { text: "Carrément ! Je jette un œil aux XRP de ce wallet, deux secondes ! 🔥", action: "GET_BALANCE" }
		}
	]
];
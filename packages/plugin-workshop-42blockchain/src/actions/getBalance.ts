import {
	elizaLogger,
	Action,
	ActionExample,
	HandlerCallback,
	IAgentRuntime,
	Memory,
	State,
	ModelClass,
	generateText,
	composeContext,
	stringToUuid
} from "@elizaos/core";
import { getBalanceService } from "../services/getBalanceService";
import { getBalanceExamples } from "../examples/getBalanceExamples";
import { formatBalanceTemplate } from "../templates";

export const getBalance: Action = {
	name: "GET_BALANCE",
	similes: [
		"CHECK_BALANCE",
		"SHOW_BALANCE",
		"BALANCE",
		"SOLDE",
		"VOIR_SOLDE",
		"MONTRER_SOLDE"
	],
	description: "Récupère et affiche le solde XRP d'une adresse donnée sur le réseau Ripple",
	// suppressInitialMessage: true, // Si on veux que l'agent n'affiche que la reponse generer par l'action
	validate: async (runtime: IAgentRuntime, message: Memory) => {
		// Vérifie si le message contient une adresse XRP
		const text = message.content.text || '';
		const addressMatch = text.match(/r[A-Za-z0-9]{24,34}/i);
		if (!addressMatch) {
			return false;
		}

		return true;
	},
	handler: async (
		runtime: IAgentRuntime, 
		message: Memory,
		state: State, 
		_options: { [key: string]: unknown },
		callback: HandlerCallback
	) => {
		try {
			// Récupérer l'adresse XRP dans le message
			const text = message.content.text || '';
			const addressMatch = text.match(/r[A-Za-z0-9]{24,34}/i);
			if (!addressMatch) {
				return false;
			}
			const address = addressMatch[0];
			console.log(`Recherche du solde pour l'adresse: ${address}`);

			// Fetch API pour récupérer le solde
			const xrpBalance = await getBalanceService(address);
			console.log(`Solde récupéré avec succès pour ${address}`);

			// Mettre à jour le state avec l'adresse et le solde
			state.address = address;
			state.balance = xrpBalance;
			state.currency = "XRP";
			// On compose le contexte pour la génération de texte avec le state (Donc avec l'adresse et le solde)
			const context = composeContext({
				state,
				template: formatBalanceTemplate
			});

			// Générer la reponse avec le contexte
			const formattedResponse = await generateText({
				runtime,
				context,
				modelClass: ModelClass.SMALL
			});

			// Log la reponse
			// Enregistrer notre message dans l'historique pour pas perdre le contexte
			// (Pour que l'agent puisse continuer la conversation, sans tourner en rond sur notre demande initiale)
			await runtime.messageManager.createMemory({
				id: stringToUuid(Date.now().toString()),
				content: { text: formattedResponse },
				userId: runtime.agentId,
				roomId: message.roomId,
				agentId: runtime.agentId
			});


			// Envoie du message generer par l'action.
			if (callback) {
				callback({
					text: formattedResponse,
					inReplyTo: message.id
				});
			}

			return true;

		} catch (error: any) {
			elizaLogger.error("Erreur dans le handler du plugin XRP:", error);
			if (callback) {
				callback({
					text: `Une erreur est survenue lors de la récupération du solde. Veuillez réessayer plus tard.`
				});
			}
			return false;
		}
	},
	examples: getBalanceExamples as ActionExample[][],
} as Action;

export default getBalance;

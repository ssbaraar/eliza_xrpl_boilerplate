import { elizaLogger } from "@elizaos/core";
import { CONFIG_KEYS } from "../environment";

export async function getBalanceService(address: string): Promise<string> {
	const url = `${CONFIG_KEYS.XRPL_API_URL}`;
	
	const requestBody = {
		method: 'account_info',
		params: [
			{
				account: address,
				strict: true,
				ledger_index: 'current',
				queue: true
			}
		],
		id: 1
	};

	elizaLogger.log("Request body:", JSON.stringify(requestBody, null, 2));
	
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestBody)
	});

	if (!response.ok) {
		throw new Error(`Erreur HTTP ${response.status}`);
	}

	const data = await response.json();
	elizaLogger.log("Réponse reçue:", JSON.stringify(data, null, 2));
	
	if (data.error || data.result?.error) {
		const errorMessage = data.error_message || data.error || data.result?.error;
		console.error("API Error:", errorMessage);
		throw new Error(errorMessage);
	}

	// Convertir le solde XRP (en drops) en XRP (1 XRP = 1,000,000 drops)
	const xrpBalance = Number(data.result.account_data.Balance) / 1000000;
	console.log("XRP Balance:", xrpBalance);


	return xrpBalance.toString();
}
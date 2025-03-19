import { elizaLogger } from "@elizaos/core";
import { Wallet } from "xrpl";
import { CONFIG_KEYS } from "../../environment";

/**
 * Service to manage XRPL wallets
 * Implements a singleton pattern to avoid creating multiple wallet instances
 */
class WalletService {
	private static instance: WalletService;
	private wallets: Map<string, Wallet>;

	private constructor() {
		this.wallets = new Map();
	}

	/**
	 * Get the singleton instance of WalletService
	 */
	public static getInstance(): WalletService {
		if (!WalletService.instance) {
			WalletService.instance = new WalletService();
		}
		return WalletService.instance;
	}

	/**
	 * Get a wallet for a specific seed
	 * If the wallet doesn't exist, it will be created
	 * @param seed The seed to create the wallet from
	 * @returns The wallet instance
	 */
	public getWallet(seed: string = process.env[CONFIG_KEYS.XRPL_SECRET] || ""): Wallet {
		if (!this.wallets.has(seed)) {
			elizaLogger.log("Creating new wallet instance");
			const wallet = Wallet.fromSeed(seed);
			this.wallets.set(seed, wallet);
		}
		return this.wallets.get(seed)!;
	}

	/**
	 * Clear all stored wallets
	 * Useful for cleanup or when changing environments
	 */
	public clearWallets(): void {
		this.wallets.clear();
		elizaLogger.log("All wallets cleared");
	}
}

// Export a singleton instance
export const walletService = WalletService.getInstance(); 
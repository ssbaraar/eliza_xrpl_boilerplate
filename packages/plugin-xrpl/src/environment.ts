import type { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const CONFIG_KEYS = {
    XRPL_API_URL: "XRPL_API_URL",
    XRPL_SECRET: "XRPL_SECRET",
};

export const envSchema = z.object({
    XRPL_API_URL: z.string().url("XRPL API URL must be a valid URL"),
    XRPL_SECRET: z.string().min(1, "XRPL secret is required"),
});

export type EnvConfig = z.infer<typeof envSchema>;

export async function validateEnvConfig(
    runtime: IAgentRuntime
): Promise<EnvConfig> {
    try {
        const config = {
        XRPL_API_URL:
            runtime.getSetting(CONFIG_KEYS.XRPL_API_URL) ||
            process.env.XRPL_API_URL ||
            "https://s.altnet.rippletest.net:51234",
        XRPL_SECRET:
            runtime.getSetting(CONFIG_KEYS.XRPL_SECRET) ||
            process.env.XRPL_SECRET ||
            "",
        };

        return envSchema.parse(config);
    } catch (error) {
        if (error instanceof z.ZodError) {
        const errorMessages = error.errors
            .map((err) => `${err.path.join(".")}: ${err.message}`)
            .join("\n");
        throw new Error(`XRPL configuration validation failed:\n${errorMessages}`);
        }
        throw error;
    }
}

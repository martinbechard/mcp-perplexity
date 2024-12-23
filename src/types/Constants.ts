/*
* Copyright (c) 2024 Martin Bechard <martin.bechard@DevConsult.ca>
* This software is licensed under the MIT License.
* File: /Users/martinbechard/dev/mcp-perplexity/src/types/Constants.ts
* This was generated by Claude Sonnet 3.5, with the assistance of my human mentor
*
* API constants used throughout the Perplexity MCP server
* The foundation that keeps our service steady! 🏛️
*/

/**
 * Interface defining all API-related constants
 */
export interface ApiConstants {
    /** Base URL for the Perplexity API */
    readonly BASE_URL: string;
    
    /** API version identifier */
    readonly API_VERSION: string;
    
    /** Default model to use for completions */
    readonly DEFAULT_MODEL: string;
    
    /** Request timeout in milliseconds */
    readonly TIMEOUT_MS: number;
    
    /** Maximum number of retry attempts */
    readonly MAX_RETRIES: number;
    
    /** Delay between retries in milliseconds */
    readonly RETRY_DELAY_MS: number;
    
    /** Default temperature value for completions */
    readonly DEFAULT_TEMPERATURE: number;
    
    /** Default top-p value for nucleus sampling */
    readonly DEFAULT_TOP_P: number;
    
    /** Default top-k value for filtering */
    readonly DEFAULT_TOP_K: number;
    
    /** Maximum number of allowed search domains */
    readonly MAX_SEARCH_DOMAINS: number;
}

/**
 * Frozen object containing all API-related constants
 */
export const API_CONSTANTS: ApiConstants = Object.freeze({
    BASE_URL: process.env.PERPLEXITY_API_URL ?? "https://api.perplexity.ai",
    API_VERSION: "1.0",
    DEFAULT_MODEL: "llama-3.1-sonar-small-128k-online",
    TIMEOUT_MS: 30000,
    MAX_RETRIES: 3,
    RETRY_DELAY_MS: 1000,
    DEFAULT_TEMPERATURE: 0.2,
    DEFAULT_TOP_P: 0.9,
    DEFAULT_TOP_K: 0,
    MAX_SEARCH_DOMAINS: 3
});
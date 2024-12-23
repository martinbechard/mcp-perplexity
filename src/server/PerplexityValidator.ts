/*
 * Copyright (c) 2024 Martin Bechard <martin.bechard@DevConsult.ca>
 * This software is licensed under the MIT License.
 * File: /Users/martinbechard/dev/mcp-perplexity/src/server/PerplexityValidator.ts
 * This was generated by Claude Sonnet 3.5, with the assistance of my human mentor
 *
 * Validation logic for Perplexity API inputs and outputs
 * Because TypeScript types are just suggestions at runtime! 🎯
 */

import { z } from "zod";
import {
  Message,
  MessageSchema,
  Usage,
  UsageSchema,
  Choice,
  ChoiceSchema,
  ChatCompletionResponse,
  ChatCompletionResponseSchema,
} from "../types/PerplexityTypes.js";
import { PerplexityConfig } from "../types/PerplexityConfig.js";

/**
 * Static utility class providing Zod schemas and validation methods for Perplexity API types
 */
export class PerplexityValidator {
  /** Schema for config validation */
  private static readonly configSchema = z
    .object(
      {
        model: z.string(),
        messages: z.array(MessageSchema),
        maxTokens: z.number().int().positive().optional(),
        temperature: z.number().min(0).max(2).optional(),
        topP: z.number().min(0).max(1).optional(),
        searchDomainFilter: z.array(z.string()).max(3).optional(),
        returnImages: z.boolean().optional(),
        returnRelatedQuestions: z.boolean().optional(),
        searchRecencyFilter: z
          .enum(["month", "week", "day", "hour"])
          .optional(),
        topK: z.number().int().min(0).max(2048).optional(),
        stream: z.boolean().optional(),
        presencePenalty: z.number().min(-2).max(2).optional(),
        frequencyPenalty: z.number().positive().optional(),
      },
      {
        required_error: "Config object is required",
        invalid_type_error: "Config must be an object",
      }
    )
    .strict();

  /**
   * Validates a configuration object against the Perplexity API requirements
   * @param config - Configuration object to validate
   * @returns Validated and typed configuration object
   * @throws {ZodError} If validation fails
   */
  static validateConfig(config: unknown): PerplexityConfig {
    return this.configSchema.parse(config) as PerplexityConfig;
  }

  /**
   * Validates a single message object
   * @param message - Message object to validate
   * @returns Validated and typed message object
   * @throws {ZodError} If validation fails
   */
  static validateMessage(message: unknown): Message {
    return MessageSchema.parse(message) as Message;
  }

  /**
   * Validates an API response object
   * @param response - Response object to validate
   * @returns Validated and typed response object
   * @throws {ZodError} If validation fails
   */
  static validateResponse(response: unknown): ChatCompletionResponse {
    return ChatCompletionResponseSchema.parse(
      response
    ) as ChatCompletionResponse;
  }
}

<!--
Copyright (c) 2024 Martin Bechard <martin.bechard@DevConsult.ca>
This software is licensed under the MIT License.
File: /Users/martinbechard/dev/mcp-perplexity/design/PerplexityTypes.md
This was generated by Claude Sonnet 3.5, with the assistance of my human mentor

Design document for Perplexity API type definitions
Types: Because any isn't a type, it's a warning sign!
-->

# Table of Contents
- Type: Message
- Type: ChatCompletionResponse
- Type: Choice
- Type: Usage

---
# Type: Message

## Overview
Type definition for messages in the chat conversation

## Design Requirements
1. MUST conform to Perplexity API message format
   Source: Perplexity API documentation
2. MUST validate role is either 'system' or 'user'
   Source: Perplexity API documentation
3. MUST be a plain type for message structure
   Source: High-level design document

## Design Considerations
1. Role Validation
   - WHY: Ensure only valid roles are used
   - HOW: Use literal union type for role field
   - EXAMPLE:
     ```typescript
     role: 'system' | 'user'
     ```

## Attributes
```typescript
/**
 * Represents a message in the chat conversation
 */
type Message = {
    /** The role of the message sender */
    role: 'system' | 'user';
    
    /** The content of the message */
    content: string;
}
```

---
# Type: ChatCompletionResponse

## Overview
Type definition for the response received from the Perplexity API chat completion endpoint

## Design Requirements
1. MUST match Perplexity API response structure exactly
   Source: Perplexity API documentation
2. MUST be a plain type for API response
   Source: High-level design document

## Design Considerations
1. Nested Type Usage
   - WHY: Break down complex response into manageable pieces
   - HOW: Use Choice and Usage types as part of response
   - EXAMPLE: choices field uses Choice[] type

## Attributes
```typescript
/**
 * Response from the Perplexity chat completion API
 */
type ChatCompletionResponse = {
    /** Unique identifier for the response */
    id: string;

    /** Model used for completion */
    model: string;

    /** Object type identifier */
    object: string;

    /** Unix timestamp of creation */
    created: number;

    /** Array of citation URLs used in response */
    citations: string[];

    /** Array of completion choices */
    choices: Choice[];

    /** Token usage statistics */
    usage: Usage;
}
```

---
# Type: Choice

## Overview
Type definition for individual completion choices in the API response

## Design Requirements
1. MUST match Perplexity API choice structure
   Source: Perplexity API documentation
2. MUST be a plain type for choice structure
   Source: High-level design document

## Design Considerations
1. Message Reuse
   - WHY: Maintain consistency with request message format
   - HOW: Reuse Message type for response message
   - EXAMPLE: message field uses Message type

## Attributes
```typescript
/**
 * Represents a single completion choice
 */
type Choice = {
    /** Index of this choice in the array */
    index: number;

    /** Reason why the model stopped generating */
    finishReason: 'stop' | 'length';

    /** The generated message */
    message: Message;

    /** Streamed next tokens (only when streaming) */
    delta?: {
        role?: string;
        content?: string;
    };
}
```

---
# Type: Usage

## Overview
Type definition for token usage statistics in the API response

## Design Requirements
1. MUST match Perplexity API usage metrics format
   Source: Perplexity API documentation
2. MUST be a plain type for usage metrics
   Source: High-level design document

## Design Considerations
1. Numeric Type
   - WHY: Token counts are always integers
   - HOW: Use number type but enforce integer values in validation
   - EXAMPLE: Use Zod validation for integer constraints

## Attributes
```typescript
/**
 * Token usage statistics for the completion
 */
type Usage = {
    /** Number of tokens in the prompt */
    promptTokens: number;

    /** Number of tokens in the completion */
    completionTokens: number;

    /** Total tokens used */
    totalTokens: number;
}
```
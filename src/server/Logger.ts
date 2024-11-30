/*
 * Copyright (c) 2024 Martin Bechard <martin.bechard@DevConsult.ca>
 * This software is licensed under the MIT License.
 * File: /Users/martinbechard/dev/mcp-perplexity/src/server/Logger.ts
 * This was generated by Claude Sonnet 3.5, with the assistance of my human mentor
 *
 * Logger utility for the Perplexity MCP server
 * Because printf debugging is so last century! 📝
 */

import * as fs from "fs/promises";
import * as path from "path";

/**
 * Enum containing all log message templates used throughout the application
 */
export enum LogMessages {
  SERVER_START = "Perplexity MCP Server starting",
  SERVER_READY = "Server ready and listening",
  TOOL_CALL_RECEIVED = "Tool call received",
  API_REQUEST_START = "Calling Perplexity API",
  API_RESPONSE_RECEIVED = "Received API response",
  API_ERROR = "Error calling Perplexity API",
  VALIDATION_ERROR = "Validation error",
  VALIDATION_COMPLETE = "Validation complete",
  CONFIG_ERROR = "Configuration error",
  HANDLER_SETUP = "Setting up request handlers",
  HANDLER_REGISTERED = "Handler registered",
  RESPONSE_FORMATTED = "Response formatting complete"
}

/**
 * Static utility class for handling all logging operations
 */
export class Logger {
  private static logs: string[] = [];
  private static debugEnabled: boolean = false;
  private static initialized: boolean = false;
  private static readonly LOG_PATH = path.join(process.env.HOME || "", "Library/Logs/Claude/mcp-server-perplexity.log");

  /**
   * Initialize the logger
   * @param debug - Whether debug mode is enabled
   */
  static async initialize(debug: boolean): Promise<void> {
    this.debugEnabled = debug;
    
    // Ensure log directory exists
    await fs.mkdir(path.dirname(this.LOG_PATH), { recursive: true });
    
    // Log initialization
    const initMsg = `${new Date().toISOString()} - Logger initialized${debug ? " in debug mode" : ""}\n`;
    await fs.appendFile(this.LOG_PATH, initMsg, "utf-8");
    
    this.initialized = true;
  }

  /**
   * Check if logger has been initialized
   */
  static isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Check if debug mode is enabled
   */
  static isDebugEnabled(): boolean {
    return this.debugEnabled;
  }

  /**
   * Logs a trace message
   * @param message - The message to log
   * @param data - Optional data to include in debug mode
   */
  static async trace(message: string, data?: any): Promise<void> {
    // Make sure logger is initialized
    if (!this.initialized) {
      await this.initialize(true);
    }

    const timestamp = new Date().toISOString();
    let logEntry = `${timestamp} - ${message}`;

    // Add data in debug mode
    if (this.debugEnabled && data) {
      logEntry += `\n${JSON.stringify(data, null, 2)}`;
    }

    // Store in memory and append to file
    this.logs.push(logEntry);
    try {
      await fs.appendFile(this.LOG_PATH, logEntry + "\n", "utf-8");
    } catch (err) {
      process.stderr.write(`Failed to write to log file: ${err}\n`);
    }
  }

  /**
   * Logs an error message
   * @param message - The error message
   * @param error - Optional error object
   */
  static async error(message: string, error?: any): Promise<void> {
    // Make sure logger is initialized
    if (!this.initialized) {
      await this.initialize(true);
    }

    const timestamp = new Date().toISOString();
    let logEntry = `${timestamp} - ERROR: ${message}`;

    if (error) {
      // Add error details
      if (error instanceof Error) {
        logEntry += `\nName: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`;
      } else {
        logEntry += `\n${JSON.stringify(error, null, 2)}`;
      }
    }

    // Store in memory and append to file
    this.logs.push(logEntry);
    try {
      await fs.appendFile(this.LOG_PATH, logEntry + "\n", "utf-8");
    } catch (err) {
      process.stderr.write(`Failed to write to log file: ${err}\n`);
    }
  }

  /**
   * Returns the current log entries without clearing them
   * @returns Array of log entries
   */
  static getLogContent(): string[] {
    return [...this.logs];
  }

  /**
   * Clears all log entries from memory
   */
  static clearLogs(): void {
    this.logs = [];
  }
}
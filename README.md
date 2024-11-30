# Perplexity MCP Server

An MCP (Model Context Protocol) server implementation that integrates with Perplexity's AI-powered internet search API. This server enables AI assistants to perform internet searches and receive AI-enhanced answers with source citations.

## Features

- Internet search capabilities with AI-powered answers
- Source citations included with responses
- Optional domain filtering for search results
- Configurable API parameters
- Comprehensive logging system
- MCP protocol compliance
- Command line interface

## Installation

```bash
pnpm install
```

## Configuration

The server can be configured through command line arguments or environment variables:

### Command Line Arguments
- `--api-key <key>` - Perplexity API key
- `-h, --help` - Display help information

### Environment Variables
- `PERPLEXITY_API_KEY` - Perplexity API key (if not provided via command line)

### Claude Desktop Configuration

To use this server with Claude Desktop, add the following to your Claude Desktop configuration file (usually located at `~/.claude-desktop/config.json`):

```json
{
  "mcpServers": {
    "perplexity": {
      "command": "node",
      "args": [
        "/path/to/your/dev/mcp-perplexity/dist/stdio-server.js",
        "--api-key",
        "your-perplexity-api-key"
      ]
    }
  }
}
```

Replace `/path/to/your/dev/mcp-perplexity` with the actual path to your local development directory, and `your-perplexity-api-key` with your actual Perplexity API key.

## Usage

### Starting the Server

```bash
pnpm start
```

Or with direct API key:

```bash
pnpm start --api-key YOUR_API_KEY_HERE
```

### Tool Capabilities

The server exposes a single tool named `perplexity_search` with the following input schema:

```typescript
{
  messages: {
    role: 'system' | 'user',
    content: string
  }[],
  searchDomainFilter?: string[]  // Optional list of domains to restrict search results
}
```

### Server Logs

Logs can be accessed through the MCP protocol at the resource URI `logs://current`.

## Development

### Project Structure

- `/src`
  - `/server` - Core server implementation
  - `/types` - TypeScript type definitions
  - `index.ts` - Main exports
  - `stdio-server.ts` - Command line interface

### Building

```bash
pnpm build
```

### Running Tests

```bash
pnpm test
```

## API Constants

Default configurations can be found in `src/types/Constants.ts`:

- Default Model: llama-3.1-sonar-small-128k-online
- Default Temperature: 0.2
- Default Top P: 0.9
- Maximum Search Domains: 3
- Request Timeout: 30 seconds

## Error Handling

The server implements comprehensive error handling:
- Input validation using Zod schemas
- API error handling with retry logic
- Clear error messages in MCP responses
- Detailed logging of all operations

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Martin Bechard <martin.bechard@DevConsult.ca>

## Acknowledgments

- Uses the Perplexity API for AI-powered internet search
- Built with the Anthropic MCP SDK
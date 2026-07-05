# Claude News — MCP server

A hosted [Model Context Protocol](https://modelcontextprotocol.io) server over a
continuously-updated corpus of **Claude & Anthropic news** (models, Claude Code,
research, safety, business). Give your own Claude the tools to search the news and
answer with **cited sources** — free, no API key.

- **Homepage:** https://claudenews.online
- **MCP endpoint (Streamable HTTP):** `https://claudenews.online/api/mcp`
- **Auth:** none
- **Tools:** `search_news(query, limit)`, `recent_news(limit)`

## Add it to your client

**Claude Desktop / Claude Code** (`claude_desktop_config.json` or `.mcp.json`):

```json
{
  "mcpServers": {
    "claude-news": {
      "type": "http",
      "url": "https://claudenews.online/api/mcp"
    }
  }
}
```

**Claude Code (CLI):**

```bash
claude mcp add --transport http claude-news https://claudenews.online/api/mcp
```

**claude.ai** → Settings → Connectors → Add custom connector → URL:
`https://claudenews.online/api/mcp`

## Tools

| Tool | Arguments | Returns |
|---|---|---|
| `search_news` | `query` (string), `limit` (int, optional) | Matching news items with title, source URL and summary |
| `recent_news` | `limit` (int, optional) | The most recent items from the feed |

Ask your Claude things like *"what's new with Claude Opus this week?"* and it will
query the corpus and cite the original sources.

## Also free

- Public JSON API: `https://claudenews.online/api/search?q=Claude+Opus&limit=8`
- RSS: `https://claudenews.online/feed.xml`
- Embeddable widget: `https://claudenews.online/widget`

## About

Claude News is an independent media outlet published by **Héra SASU**, not affiliated
with Anthropic. "Claude" and "Anthropic" belong to their respective owners.

## Run locally (stdio)

If your MCP client doesn't support remote (Streamable HTTP) servers, this repo is
also a runnable stdio bridge to the same corpus:

```bash
npx -y claude-news-mcp        # once published to npm, or:
git clone https://github.com/Popy21/claude-news-mcp && cd claude-news-mcp
npm install && node src/index.js
```

**Claude Desktop / Claude Code** (`claude_desktop_config.json` or `.mcp.json`):

```json
{
  "mcpServers": {
    "claude-news": {
      "command": "npx",
      "args": ["-y", "claude-news-mcp"]
    }
  }
}
```

**Docker:**

```bash
docker build -t claude-news-mcp . && docker run -i --rm claude-news-mcp
```

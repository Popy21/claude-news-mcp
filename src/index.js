#!/usr/bin/env node
/**
 * Claude News MCP server (stdio).
 *
 * A thin local bridge to the free Claude News corpus (https://claudenews.online).
 * Useful for MCP clients without Streamable-HTTP support; if your client supports
 * remote servers, prefer the hosted endpoint: https://claudenews.online/api/mcp
 *
 * Tools: search_news(query, limit), recent_news(limit)
 * No API key. MIT licensed. Published by Héra SASU — not affiliated with Anthropic.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const API = "https://claudenews.online/api/search";

async function fetchNews({ query, limit }) {
  const url = new URL(API);
  if (query) url.searchParams.set("q", query);
  url.searchParams.set("limit", String(Math.min(Math.max(limit ?? 8, 1), 25)));
  const res = await fetch(url, { headers: { "User-Agent": "claude-news-mcp/1.0 (stdio bridge)" } });
  if (!res.ok) throw new Error(`Claude News API error: HTTP ${res.status}`);
  const data = await res.json();
  const items = (data.results ?? []).map((r) => ({
    title: r.title,
    url: r.url,
    source: r.source,
    category: r.category,
    publishedAt: r.publishedAt,
    summary: r.summary || undefined,
  }));
  return { count: items.length, items };
}

function asText(payload) {
  if (!payload.items.length) {
    return "No matching news items. Try a broader query (e.g. \"Claude Code\", \"Opus\", \"Anthropic research\").";
  }
  return payload.items
    .map(
      (i, n) =>
        `${n + 1}. ${i.title}\n   ${i.url}\n   ${[i.source, i.category, i.publishedAt].filter(Boolean).join(" · ")}${i.summary ? `\n   ${i.summary}` : ""}`
    )
    .join("\n\n");
}

const server = new McpServer({ name: "claude-news", version: "1.1.0" });

server.registerTool(
  "search_news",
  {
    title: "Search Claude & Anthropic news",
    description:
      "Full-text search over a continuously updated corpus of Claude & Anthropic news (models, Claude Code, API/MCP, research, safety, business). Returns items with title, URL, source and date — always cite the URLs.",
    inputSchema: {
      query: z.string().describe("Search query, e.g. \"Claude Code plugins\" or \"Opus release\""),
      limit: z.number().int().min(1).max(25).optional().describe("Max results (default 8)"),
    },
  },
  async ({ query, limit }) => {
    const payload = await fetchNews({ query, limit });
    return { content: [{ type: "text", text: asText(payload) }] };
  }
);

server.registerTool(
  "recent_news",
  {
    title: "Latest Claude & Anthropic news",
    description:
      "The most recent items from the Claude News feed (press, Hacker News, Reddit, GitHub — curated by Claude). Always cite the URLs.",
    inputSchema: {
      limit: z.number().int().min(1).max(25).optional().describe("Max results (default 8)"),
    },
  },
  async ({ limit }) => {
    const payload = await fetchNews({ limit });
    return { content: [{ type: "text", text: asText(payload) }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);

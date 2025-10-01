#!/usr/bin/env node
import { config } from "dotenv";
import { startStdioServer, ServerType } from "mcp-proxy";

config();

const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
if (!token) {
  console.error("[gohighlevel-mcp-proxy] Missing GHL_PRIVATE_INTEGRATION_TOKEN environment variable.");
  process.exit(1);
}

const locationId = process.env.GHL_LOCATION_ID;
const baseUrl = process.env.GHL_MCP_URL || "https://services.leadconnectorhq.com/mcp/";

const normalizedUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
const streamUrl = normalizedUrl.endsWith("/http") ? normalizedUrl : `${normalizedUrl}/http`;

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/json, text/event-stream',
  "Content-Type": "application/json",
};

if (locationId) {
  headers.locationId = locationId;
}

if (process.env.DEBUG === "true") {
  console.error(`[gohighlevel-mcp-proxy] REST base: ${normalizedUrl}`);
  console.error(`[gohighlevel-mcp-proxy] Connecting to ${streamUrl}`);
  console.error(`[gohighlevel-mcp-proxy] Using locationId: ${locationId || "<not set>"}`);
}

try {
  await startStdioServer({
    serverType: ServerType.HTTPStream,
    url: streamUrl,
    transportOptions: {
      headers,
    },
  });
  if (process.env.DEBUG === 'true') {
    console.error('[gohighlevel-mcp-proxy] startStdioServer initialized, keeping process alive');
  }
  process.stdin.resume();
} catch (error) {
  console.error('[gohighlevel-mcp-proxy] Failed to start proxy:', error);
  process.exit(1);
}

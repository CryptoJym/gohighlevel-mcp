#!/usr/bin/env node
import { spawn } from 'child_process';
import readline from 'readline';

const token = 'pit-4219557e-cc70-4380-8ce2-f766e8611c59';
const locationId = 'Xahwhp5PS9GtUINSBW4S';

// Spawn the proxy
const proxy = spawn('node', ['gohighlevel-mcp-proxy.mjs'], {
  env: {
    ...process.env,
    GHL_PRIVATE_INTEGRATION_TOKEN: token,
    GHL_LOCATION_ID: locationId,
    DEBUG: 'true'
  },
  stdio: ['pipe', 'pipe', 'pipe']
});

// Create readline interfaces
const rl = readline.createInterface({
  input: proxy.stdout,
  crlfDelay: Infinity
});

const errRl = readline.createInterface({
  input: proxy.stderr,
  crlfDelay: Infinity
});

// Handle stderr output
errRl.on('line', (line) => {
  console.error(`[STDERR] ${line}`);
});

// Handle stdout output
rl.on('line', (line) => {
  console.log(`[RESPONSE] ${line}`);
  try {
    const response = JSON.parse(line);

    if (response.id === 1) {
      console.log('\n✓ Initialization successful!');
      console.log('Server info:', response.result?.serverInfo);

      // Send tools/list request
      console.log('\n→ Requesting tools list...');
      const toolsRequest = {
        jsonrpc: '2.0',
        method: 'tools/list',
        params: {},
        id: 2
      };
      proxy.stdin.write(JSON.stringify(toolsRequest) + '\n');
    }

    if (response.id === 2) {
      console.log('\n✓ Tools list received!');
      const tools = response.result?.tools || [];
      console.log(`Found ${tools.length} tools:`);
      tools.forEach(tool => {
        console.log(`  - ${tool.name}: ${tool.description || 'No description'}`);
      });

      // Close the proxy
      setTimeout(() => {
        console.log('\n✓ Test complete!');
        proxy.kill();
        process.exit(0);
      }, 1000);
    }
  } catch (e) {
    // Not JSON, ignore
  }
});

// Send initialization
console.log('→ Initializing MCP connection...');
const initRequest = {
  jsonrpc: '2.0',
  method: 'initialize',
  params: {
    protocolVersion: '0.1.0',
    capabilities: { tools: {} },
    clientInfo: { name: 'test-client', version: '1.0.0' }
  },
  id: 1
};

proxy.stdin.write(JSON.stringify(initRequest) + '\n');

// Handle errors
proxy.on('error', (error) => {
  console.error('Proxy error:', error);
  process.exit(1);
});

// Timeout after 10 seconds
setTimeout(() => {
  console.error('\n✗ Test timed out');
  proxy.kill();
  process.exit(1);
}, 10000);
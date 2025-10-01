#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const command = args[0];

function showHelp() {
  console.log(`
🚀 GoHighLevel MCP Client

Usage:
  ghl-mcp setup              Run interactive setup wizard
  ghl-mcp validate           Validate existing configuration
  ghl-mcp test               Test connection to GoHighLevel
  ghl-mcp server             Start HTTP server (default port 3000)
  ghl-mcp contacts           List all contacts
  ghl-mcp help               Show this help

MCP Server Commands:
  gohighlevel-mcp            Start the MCP proxy server (for Claude/VS Code/etc)

Examples:
  # First time setup
  npx ghl-mcp setup

  # Test your connection
  npx ghl-mcp test

  # Start HTTP API server
  npx ghl-mcp server

  # Use with Claude Desktop - add to config:
  {
    "mcpServers": {
      "gohighlevel": {
        "command": "npx",
        "args": ["gohighlevel-mcp"],
        "env": {
          "GHL_PRIVATE_INTEGRATION_TOKEN": "your-token",
          "GHL_LOCATION_ID": "your-location-id"
        }
      }
    }
  }

Documentation: https://github.com/manus-ai/gohighlevel-mcp
`);
}

function runScript(script, scriptArgs = []) {
  const scriptPath = join(__dirname, script);
  const child = spawn('node', [scriptPath, ...scriptArgs], {
    stdio: 'inherit',
    cwd: __dirname
  });

  child.on('error', (error) => {
    console.error(`Failed to execute: ${error.message}`);
    process.exit(1);
  });

  child.on('exit', (code) => {
    process.exit(code || 0);
  });
}

switch (command) {
  case 'setup':
    runScript('setup.js');
    break;

  case 'validate':
    runScript('setup.js', ['validate']);
    break;

  case 'test':
    runScript('test.js');
    break;

  case 'server':
    runScript('index.js', ['server']);
    break;

  case 'contacts':
    runScript('index.js', ['contacts']);
    break;

  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;

  default:
    if (!command) {
      showHelp();
    } else {
      console.log(`Unknown command: ${command}`);
      console.log('Run "ghl-mcp help" for usage information.');
      process.exit(1);
    }
}

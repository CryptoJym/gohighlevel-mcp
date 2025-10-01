# GoHighLevel MCP - Team Installation Guide

Plug-and-play MCP server for GoHighLevel CRM automation with 21+ tools for contacts, conversations, opportunities, calendars, and more.

## 🚀 Quick Start (5 minutes)

### Step 1: Install

```bash
# Clone from GitHub
git clone https://github.com/YOUR-ORG/gohighlevel-mcp.git
cd gohighlevel-mcp

# Install dependencies
npm install
```

### Step 2: Get Your Credentials

You need two things from GoHighLevel:

1. **Private Integration Token** (starts with `pit-`)
   - Log in to your GoHighLevel account
   - Go to **Settings > Private Integrations**
   - Create a new integration or use existing one
   - Copy the **Private Integration Token**

2. **Location ID** (your sub-account ID)
   - This is visible in your GoHighLevel URL
   - Example: `https://app.gohighlevel.com/location/Xahwhp5PS9GtUINSBW4S`
   - Your Location ID is: `Xahwhp5PS9GtUINSBW4S`

### Step 3: Run Setup

```bash
npm run setup
```

The interactive wizard will:
- Prompt for your Private Integration Token
- Prompt for your Location ID
- Create `.env` file
- Test the connection
- Confirm everything works

### Step 4: Test It

```bash
# Validate configuration
npm run validate

# Test connection
npm test

# List your contacts
npx ghl-mcp contacts
```

Done! You're ready to use GoHighLevel MCP.

---

## 🔧 Integration with AI Tools

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "gohighlevel": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/gohighlevel-mcp/gohighlevel-mcp-proxy.mjs"],
      "env": {
        "GHL_PRIVATE_INTEGRATION_TOKEN": "pit-YOUR-TOKEN",
        "GHL_LOCATION_ID": "YOUR-LOCATION-ID",
        "DEBUG": "false"
      }
    }
  }
}
```

**Important:** Replace `/ABSOLUTE/PATH/TO/` with your actual path.

Restart Claude Desktop and you'll see 21 GoHighLevel tools available.

### VS Code with Claude Dev / Roo Cline

Add to your VS Code `settings.json`:

```json
{
  "mcpServers": {
    "gohighlevel": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/gohighlevel-mcp/gohighlevel-mcp-proxy.mjs"],
      "env": {
        "GHL_PRIVATE_INTEGRATION_TOKEN": "pit-YOUR-TOKEN",
        "GHL_LOCATION_ID": "YOUR-LOCATION-ID"
      }
    }
  }
}
```

### Cursor

Add to Cursor's MCP settings:

```json
{
  "gohighlevel": {
    "command": "node",
    "args": ["/ABSOLUTE/PATH/TO/gohighlevel-mcp/gohighlevel-mcp-proxy.mjs"],
    "env": {
      "GHL_PRIVATE_INTEGRATION_TOKEN": "pit-YOUR-TOKEN",
      "GHL_LOCATION_ID": "YOUR-LOCATION-ID"
    }
  }
}
```

### Codex

Add to `~/.codex/config.toml`:

```toml
[mcp_servers.gohighlevel]
command = "node"
args = ["/ABSOLUTE/PATH/TO/gohighlevel-mcp/gohighlevel-mcp-proxy.mjs"]

[mcp_servers.gohighlevel.env]
GHL_PRIVATE_INTEGRATION_TOKEN = "pit-YOUR-TOKEN"
GHL_LOCATION_ID = "YOUR-LOCATION-ID"
DEBUG = "false"
```

---

## 📚 Available Tools (21 total)

### Contact Management
- `contacts_get-contacts` - List all contacts with filtering
- `contacts_get-contact` - Get a specific contact by ID
- `contacts_create-contact` - Create a new contact
- `contacts_update-contact` - Update existing contact
- `contacts_upsert-contact` - Create or update contact
- `contacts_add-tags` - Add tags to contact
- `contacts_remove-tags` - Remove tags from contact
- `contacts_get-all-tasks` - Get contact's tasks

### Conversation Management
- `conversations_search-conversation` - Search conversations
- `conversations_get-messages` - Get conversation messages
- `conversations_send-a-new-message` - Send message to conversation

### Calendar Management
- `calendars_get-calendar-events` - List calendar events
- `calendars_get-appointment-notes` - Get appointment notes

### Opportunity Management
- `opportunities_search-opportunity` - Search opportunities
- `opportunities_get-opportunity` - Get specific opportunity
- `opportunities_update-opportunity` - Update opportunity
- `opportunities_get-pipelines` - List opportunity pipelines

### Payment Management
- `payments_get-order-by-id` - Get payment order details
- `payments_list-transactions` - List payment transactions

### Location Management
- `locations_get-location` - Get location details
- `locations_get-custom-fields` - Get custom fields

---

## 🛠️ CLI Commands

```bash
# Interactive setup
npx ghl-mcp setup

# Validate configuration
npx ghl-mcp validate

# Test connection
npx ghl-mcp test

# Start HTTP server (port 3000)
npx ghl-mcp server

# List contacts
npx ghl-mcp contacts

# Show help
npx ghl-mcp help
```

---

## 🐛 Troubleshooting

### "Missing GHL_PRIVATE_INTEGRATION_TOKEN"

Run setup again:
```bash
npm run setup
```

### "Connection failed"

1. Verify your token starts with `pit-`
2. Check your Location ID is correct
3. Ensure you have network access to `services.leadconnectorhq.com`
4. Run validation:
   ```bash
   npm run validate
   ```

### "Token should start with 'pit-'"

Your Private Integration Token is incorrect. Get a new one from:
- GoHighLevel > Settings > Private Integrations

### Claude Desktop doesn't show tools

1. Check config file location:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
2. Verify JSON syntax is valid
3. Use absolute paths (not relative paths like `./`)
4. Restart Claude Desktop completely

---

## 🔒 Security Best Practices

1. **Never commit `.env` file** - It's in `.gitignore` by default
2. **Don't share your Private Integration Token** - It has full API access
3. **Use environment variables** - Don't hardcode credentials
4. **Rotate tokens regularly** - Generate new tokens every 90 days
5. **Limit token scope** - Use separate tokens for dev/staging/production

---

## 📖 Documentation

- **Full API Reference**: See `README.md`
- **Tool Examples**: See `EXAMPLES.md`
- **Architecture**: See `ARCHITECTURE.md`
- **Official GHL Docs**: https://developers.gohighlevel.com

---

## 💡 Usage Examples

### Create a contact

```javascript
// In Claude Desktop with GHL MCP loaded
"Create a contact named John Doe with email john@example.com"
```

### Search conversations

```javascript
"Find all conversations from the last 7 days that contain the word 'pricing'"
```

### Get upcoming calendar events

```javascript
"Show me all calendar appointments for the next 3 days"
```

### Update an opportunity

```javascript
"Move opportunity ID abc123 to the 'Proposal Sent' stage"
```

---

## 🤝 Support

- **Issues**: [GitHub Issues](https://github.com/YOUR-ORG/gohighlevel-mcp/issues)
- **Documentation**: [Full README](./README.md)
- **GoHighLevel API**: [Official Docs](https://developers.gohighlevel.com)

---

## 📝 License

MIT License - See [LICENSE](./LICENSE) file

---

**Built with ❤️ by Manus AI**

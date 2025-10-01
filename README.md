# GoHighLevel MCP Client

A powerful Node.js client for interacting with the official GoHighLevel MCP (Model Context Protocol) server. This client provides a simple interface to manage contacts, conversations, calendars, opportunities, and payments in your GoHighLevel account.

## Features

- ✅ **Complete API Coverage**: Access all 21+ tools from the official GoHighLevel MCP server
- 🔐 **Secure Authentication**: Uses Private Integration Tokens with scoped permissions
- 🚀 **Easy to Use**: Simple JavaScript/Node.js interface with async/await support
- 🌐 **HTTP Server**: Optional REST API server for web applications
- 🧪 **Built-in Testing**: Comprehensive test suite to validate functionality
- 📝 **TypeScript Ready**: Clean, well-documented code structure
- ⚡ **High Performance**: Concurrent request support with proper error handling

## Quick Start

### 1. Installation

```bash
# Clone from GitHub
git clone https://github.com/CryptoJym/gohighlevel-mcp.git
cd gohighlevel-mcp

# Install dependencies
npm install

# Run interactive setup
npm run setup
```

The setup wizard will guide you through configuration and test your connection.

**For detailed team onboarding instructions, see [INSTALL.md](./INSTALL.md)**

### 2. Manual Configuration (Alternative)

If you prefer manual setup:

```bash
cp .env.example .env
```

Edit `.env` file with your GoHighLevel credentials:

```env
GHL_PRIVATE_INTEGRATION_TOKEN=pit-your-token-here
GHL_LOCATION_ID=your-location-id-here
```

### 3. Get Your Credentials

#### Private Integration Token:
1. Log into your GoHighLevel account
2. Go to **Settings > Private Integrations**
3. Click **"Create New Integration"**
4. Select required scopes (see [Required Scopes](#required-scopes))
5. Copy the generated token

#### Location ID:
- This is your sub-account ID in GoHighLevel
- You can find it in the URL when viewing your location
- Or use the client to retrieve it: `node index.js location`

### 4. Test Connection

```bash
npm test
# or
node test.js
```

## Usage

### Command Line Interface

```bash
# Test connection
node index.js test

# Get all contacts
node index.js contacts

# Get specific contact
node index.js contact <contact-id>

# Get location info
node index.js location

# List available tools
node index.js tools

# Start HTTP server
node index.js server
```

### Programmatic Usage

```javascript
import GoHighLevelMCPClient from './index.js';

const client = new GoHighLevelMCPClient();

// Get contacts
const contacts = await client.getContacts({ limit: 10 });
console.log(contacts);

// Create a new contact
const newContact = await client.createContact({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+1234567890'
});

// Send a message
const message = await client.sendMessage(conversationId, 'Hello!');
```

### HTTP Server API

Start the server:
```bash
node index.js server
```

Available endpoints:
- `GET /health` - Health check
- `GET /test` - Test connection
- `GET /tools` - List available tools
- `GET /contacts` - Get contacts
- `GET /contacts/:id` - Get specific contact
- `POST /contacts` - Create contact
- `PUT /contacts/:id` - Update contact
- `GET /conversations` - Search conversations
- `GET /conversations/:id/messages` - Get messages
- `POST /conversations/:id/messages` - Send message
- `GET /location` - Get location info
- `GET /location/custom-fields` - Get custom fields

## Available Methods

### Contact Management
- `getContacts(params)` - Get all contacts with optional filtering
- `getContact(contactId)` - Get specific contact by ID
- `createContact(contactData)` - Create new contact
- `updateContact(contactId, contactData)` - Update existing contact
- `upsertContact(contactData)` - Create or update contact
- `addTagsToContact(contactId, tags)` - Add tags to contact
- `removeTagsFromContact(contactId, tags)` - Remove tags from contact
- `getAllTasks(contactId)` - Get all tasks for a contact

### Conversation Management
- `searchConversations(params)` - Search and filter conversations
- `getMessages(conversationId)` - Get messages in a conversation
- `sendMessage(conversationId, message)` - Send a new message

### Calendar Management
- `getCalendarEvents(params)` - Get calendar events
- `getAppointmentNotes(appointmentId)` - Get appointment notes

### Opportunity Management
- `searchOpportunities(params)` - Search opportunities
- `getOpportunity(opportunityId)` - Get specific opportunity
- `updateOpportunity(opportunityId, data)` - Update opportunity
- `getPipelines()` - Get all opportunity pipelines

### Payment Management
- `getOrderById(orderId)` - Get order details
- `listTransactions(params)` - List transactions with filtering

### Location Management
- `getLocation(locationId)` - Get location/sub-account details
- `getCustomFields(locationId)` - Get custom field definitions

### Utility Methods
- `testConnection()` - Test connection to GoHighLevel
- `getAvailableTools()` - List all available MCP tools

## 🔧 Integration with AI Tools

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS):

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

Restart Claude Desktop and you'll see 21 GoHighLevel tools available.

### VS Code / Cursor / Codex

See [INSTALL.md](./INSTALL.md) for detailed configuration examples for:
- VS Code with Claude Dev / Roo Cline
- Cursor
- Codex
- Other MCP-compatible tools

## Required Scopes

When creating your Private Integration Token, ensure you select these scopes:

- ✅ View Contacts
- ✅ Edit Contacts
- ✅ View Conversations
- ✅ Edit Conversations
- ✅ View Conversation Messages
- ✅ Edit Conversation Messages
- ✅ View Opportunities
- ✅ Edit Opportunities
- ✅ View Calendars
- ✅ Edit Calendar Events
- ✅ Edit Calendars
- ✅ View Payment Orders
- ✅ View Payment Transactions
- ✅ View Custom Fields
- ✅ View Forms
- ✅ View Locations

## Error Handling

The client includes comprehensive error handling:

```javascript
const result = await client.getContacts();

if (result.success) {
  console.log('Data:', result.data);
} else {
  console.log('Error:', result.error);
  console.log('Status:', result.status);
}
```

## Testing

Run the test suite to validate your setup:

```bash
# Basic functionality tests
npm test

# Performance tests
node test.js performance

# All tests
node test.js all
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GHL_PRIVATE_INTEGRATION_TOKEN` | Yes | Your GoHighLevel Private Integration Token |
| `GHL_LOCATION_ID` | Recommended | Your GoHighLevel Location/Sub-account ID |
| `GHL_MCP_URL` | No | MCP server URL (defaults to official server) |
| `PORT` | No | HTTP server port (default: 3000) |
| `HOST` | No | HTTP server host (default: localhost) |
| `DEBUG` | No | Enable debug logging (default: false) |

## Troubleshooting

### Common Issues

1. **"GHL_PRIVATE_INTEGRATION_TOKEN is required"**
   - Make sure your `.env` file exists and contains the token
   - Verify the token is correctly formatted (starts with `pit-`)

2. **"Location ID is required"**
   - Some operations require a location ID
   - Set `GHL_LOCATION_ID` in your `.env` file
   - Or pass it as a parameter to specific methods

3. **Authentication errors**
   - Verify your token has the required scopes
   - Check that the token hasn't expired
   - Ensure you're using the correct location ID

4. **Connection timeouts**
   - Check your internet connection
   - Verify the MCP server URL is correct
   - Try increasing the timeout in the client configuration

### Debug Mode

Enable debug logging to see detailed request information:

```bash
DEBUG=true node index.js test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues related to:
- **This client**: Open an issue in this repository
- **GoHighLevel API**: Contact GoHighLevel support
- **MCP Protocol**: Check the official MCP documentation

## Changelog

### v1.0.0
- Initial release
- Complete MCP client implementation
- HTTP server interface
- Comprehensive test suite
- Full documentation

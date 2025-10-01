# GoHighLevel API Research Findings

## Overview
GoHighLevel provides a comprehensive REST API (v2.0) for integrating with their CRM platform. They also have an **existing MCP server** that's already live and ready for use.

## Authentication Methods

### 1. Private Integration Token (Recommended for our use case)
- **Best for**: Internal purposes, single sub-account access
- **Security**: Scoped permissions, more secure than API keys
- **Features**: Access to API v2.0 with full feature set
- **Token Type**: Static/fixed OAuth2 Access Tokens
- **Usage**: Added to Authorization header as Bearer token
- **Rotation**: Recommended every 90 days with 7-day overlap window

**Example Usage:**
```bash
curl --request GET \
  --url https://services.leadconnectorhq.com/locations/ve9EPM428h8vShlRW1KT \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <YOUR_PRIVATE_INTEGRATION_TOKEN>' \
  --header 'Version: 2021-07-28'
```

### 2. OAuth 2.0 Flow
- **Best for**: Public integrations, marketplace apps
- **Features**: Webhooks, custom modules, advanced security
- **Token Management**: Daily refresh required

## Existing GoHighLevel MCP Server

**IMPORTANT DISCOVERY**: GoHighLevel already has a live MCP server at:
- **URL**: `https://services.leadconnectorhq.com/mcp/`
- **Protocol**: HTTP Streamable
- **Status**: Live and ready for use

### Available Tools (21 total):
1. **Calendar Management**
   - Get Calendar Events
   - Get Appointment Notes

2. **Contact Management**
   - Get All Tasks
   - Add/Remove Tags
   - Get/Update/Create/Upsert Contact
   - Get Contacts

3. **Conversations**
   - Search Conversation
   - Get Messages
   - Send New Message

4. **Location Management**
   - Get Location
   - Get Custom Fields

5. **Opportunities**
   - Search Opportunity
   - Get Pipelines
   - Get/Update Opportunity

6. **Payments**
   - Get Order by ID
   - List Transactions

### Required Scopes for Full Access:
- View Contacts, Edit Contacts
- View Conversations, Edit Conversations
- View Conversation Messages, Edit Conversation Messages
- View Opportunities, Edit Opportunities
- View Calendars, Edit Calendar Events, Edit Calendars
- View Payment Orders, View Payment Transactions
- View Custom Fields, View Forms, View Locations

### Configuration Example:
```json
{
  "mcpServers": {
    "ghl-mcp": {
      "url": "https://services.leadconnectorhq.com/mcp/",
      "headers": {
        "Authorization": "Bearer pit-12345",
        "locationId": "110411007T"
      }
    }
  }
}
```

## API Endpoints Base URL
- **Base URL**: `https://services.leadconnectorhq.com/`
- **Version Header**: `Version: 2021-07-28`

## Key API Categories
1. **CRM & Contacts** - Full CRUD operations, tagging, custom fields
2. **Conversations** - SMS, email, call communications
3. **Calendar & Events** - Appointment scheduling, booking workflows
4. **Opportunities** - Sales pipeline, deal management
5. **Payments** - Transaction processing, subscription management
6. **Webhooks** - Real-time notifications for 50+ events

## Integration Options
1. **Use Existing MCP Server** (Recommended)
2. **Build Custom MCP Server** (If additional functionality needed)
3. **Direct API Integration**

## Next Steps Recommendation
Since GoHighLevel already provides a fully functional MCP server, we should:
1. Test the existing MCP server with available credentials
2. Identify any missing functionality not covered by the existing server
3. Only build custom MCP components if specific features are missing
4. Focus on configuration and setup rather than building from scratch

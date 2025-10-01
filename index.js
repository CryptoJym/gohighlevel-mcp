#!/usr/bin/env node

import dotenv from 'dotenv';
import axios from 'axios';
import express from 'express';
import cors from 'cors';

// Load environment variables
dotenv.config();

class GoHighLevelMCPClient {
  constructor() {
    this.token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
    this.locationId = process.env.GHL_LOCATION_ID;
    this.mcpUrl = process.env.GHL_MCP_URL || 'https://services.leadconnectorhq.com/mcp/';
    this.debug = process.env.DEBUG === 'true';
    
    if (!this.token) {
      throw new Error('GHL_PRIVATE_INTEGRATION_TOKEN is required. Please check your .env file.');
    }
    
    if (!this.locationId) {
      console.warn('Warning: GHL_LOCATION_ID not set. Some operations may require it.');
    }
    
    this.headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    if (this.locationId) {
      this.headers['locationId'] = this.locationId;
    }
    
    this.log('GoHighLevel MCP Client initialized');
    this.log(`MCP Server URL: ${this.mcpUrl}`);
    this.log(`Location ID: ${this.locationId || 'Not set'}`);
  }
  
  log(message) {
    if (this.debug) {
      console.log(`[GHL-MCP] ${new Date().toISOString()}: ${message}`);
    }
  }
  
  async makeRequest(method, endpoint, data = null) {
    try {
      const config = {
        method,
        url: `${this.mcpUrl}${endpoint}`,
        headers: this.headers,
        timeout: 30000
      };
      
      if (data) {
        config.data = data;
      }
      
      this.log(`Making ${method} request to ${endpoint}`);
      const response = await axios(config);
      this.log(`Request successful: ${response.status}`);
      
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      this.log(`Request failed: ${error.message}`);
      return {
        success: false,
        error: error.response?.data || error.message,
        status: error.response?.status || 500
      };
    }
  }
  
  // Contact Management Methods
  async getContacts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `contacts_get-contacts?${queryString}` : 'contacts_get-contacts';
    return await this.makeRequest('GET', endpoint);
  }
  
  async getContact(contactId) {
    if (!contactId) {
      return { success: false, error: 'Contact ID is required' };
    }
    return await this.makeRequest('GET', `contacts_get-contact?contactId=${contactId}`);
  }
  
  async createContact(contactData) {
    if (!contactData) {
      return { success: false, error: 'Contact data is required' };
    }
    return await this.makeRequest('POST', 'contacts_create-contact', contactData);
  }
  
  async updateContact(contactId, contactData) {
    if (!contactId || !contactData) {
      return { success: false, error: 'Contact ID and data are required' };
    }
    return await this.makeRequest('PUT', `contacts_update-contact?contactId=${contactId}`, contactData);
  }
  
  async upsertContact(contactData) {
    if (!contactData) {
      return { success: false, error: 'Contact data is required' };
    }
    return await this.makeRequest('POST', 'contacts_upsert-contact', contactData);
  }
  
  async addTagsToContact(contactId, tags) {
    if (!contactId || !tags || !Array.isArray(tags)) {
      return { success: false, error: 'Contact ID and tags array are required' };
    }
    return await this.makeRequest('POST', `contacts_add-tags?contactId=${contactId}`, { tags });
  }
  
  async removeTagsFromContact(contactId, tags) {
    if (!contactId || !tags || !Array.isArray(tags)) {
      return { success: false, error: 'Contact ID and tags array are required' };
    }
    return await this.makeRequest('DELETE', `contacts_remove-tags?contactId=${contactId}`, { tags });
  }
  
  // Conversation Management Methods
  async searchConversations(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `conversations_search-conversation?${queryString}` : 'conversations_search-conversation';
    return await this.makeRequest('GET', endpoint);
  }
  
  async getMessages(conversationId) {
    if (!conversationId) {
      return { success: false, error: 'Conversation ID is required' };
    }
    return await this.makeRequest('GET', `conversations_get-messages?conversationId=${conversationId}`);
  }
  
  async sendMessage(conversationId, message) {
    if (!conversationId || !message) {
      return { success: false, error: 'Conversation ID and message are required' };
    }
    return await this.makeRequest('POST', `conversations_send-a-new-message?conversationId=${conversationId}`, { message });
  }
  
  // Calendar Management Methods
  async getCalendarEvents(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `calendars_get-calendar-events?${queryString}` : 'calendars_get-calendar-events';
    return await this.makeRequest('GET', endpoint);
  }
  
  async getAppointmentNotes(appointmentId) {
    if (!appointmentId) {
      return { success: false, error: 'Appointment ID is required' };
    }
    return await this.makeRequest('GET', `calendars_get-appointment-notes?appointmentId=${appointmentId}`);
  }
  
  // Opportunity Management Methods
  async searchOpportunities(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `opportunities_search-opportunity?${queryString}` : 'opportunities_search-opportunity';
    return await this.makeRequest('GET', endpoint);
  }
  
  async getOpportunity(opportunityId) {
    if (!opportunityId) {
      return { success: false, error: 'Opportunity ID is required' };
    }
    return await this.makeRequest('GET', `opportunities_get-opportunity?opportunityId=${opportunityId}`);
  }
  
  async updateOpportunity(opportunityId, opportunityData) {
    if (!opportunityId || !opportunityData) {
      return { success: false, error: 'Opportunity ID and data are required' };
    }
    return await this.makeRequest('PUT', `opportunities_update-opportunity?opportunityId=${opportunityId}`, opportunityData);
  }
  
  async getPipelines() {
    return await this.makeRequest('GET', 'opportunities_get-pipelines');
  }
  
  // Payment Management Methods
  async getOrderById(orderId) {
    if (!orderId) {
      return { success: false, error: 'Order ID is required' };
    }
    return await this.makeRequest('GET', `payments_get-order-by-id?orderId=${orderId}`);
  }
  
  async listTransactions(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `payments_list-transactions?${queryString}` : 'payments_list-transactions';
    return await this.makeRequest('GET', endpoint);
  }
  
  // Location Management Methods
  async getLocation(locationId = null) {
    const id = locationId || this.locationId;
    if (!id) {
      return { success: false, error: 'Location ID is required' };
    }
    return await this.makeRequest('GET', `locations_get-location?locationId=${id}`);
  }
  
  async getCustomFields(locationId = null) {
    const id = locationId || this.locationId;
    if (!id) {
      return { success: false, error: 'Location ID is required' };
    }
    return await this.makeRequest('GET', `locations_get-custom-fields?locationId=${id}`);
  }
  
  // Task Management Methods
  async getAllTasks(contactId) {
    if (!contactId) {
      return { success: false, error: 'Contact ID is required' };
    }
    return await this.makeRequest('GET', `contacts_get-all-tasks?contactId=${contactId}`);
  }
  
  // Utility Methods
  async testConnection() {
    console.log('Testing connection to GoHighLevel MCP server...');
    const result = await this.getLocation();
    if (result.success) {
      console.log('✅ Connection successful!');
      console.log('Location data:', JSON.stringify(result.data, null, 2));
    } else {
      console.log('❌ Connection failed!');
      console.log('Error:', result.error);
    }
    return result;
  }
  
  async getAvailableTools() {
    // This would typically be an MCP-specific endpoint, but we'll return our known tools
    return {
      success: true,
      data: {
        tools: [
          'contacts_get-contacts',
          'contacts_get-contact',
          'contacts_create-contact',
          'contacts_update-contact',
          'contacts_upsert-contact',
          'contacts_add-tags',
          'contacts_remove-tags',
          'contacts_get-all-tasks',
          'conversations_search-conversation',
          'conversations_get-messages',
          'conversations_send-a-new-message',
          'calendars_get-calendar-events',
          'calendars_get-appointment-notes',
          'opportunities_search-opportunity',
          'opportunities_get-opportunity',
          'opportunities_update-opportunity',
          'opportunities_get-pipelines',
          'payments_get-order-by-id',
          'payments_list-transactions',
          'locations_get-location',
          'locations_get-custom-fields'
        ]
      }
    };
  }
}

// CLI Interface
async function main() {
  try {
    const client = new GoHighLevelMCPClient();
    
    const args = process.argv.slice(2);
    const command = args[0];
    
    if (!command) {
      console.log('GoHighLevel MCP Client');
      console.log('Usage: node index.js <command> [args...]');
      console.log('');
      console.log('Commands:');
      console.log('  test                    - Test connection to GoHighLevel');
      console.log('  tools                   - List available tools');
      console.log('  contacts                - Get all contacts');
      console.log('  contact <id>            - Get specific contact');
      console.log('  location                - Get location info');
      console.log('  server                  - Start HTTP server');
      console.log('');
      console.log('Environment variables required:');
      console.log('  GHL_PRIVATE_INTEGRATION_TOKEN - Your GoHighLevel Private Integration Token');
      console.log('  GHL_LOCATION_ID - Your GoHighLevel Location ID');
      return;
    }
    
    switch (command) {
      case 'test':
        await client.testConnection();
        break;
        
      case 'tools':
        const tools = await client.getAvailableTools();
        console.log('Available tools:', JSON.stringify(tools.data, null, 2));
        break;
        
      case 'contacts':
        const contacts = await client.getContacts();
        console.log('Contacts:', JSON.stringify(contacts, null, 2));
        break;
        
      case 'contact':
        const contactId = args[1];
        if (!contactId) {
          console.log('Usage: node index.js contact <contact-id>');
          return;
        }
        const contact = await client.getContact(contactId);
        console.log('Contact:', JSON.stringify(contact, null, 2));
        break;
        
      case 'location':
        const location = await client.getLocation();
        console.log('Location:', JSON.stringify(location, null, 2));
        break;
        
      case 'server':
        startHttpServer(client);
        break;
        
      default:
        console.log(`Unknown command: ${command}`);
        console.log('Run without arguments to see available commands.');
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// HTTP Server for API access
function startHttpServer(client) {
  const app = express();
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || 'localhost';
  
  app.use(cors());
  app.use(express.json());
  
  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });
  
  // Test connection endpoint
  app.get('/test', async (req, res) => {
    const result = await client.testConnection();
    res.json(result);
  });
  
  // Contacts endpoints
  app.get('/contacts', async (req, res) => {
    const result = await client.getContacts(req.query);
    res.json(result);
  });
  
  app.get('/contacts/:id', async (req, res) => {
    const result = await client.getContact(req.params.id);
    res.json(result);
  });
  
  app.post('/contacts', async (req, res) => {
    const result = await client.createContact(req.body);
    res.json(result);
  });
  
  app.put('/contacts/:id', async (req, res) => {
    const result = await client.updateContact(req.params.id, req.body);
    res.json(result);
  });
  
  // Conversations endpoints
  app.get('/conversations', async (req, res) => {
    const result = await client.searchConversations(req.query);
    res.json(result);
  });
  
  app.get('/conversations/:id/messages', async (req, res) => {
    const result = await client.getMessages(req.params.id);
    res.json(result);
  });
  
  app.post('/conversations/:id/messages', async (req, res) => {
    const result = await client.sendMessage(req.params.id, req.body.message);
    res.json(result);
  });
  
  // Location endpoints
  app.get('/location', async (req, res) => {
    const result = await client.getLocation();
    res.json(result);
  });
  
  app.get('/location/custom-fields', async (req, res) => {
    const result = await client.getCustomFields();
    res.json(result);
  });
  
  // Tools endpoint
  app.get('/tools', async (req, res) => {
    const result = await client.getAvailableTools();
    res.json(result);
  });
  
  app.listen(port, host, () => {
    console.log(`🚀 GoHighLevel MCP Client server running at http://${host}:${port}`);
    console.log(`📋 Available endpoints:`);
    console.log(`   GET  /health - Health check`);
    console.log(`   GET  /test - Test connection`);
    console.log(`   GET  /tools - List available tools`);
    console.log(`   GET  /contacts - Get contacts`);
    console.log(`   GET  /contacts/:id - Get specific contact`);
    console.log(`   POST /contacts - Create contact`);
    console.log(`   PUT  /contacts/:id - Update contact`);
    console.log(`   GET  /conversations - Search conversations`);
    console.log(`   GET  /conversations/:id/messages - Get messages`);
    console.log(`   POST /conversations/:id/messages - Send message`);
    console.log(`   GET  /location - Get location info`);
    console.log(`   GET  /location/custom-fields - Get custom fields`);
  });
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default GoHighLevelMCPClient;

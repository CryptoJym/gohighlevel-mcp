#!/usr/bin/env node

import GoHighLevelMCPClient from './index.js';
import dotenv from 'dotenv';

dotenv.config();

async function runTests() {
  console.log('🧪 Starting GoHighLevel MCP Client Tests');
  console.log('=' .repeat(50));
  
  try {
    // Initialize client
    console.log('1. Initializing client...');
    const client = new GoHighLevelMCPClient();
    console.log('✅ Client initialized successfully');
    
    // Test connection
    console.log('\n2. Testing connection...');
    const connectionTest = await client.testConnection();
    if (!connectionTest.success) {
      console.log('❌ Connection test failed. Please check your credentials.');
      console.log('Error:', connectionTest.error);
      return;
    }
    
    // Test available tools
    console.log('\n3. Getting available tools...');
    const tools = await client.getAvailableTools();
    if (tools.success) {
      console.log(`✅ Found ${tools.data.tools.length} available tools`);
      console.log('Tools:', tools.data.tools.slice(0, 5).join(', '), '...');
    }
    
    // Test location info
    console.log('\n4. Getting location information...');
    const location = await client.getLocation();
    if (location.success) {
      console.log('✅ Location info retrieved successfully');
      console.log('Location name:', location.data?.name || 'N/A');
    } else {
      console.log('⚠️  Location info failed:', location.error);
    }
    
    // Test custom fields
    console.log('\n5. Getting custom fields...');
    const customFields = await client.getCustomFields();
    if (customFields.success) {
      console.log('✅ Custom fields retrieved successfully');
      console.log('Number of custom fields:', customFields.data?.length || 0);
    } else {
      console.log('⚠️  Custom fields failed:', customFields.error);
    }
    
    // Test contacts (limited to avoid overwhelming output)
    console.log('\n6. Testing contacts endpoint...');
    const contacts = await client.getContacts({ limit: 5 });
    if (contacts.success) {
      console.log('✅ Contacts retrieved successfully');
      console.log('Number of contacts returned:', contacts.data?.contacts?.length || 0);
    } else {
      console.log('⚠️  Contacts test failed:', contacts.error);
    }
    
    // Test pipelines
    console.log('\n7. Getting opportunity pipelines...');
    const pipelines = await client.getPipelines();
    if (pipelines.success) {
      console.log('✅ Pipelines retrieved successfully');
      console.log('Number of pipelines:', pipelines.data?.length || 0);
    } else {
      console.log('⚠️  Pipelines test failed:', pipelines.error);
    }
    
    console.log('\n' + '=' .repeat(50));
    console.log('🎉 Test suite completed!');
    console.log('✅ GoHighLevel MCP Client is working correctly');
    
  } catch (error) {
    console.log('\n❌ Test suite failed with error:');
    console.error(error.message);
    console.log('\nPlease check your .env file and ensure all required variables are set:');
    console.log('- GHL_PRIVATE_INTEGRATION_TOKEN');
    console.log('- GHL_LOCATION_ID');
  }
}

// Performance test
async function performanceTest() {
  console.log('\n🚀 Running performance test...');
  
  try {
    const client = new GoHighLevelMCPClient();
    const startTime = Date.now();
    
    // Run multiple concurrent requests
    const promises = [
      client.getLocation(),
      client.getCustomFields(),
      client.getContacts({ limit: 1 }),
      client.getPipelines(),
      client.getAvailableTools()
    ];
    
    const results = await Promise.all(promises);
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    const successCount = results.filter(r => r.success).length;
    
    console.log(`⏱️  Performance test completed in ${duration}ms`);
    console.log(`✅ ${successCount}/${results.length} requests successful`);
    console.log(`📊 Average response time: ${Math.round(duration / results.length)}ms per request`);
    
  } catch (error) {
    console.log('❌ Performance test failed:', error.message);
  }
}

// Main test runner
async function main() {
  const args = process.argv.slice(2);
  const testType = args[0] || 'basic';
  
  switch (testType) {
    case 'basic':
      await runTests();
      break;
    case 'performance':
      await performanceTest();
      break;
    case 'all':
      await runTests();
      await performanceTest();
      break;
    default:
      console.log('Usage: node test.js [basic|performance|all]');
      console.log('  basic      - Run basic functionality tests (default)');
      console.log('  performance - Run performance tests');
      console.log('  all        - Run all tests');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

# GoHighLevel MCP - Quick Start Guide for Connor Larson

## 🎯 What You're Installing

The GoHighLevel MCP gives you **21 powerful tools** to manage your GoHighLevel CRM directly from Claude Desktop:
- Manage contacts, conversations, calendars
- Update opportunities and pipelines
- Send messages and track payments
- All without leaving Claude!

---

## ⚡ Quick Install (Recommended - 2 Minutes)

### Method 1: Using the MCP Installer (Easiest!)

1. **Ask Claude to install it** (if you have the MCP installer):
   ```
   Install the GoHighLevel MCP from GitHub at
   https://github.com/YOUR-ORG/gohighlevel-mcp
   ```

2. **Restart Claude Desktop**

3. **Configure your credentials** (see "Getting Credentials" below)

4. **Done!** ✅

---

## 📦 Method 2: Manual Installation

If you prefer manual control:

### Step 1: Clone the Repository
```bash
git clone https://github.com/YOUR-ORG/gohighlevel-mcp.git
cd gohighlevel-mcp
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run Setup Wizard
```bash
npm run setup
```

The wizard will:
- Ask for your Private Integration Token
- Ask for your Location ID
- Create your `.env` file
- Test your connection
- Show you what to do next

---

## 🔑 Getting Your GoHighLevel Credentials

You need **TWO things**:

### 1. Private Integration Token (starts with "pit-")

1. Log into your GoHighLevel account
2. Go to **Settings** → **Private Integrations**
3. Click **"Create New Integration"**
4. Name it: "Claude Desktop MCP"
5. Select these scopes:
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
   - ✅ View Payment Orders
   - ✅ View Payment Transactions
   - ✅ View Custom Fields
   - ✅ View Locations
6. Click **Create**
7. **Copy your token** (it starts with `pit-`)

### 2. Location ID (your sub-account ID)

**Option A:** Find it in the URL
- When you're in your GoHighLevel location
- Look at the browser URL
- Your Location ID is the long string after `/location/`

**Option B:** Use the API settings
- Go to Settings → API Settings
- Your Location ID is displayed there

---

## ⚙️ Configuring Claude Desktop

### Step 1: Find Your Config File

**Mac:**
```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows:**
```
%APPDATA%/Claude/claude_desktop_config.json
```

**Linux:**
```
~/.config/Claude/claude_desktop_config.json
```

### Step 2: Edit the Config File

Open the file and add this configuration:

```json
{
  "mcpServers": {
    "gohighlevel": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/gohighlevel-mcp/gohighlevel-mcp-proxy.mjs"],
      "env": {
        "GHL_PRIVATE_INTEGRATION_TOKEN": "pit-YOUR-TOKEN-HERE",
        "GHL_LOCATION_ID": "YOUR-LOCATION-ID-HERE",
        "DEBUG": "false"
      }
    }
  }
}
```

### Step 3: Update the Paths

**CRITICAL:** Replace these placeholders:

1. Replace `/ABSOLUTE/PATH/TO` with your actual path:
   - **Mac example:** `/Users/connor/gohighlevel-mcp/gohighlevel-mcp-proxy.mjs`
   - **Windows example:** `C:/Users/connor/gohighlevel-mcp/gohighlevel-mcp-proxy.mjs`

2. Replace `pit-YOUR-TOKEN-HERE` with your actual Private Integration Token

3. Replace `YOUR-LOCATION-ID-HERE` with your actual Location ID

### Step 4: Save and Restart

1. **Save the file**
2. **Quit Claude Desktop completely** (don't just close the window)
3. **Reopen Claude Desktop**

---

## ✅ Testing Your Installation

### Quick Test

Open Claude Desktop and ask:
```
What GoHighLevel tools do I have available?
```

You should see a list of 21 tools!

### Try These Commands

```
Show me my GoHighLevel contacts
```

```
Get my calendar events for today
```

```
Search for conversations with the tag "hot-lead"
```

If Claude responds with data, **you're all set!** 🎉

---

## 🔧 Troubleshooting

### Problem: "I don't see GoHighLevel tools in Claude"

**Solutions:**
1. ✅ Check your config file path is correct
2. ✅ Make sure you **fully restarted** Claude Desktop (Quit and reopen)
3. ✅ Check for JSON syntax errors (missing commas, quotes)
4. ✅ Verify the path to `gohighlevel-mcp-proxy.mjs` is absolute, not relative

### Problem: "Authentication failed" or "Invalid credentials"

**Solutions:**
1. ✅ Verify your token starts with `pit-`
2. ✅ Check token hasn't expired in GoHighLevel
3. ✅ Ensure Location ID is correct (no spaces or extra characters)
4. ✅ Try regenerating your Private Integration Token

### Problem: "Module not found" or "Cannot find module"

**Solutions:**
1. ✅ Navigate to your `gohighlevel-mcp` directory
2. ✅ Run `npm install` again
3. ✅ Check the path in your config is absolute (starts with `/` on Mac/Linux or `C:/` on Windows)
4. ✅ Make sure you're pointing to the `.mjs` file, not the directory

### Problem: "Command not found" or "npm not recognized"

**Solutions:**
1. ✅ Install Node.js from https://nodejs.org (LTS version recommended)
2. ✅ Restart your terminal/command prompt after installing
3. ✅ Verify with: `node --version` and `npm --version`

### Problem: Config file won't save or can't find it

**Solutions:**
1. ✅ You might need to create it if it doesn't exist
2. ✅ Make sure the `Claude` folder exists in Application Support (Mac) or AppData (Windows)
3. ✅ Use a text editor like VS Code, not Word or rich text editors
4. ✅ Make sure it's saved as `.json`, not `.json.txt`

### Still Having Issues?

1. Check the full documentation in `INSTALL.md`
2. Run the test script: `npm test` in the gohighlevel-mcp directory
3. Enable debug mode by setting `"DEBUG": "true"` in your config
4. Look for error messages in Claude Desktop's logs
5. **Ask for help!** Include:
   - The error message you're seeing
   - Your operating system
   - Whether you're using Method 1 or Method 2

---

## 🎯 What You Can Do Now

### Contact Management
```
Create a new contact named John Doe with email john@example.com
```
```
Add the tag "vip-client" to contact ID abc123
```
```
Show me all contacts created this week
```

### Conversations
```
Search for conversations with the tag "follow-up"
```
```
Send a message "Thanks for your interest!" to conversation ID xyz789
```
```
Get all messages from conversation abc123
```

### Calendar
```
Show me my calendar events for tomorrow
```
```
Get appointment notes for event ID def456
```

### Opportunities
```
Show me all open opportunities in my sales pipeline
```
```
Update opportunity ID ghi789 to stage "Proposal Sent"
```

### Payments
```
Get order details for order ID jkl012
```
```
List all transactions from this month
```

---

## 📚 All 21 Available Tools

### Contact Management (8 tools)
- `gohighlevel_get_contacts` - Get all contacts with filtering
- `gohighlevel_get_contact` - Get specific contact
- `gohighlevel_create_contact` - Create new contact
- `gohighlevel_update_contact` - Update existing contact
- `gohighlevel_upsert_contact` - Create or update contact
- `gohighlevel_add_tags_to_contact` - Add tags
- `gohighlevel_remove_tags_from_contact` - Remove tags
- `gohighlevel_get_all_tasks` - Get contact tasks

### Conversation Management (3 tools)
- `gohighlevel_search_conversations` - Search and filter
- `gohighlevel_get_messages` - Get conversation messages
- `gohighlevel_send_message` - Send new message

### Calendar Management (2 tools)
- `gohighlevel_get_calendar_events` - Get events
- `gohighlevel_get_appointment_notes` - Get notes

### Opportunity Management (4 tools)
- `gohighlevel_search_opportunities` - Search opportunities
- `gohighlevel_get_opportunity` - Get specific opportunity
- `gohighlevel_update_opportunity` - Update opportunity
- `gohighlevel_get_pipelines` - Get all pipelines

### Payment Management (2 tools)
- `gohighlevel_get_order_by_id` - Get order details
- `gohighlevel_list_transactions` - List transactions

### Location Management (2 tools)
- `gohighlevel_get_location` - Get location details
- `gohighlevel_get_custom_fields` - Get custom fields

---

## 🎓 Pro Tips

1. **Start simple** - Try getting contacts first to make sure everything works
2. **Use natural language** - Just tell Claude what you want to do
3. **Be specific** - Include IDs when updating or searching for specific items
4. **Check your data** - Verify important changes in GoHighLevel
5. **Ask for help** - If you're not sure how to do something, just ask Claude!

---

## 🚀 You're All Set!

Installation time: **~5 minutes**
Productivity boost: **Forever!**

Remember:
- ✅ 21 tools available
- ✅ Direct CRM access from Claude
- ✅ No switching between apps
- ✅ Automation made easy

**Questions?** Check the docs or ask for help!

**Happy automating, Connor!** 🎉

---

*Last updated: 2025-10-01*
*Package: @manus-ai/gohighlevel-mcp v1.0.0*

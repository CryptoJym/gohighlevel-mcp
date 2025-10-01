# GoHighLevel MCP - Install in 5 Steps

## What You'll Get
21 tools to manage your GoHighLevel CRM directly from Claude Desktop.

---

## Step 1: Get Your GoHighLevel Credentials

### A. Get Your Private Integration Token

1. Log into GoHighLevel
2. Click **Settings** (gear icon)
3. Click **Private Integrations**
4. Click **Create New Integration**
5. Name it: `Claude Desktop`
6. Click all the checkboxes under **Scopes**
7. Click **Create**
8. **Copy the token** (starts with `pit-`)
9. Save it somewhere safe (you'll need it in Step 4)

### B. Get Your Location ID

1. Look at your GoHighLevel URL in the browser
2. Find the part that says `/location/XXXXX`
3. Copy that `XXXXX` part (that's your Location ID)
4. Save it somewhere safe (you'll need it in Step 4)

---

## Step 2: Download the Code

1. Open Terminal (Mac) or Command Prompt (Windows)
2. Copy and paste this:

```bash
git clone https://github.com/CryptoJym/gohighlevel-mcp.git
cd gohighlevel-mcp
npm install
```

3. Wait for it to finish (about 30 seconds)

---

## Step 3: Find Your Claude Config File

**Mac:** Open Finder, press `Cmd+Shift+G`, paste this:
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows:** Open File Explorer, paste this in the address bar:
```
%APPDATA%\Claude\claude_desktop_config.json
```

If the file doesn't exist, create it.

---

## Step 4: Edit the Config File

1. Open the file with any text editor (TextEdit, Notepad, VS Code)
2. Delete everything in the file
3. Copy and paste this:

```json
{
  "mcpServers": {
    "gohighlevel": {
      "command": "node",
      "args": ["PUT_YOUR_PATH_HERE/gohighlevel-mcp-proxy.mjs"],
      "env": {
        "GHL_PRIVATE_INTEGRATION_TOKEN": "PUT_YOUR_TOKEN_HERE",
        "GHL_LOCATION_ID": "PUT_YOUR_LOCATION_ID_HERE"
      }
    }
  }
}
```

4. **Replace these 3 things:**

   **A. Replace `PUT_YOUR_PATH_HERE`** with the full path to where you downloaded the code:

   To find it, in Terminal/Command Prompt type:
   ```bash
   pwd
   ```

   Copy the result and replace `PUT_YOUR_PATH_HERE` with it.

   **Example Mac:**
   ```json
   "args": ["/Users/connor/gohighlevel-mcp/gohighlevel-mcp-proxy.mjs"]
   ```

   **Example Windows:**
   ```json
   "args": ["C:/Users/connor/gohighlevel-mcp/gohighlevel-mcp-proxy.mjs"]
   ```

   **B. Replace `PUT_YOUR_TOKEN_HERE`** with your token from Step 1A (starts with `pit-`)

   **C. Replace `PUT_YOUR_LOCATION_ID_HERE`** with your Location ID from Step 1B

5. **Save the file**

---

## Step 5: Restart Claude Desktop

1. **Completely quit Claude Desktop** (don't just close the window)
   - Mac: Right-click Claude in Dock → Quit
   - Windows: Right-click Claude in system tray → Exit

2. **Open Claude Desktop again**

3. **Test it** - Ask Claude:
   ```
   What GoHighLevel tools do I have?
   ```

If you see a list of 21 tools, **you're done!** ✅

---

## Quick Test Commands

Try these to make sure it's working:

```
Show me my GoHighLevel contacts
```

```
Get my calendar events for today
```

```
List my opportunities
```

---

## Troubleshooting

### "I don't see GoHighLevel tools"

1. Make sure you saved the config file
2. Make sure you **fully quit** Claude (not just closed the window)
3. Check for typos in your config file
4. Make sure the path ends with `gohighlevel-mcp-proxy.mjs`

### "Authentication failed"

1. Make sure your token starts with `pit-`
2. Make sure you copied the whole token (no spaces)
3. Make sure your Location ID has no spaces
4. Try creating a new token in GoHighLevel

### "Command not found" or "npm not recognized"

1. Install Node.js from https://nodejs.org
2. Restart your Terminal/Command Prompt
3. Try the commands again

### Still stuck?

Include this info when asking for help:
- What step you're on
- The exact error message
- Your operating system (Mac/Windows)

---

## That's It!

You now have 21 GoHighLevel tools in Claude Desktop.

**Installation time:** 5 minutes
**What you can do:** Manage your entire CRM from Claude

Need the full guide? Check `CONNOR_QUICK_START.md` or watch the presentation.

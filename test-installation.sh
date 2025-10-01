#!/bin/bash
# Test Installation Flow for GoHighLevel MCP
# This simulates what a team member would experience

set -e  # Exit on error

echo "🧪 Testing GoHighLevel MCP Installation Flow"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Check package.json exists
echo "📦 Test 1: Checking package.json..."
if [ -f "package.json" ]; then
    echo -e "${GREEN}✅ package.json found${NC}"
else
    echo -e "${RED}❌ package.json not found${NC}"
    exit 1
fi

# Test 2: Check bin entries in package.json
echo ""
echo "🔧 Test 2: Checking CLI bin entries..."
if grep -q '"ghl-mcp"' package.json && grep -q '"gohighlevel-mcp"' package.json; then
    echo -e "${GREEN}✅ CLI bin entries configured${NC}"
else
    echo -e "${RED}❌ CLI bin entries missing${NC}"
    exit 1
fi

# Test 3: Check setup.js exists and is executable
echo ""
echo "⚙️  Test 3: Checking setup.js..."
if [ -f "setup.js" ]; then
    echo -e "${GREEN}✅ setup.js found${NC}"
    if [ -x "setup.js" ]; then
        echo -e "${GREEN}✅ setup.js is executable${NC}"
    else
        echo -e "${YELLOW}⚠️  setup.js not executable (chmod +x needed)${NC}"
    fi
else
    echo -e "${RED}❌ setup.js not found${NC}"
    exit 1
fi

# Test 4: Check main MCP proxy file
echo ""
echo "🌐 Test 4: Checking MCP proxy server..."
if [ -f "gohighlevel-mcp-proxy.mjs" ]; then
    echo -e "${GREEN}✅ gohighlevel-mcp-proxy.mjs found${NC}"
else
    echo -e "${RED}❌ gohighlevel-mcp-proxy.mjs not found${NC}"
    exit 1
fi

# Test 5: Check documentation files
echo ""
echo "📚 Test 5: Checking documentation..."
DOCS_OK=true
if [ -f "README.md" ]; then
    echo -e "${GREEN}✅ README.md exists${NC}"
else
    echo -e "${RED}❌ README.md missing${NC}"
    DOCS_OK=false
fi

if [ -f "INSTALL.md" ]; then
    echo -e "${GREEN}✅ INSTALL.md exists${NC}"
else
    echo -e "${RED}❌ INSTALL.md missing${NC}"
    DOCS_OK=false
fi

if [ -f ".env.example" ]; then
    echo -e "${GREEN}✅ .env.example exists${NC}"
else
    echo -e "${RED}❌ .env.example missing${NC}"
    DOCS_OK=false
fi

if [ "$DOCS_OK" = false ]; then
    exit 1
fi

# Test 6: Check .gitignore includes .env
echo ""
echo "🔒 Test 6: Checking .gitignore for security..."
if [ -f ".gitignore" ] && grep -q ".env" .gitignore; then
    echo -e "${GREEN}✅ .env is in .gitignore (secure)${NC}"
else
    echo -e "${RED}❌ .env not in .gitignore (security risk!)${NC}"
    exit 1
fi

# Test 7: Check npm scripts
echo ""
echo "📜 Test 7: Checking npm scripts..."
SCRIPTS_OK=true
for script in "setup" "validate" "test" "start"; do
    if grep -q "\"$script\":" package.json; then
        echo -e "${GREEN}✅ npm run $script - configured${NC}"
    else
        echo -e "${RED}❌ npm run $script - missing${NC}"
        SCRIPTS_OK=false
    fi
done

if [ "$SCRIPTS_OK" = false ]; then
    exit 1
fi

# Test 8: Check dependencies are installable (without actually running npm install)
echo ""
echo "📦 Test 8: Checking dependencies..."
if grep -q '"dependencies"' package.json; then
    echo -e "${GREEN}✅ Dependencies section exists${NC}"

    # Check for required dependencies
    DEPS_OK=true
    for dep in "mcp-proxy" "dotenv" "axios"; do
        if grep -q "\"$dep\"" package.json; then
            echo -e "${GREEN}  ✅ $dep listed${NC}"
        else
            echo -e "${RED}  ❌ $dep missing${NC}"
            DEPS_OK=false
        fi
    done

    if [ "$DEPS_OK" = false ]; then
        exit 1
    fi
else
    echo -e "${RED}❌ No dependencies section${NC}"
    exit 1
fi

# Test 9: Validate README has integration examples
echo ""
echo "🔌 Test 9: Checking integration examples in README..."
if grep -q "Claude Desktop" README.md && grep -q "mcpServers" README.md; then
    echo -e "${GREEN}✅ Claude Desktop integration example found${NC}"
else
    echo -e "${RED}❌ Missing integration examples${NC}"
    exit 1
fi

# Test 10: Check INSTALL.md has team onboarding steps
echo ""
echo "👥 Test 10: Checking team onboarding guide..."
if grep -q "Quick Start" INSTALL.md && grep -q "git clone" INSTALL.md; then
    echo -e "${GREEN}✅ Team onboarding guide complete${NC}"
else
    echo -e "${RED}❌ INSTALL.md missing onboarding steps${NC}"
    exit 1
fi

# Test 11: Simulate what happens after npm install (check postinstall message)
echo ""
echo "📬 Test 11: Checking postinstall message..."
if grep -q "postinstall" package.json; then
    echo -e "${GREEN}✅ Postinstall hook configured${NC}"
else
    echo -e "${YELLOW}⚠️  No postinstall message (optional)${NC}"
fi

# Test 12: Check if .env exists (should NOT in fresh install)
echo ""
echo "🔐 Test 12: Checking .env file status..."
if [ -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file exists (production setup)${NC}"
    echo -e "${YELLOW}   This is OK if already configured${NC}"
else
    echo -e "${GREEN}✅ No .env file (fresh install - good!)${NC}"
fi

# Summary
echo ""
echo "=============================================="
echo -e "${GREEN}🎉 All installation tests passed!${NC}"
echo ""
echo "Next steps for team members:"
echo "  1. git clone <repo-url>"
echo "  2. cd gohighlevel-mcp"
echo "  3. npm install"
echo "  4. npm run setup"
echo "  5. npm test"
echo ""
echo "Package is ready for distribution! ✅"

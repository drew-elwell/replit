#!/bin/bash

echo "🚀 Bennco Website Setup Script"
echo "================================"
echo ""

# Check if files exist
if [ -z "$(ls -A . | grep -v 'TRANSFER_GUIDE.md\|.gitignore\|setup.sh')" ]; then
    echo "⚠️  No project files detected yet!"
    echo ""
    echo "Please follow one of these steps:"
    echo ""
    echo "Option 1 - Download from Replit:"
    echo "  1. Go to your Replit project"
    echo "  2. Click three dots (⋮) in file explorer"
    echo "  3. Select 'Download as zip'"
    echo "  4. Extract and copy ALL files here"
    echo ""
    echo "Option 2 - Git clone:"
    echo "  1. Get your repo URL from Replit/GitHub"
    echo "  2. Run: git clone YOUR_URL temp"
    echo "  3. Run: mv temp/* . && rm -rf temp"
    echo ""
    exit 1
fi

echo "✅ Project files detected!"
echo ""

# Check for package.json (Node.js project)
if [ -f "package.json" ]; then
    echo "📦 Node.js project detected"
    echo "Installing dependencies..."
    npm install
    echo ""
    echo "✅ Dependencies installed!"
    echo "Run: npm start (or check package.json for start command)"
fi

# Check for requirements.txt (Python project)
if [ -f "requirements.txt" ]; then
    echo "🐍 Python project detected"
    echo "Installing dependencies..."
    pip install -r requirements.txt
    echo ""
    echo "✅ Dependencies installed!"
fi

# Check for composer.json (PHP project)
if [ -f "composer.json" ]; then
    echo "🐘 PHP project detected"
    echo "Installing dependencies..."
    composer install
    echo ""
    echo "✅ Dependencies installed!"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Check for .env file needs"
echo "  2. Test your application"
echo "  3. Delete TRANSFER_GUIDE.md and setup.sh when ready"


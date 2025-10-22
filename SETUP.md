# Setup Guide for n8n-nodes-cycode

## Quick Start

### 1. Navigate to the project

```bash
cd /Users/Dev/Downloads/n8n-nodes-cycode
```

### 2. Initialize npm and install dependencies

```bash
npm install
```

### 3. Build the project

```bash
npm run build
```

### 4. Test locally with n8n

#### Option A: Link for development (recommended)

```bash
# In the n8n-nodes-cycode directory
npm link

# Then in your n8n installation directory
cd ~/.n8n
npm link @vandevlin/n8n-nodes-cycode

# Restart n8n
n8n start
```

#### Option B: Install directly

```bash
# In your n8n directory
npm install /Users/Dev/Downloads/n8n-nodes-cycode
```

### 5. Verify installation

1. Open n8n in your browser
2. Go to **Credentials** → **Add credential**
3. Search for "Cycode API"
4. You should see the Cycode API credential option

### 6. Set up your first Cycode credential

1. Click on **Cycode API**
2. Fill in:
   - **Client ID**: Your Cycode API Client ID
   - **Secret Key**: Your Cycode API Secret Key
   - **API Base URL**: `https://api.cycode.com` (default)
3. Click **Create**
4. Test the credential by clicking **Test**

### 7. Use in a workflow

1. Create a new workflow
2. Add an **HTTP Request** node
3. In the node settings:
   - **Authentication**: Generic Credential Type
   - **Generic Auth Type**: Cycode API
   - **Credential**: Select your Cycode API credential
   - **Method**: GET
   - **URL**: `https://api.cycode.com/api/v1/violations`
4. Execute the node to test

## Development Workflow

### Watch mode for development

```bash
npm run dev
```

This will automatically recompile TypeScript files when you make changes.

### Format code

```bash
npm run format
```

### Lint code

```bash
npm run lint
```

### Fix lint issues

```bash
npm run lintfix
```

## Troubleshooting

### Build errors

If you get TypeScript errors, make sure you have the correct version installed:

```bash
npm install --save-dev typescript@^5.8.2
```

### n8n doesn't see the credential

1. Make sure you've built the project: `npm run build`
2. Check that `dist/` folder contains compiled `.js` files
3. Restart n8n completely
4. Clear browser cache

### Token not refreshing

Check the `preAuthentication` method in the credential file. The token refresh logic should automatically trigger when the token is within 5 minutes of expiry.

## Publishing to npm (when ready)

### 1. Update package.json version

```json
{
  "version": "0.1.0"
}
```

### 2. Build the package

```bash
npm run build
```

### 3. Login to npm

```bash
npm login
```

### 4. Publish

```bash
npm publish --access public
```

## Next Steps

- Add actual Cycode operations (nodes for violations, scans, etc.)
- Implement refresh token logic
- Add more comprehensive error handling
- Create unit tests
- Set up CI/CD pipeline
- Create detailed documentation with examples

## Project Structure

```
n8n-nodes-cycode/
├── credentials/
│   ├── CycodeApi.credentials.ts    # Credential implementation
│   └── cycode.svg                   # Icon
├── nodes/                           # Future: actual operation nodes
│   └── Cycode/
├── dist/                            # Compiled output (generated)
├── package.json                     # npm configuration
├── tsconfig.json                    # TypeScript configuration
├── .gitignore                       # Git ignore rules
├── LICENSE                          # MIT License
└── README.md                        # Documentation
```

## Useful Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run dev` | Watch mode - auto-compile on changes |
| `npm run format` | Format code with Prettier |
| `npm run lint` | Check code for issues |
| `npm run lintfix` | Fix auto-fixable lint issues |
| `npm link` | Link package for local development |
| `npm publish` | Publish to npm registry |

## Resources

- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [n8n Credential Type Documentation](https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials/)
- [Cycode API Documentation](https://docs.cycode.com/)

## Support

If you encounter any issues, please check:
1. n8n logs: `~/.n8n/logs/`
2. Browser console for client-side errors
3. TypeScript compilation errors in terminal

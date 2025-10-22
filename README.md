# n8n-nodes-cycode

This is an n8n community node for integrating with [Cycode](https://cycode.com), a comprehensive security platform for detecting and preventing secrets, vulnerabilities, and security misconfigurations in your code.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Features

- **Automatic Token Management**: Handles JWT token generation and refresh automatically
- **Secure Credential Storage**: Client ID and Secret are stored securely with password protection
- **Token Caching**: Reuses valid tokens to reduce API calls
- **Configurable Base URL**: Support for different Cycode instances or environments
- **Built-in Testing**: Validates credentials during setup

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Option 1: Install via npm (Recommended)

```bash
npm install @vandevlin/n8n-nodes-cycode
```

### Option 2: Manual Installation (for development)

```bash
cd ~/.n8n/custom
git clone https://github.com/vandevlin/n8n-nodes-cycode.git
cd n8n-nodes-cycode
npm install
npm run build
```

## Prerequisites

Before using this node, you need:

1. A Cycode account
2. API credentials (Client ID and Secret Key)

### Getting Cycode API Credentials

1. Log in to your [Cycode dashboard](https://app.cycode.com)
2. Navigate to **Settings** → **API Keys**
3. Click **Create API Key**
4. Copy your **Client ID** and **Secret Key**
5. Store them securely - the Secret Key is only shown once

## Configuration

### Setting up Credentials in n8n

1. In n8n, go to **Credentials** → **New**
2. Search for "Cycode API"
3. Enter your credentials:
   - **Client ID**: Your Cycode API Client ID
   - **Secret Key**: Your Cycode API Secret Key
   - **API Base URL** (optional): Default is `https://api.cycode.com`
4. Click **Save** and **Test**

The credential will automatically:
- Fetch a JWT token from Cycode
- Store the token securely
- Refresh the token automatically before expiry
- Handle authentication for all Cycode API requests

## Usage

Once credentials are configured, you can use Cycode with HTTP Request nodes in your workflows.

### Example: Get Violations

Use the HTTP Request node with Cycode API credentials to fetch violations and other security data.

## How It Works

### Token Management

The credential implementation uses a sophisticated token management system:

1. **Initial Authentication**: When first used, the node exchanges your Client ID and Secret for a JWT token
2. **Token Caching**: The token is stored as a hidden field in the credential
3. **Auto-Refresh**: Before each API call, the node checks if the token is still valid (with a 5-minute buffer)
4. **Seamless Renewal**: If the token is expired or about to expire, it's automatically refreshed without user intervention

### Security Features

- **Password Protection**: Secret Key is masked in the UI
- **Hidden Token Storage**: JWT tokens are stored as hidden fields
- **Encrypted at Rest**: n8n encrypts all credential data
- **Automatic Rotation**: Tokens are refreshed automatically

## API Coverage

This package currently provides credentials for Cycode API authentication. You can use it with:

- HTTP Request node with Cycode API endpoints
- Custom Cycode operation nodes (when implemented)

### Supported Cycode APIs

With these credentials, you can access:

- **Secrets Detection API**: Scan for exposed secrets
- **SCA (Software Composition Analysis) API**: Analyze dependencies
- **SAST (Static Application Security Testing) API**: Scan code for vulnerabilities
- **IaC (Infrastructure as Code) API**: Check infrastructure configurations
- **Violations API**: Retrieve and manage security violations
- **Projects API**: Manage Cycode projects
- **Users API**: User management

## Troubleshooting

### "Authentication failed" error

**Cause**: Invalid Client ID or Secret Key

**Solution**:
1. Verify your credentials in the Cycode dashboard
2. Ensure you copied the entire Secret Key (it's long!)
3. Check that the API key hasn't been revoked
4. Try creating a new API key

### Token refresh failures

**Cause**: Network issues or Cycode API downtime

**Solution**:
1. Check your internet connection
2. Verify Cycode API status
3. Try saving the credential again to force a token refresh

### "No token received" error

**Cause**: API response format changed or network issue

**Solution**:
1. Update to the latest version of this package
2. Check Cycode API documentation for changes
3. Report the issue on GitHub

## Development

### Building from Source

```bash
git clone https://github.com/vandevlin/n8n-nodes-cycode.git
cd n8n-nodes-cycode
npm install
npm run build
```

### File Structure

```
n8n-nodes-cycode/
├── credentials/
│   ├── CycodeApi.credentials.ts    # Main credential implementation
│   └── cycode.svg                   # Cycode logo
├── nodes/
│   └── Cycode/                      # Future node implementations
├── package.json
├── tsconfig.json
└── README.md
```

## Compatibility

- **Minimum n8n version**: 1.0.0
- **Node.js**: >=20.15
- **Tested with**: n8n 1.82.0+

## Resources

- [n8n Documentation](https://docs.n8n.io/)
- [Cycode API Documentation](https://docs.cycode.com/)
- [Cycode Authentication Guide](https://docs.cycode.com/reference/authentication)

## License

MIT

## Changelog

### 0.1.0 (Initial Release)

- Cycode API credential support with automatic JWT token management
- Token auto-refresh with 5-minute buffer
- Configurable base URL for different Cycode instances
- Built-in credential testing

---

Built with ❤️ for the n8n and Cycode communities

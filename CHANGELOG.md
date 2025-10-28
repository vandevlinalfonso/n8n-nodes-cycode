# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.3] - 2025-10-28

### Changed
- **Updated Cycode Logo**: Replaced generic logo with official Cycode brand logo featuring black circular background and white interlocking hexagonal design

## [0.1.2] - 2025-10-28

### Fixed
- **Fixed Credential Test**: Updated test endpoint from non-existent `/api/v1/user/me` to correct `/api/v1/auth/api-token` authentication endpoint
- Credentials can now be properly validated when saving

## [0.1.1] - 2025-10-28

### Added
- **Cycode Node**: Added basic Cycode node with two operations:
  - Violation → Get Many: Fetch violations from Cycode API
  - User → Get Current: Get current user information
- Automatic authentication using saved credentials

### Fixed
- **Package Installation**: Fixed issue where credentials-only packages cannot be installed in n8n (n8n requires at least one node)

## [0.1.0] - 2025-10-22

### Added
- Initial release of n8n-nodes-cycode
- Cycode API credential with automatic JWT token management
- Automatic token refresh with 5-minute expiry buffer
- Configurable base URL for different Cycode instances
- Built-in credential testing via `/api/v1/user/me` endpoint
- Secure credential storage with password-masked secret key
- Hidden token and refresh token storage
- Support for n8n workflow automation platform
- Official Cycode logo/icon integration
- Comprehensive documentation (README, SETUP guide)
- MIT License

### Features
- **Automatic Authentication**: Seamlessly handles JWT token generation and renewal
- **Token Caching**: Stores tokens securely to minimize API calls
- **Smart Refresh**: Automatically refreshes tokens 5 minutes before expiry
- **Security First**: Password-protected credentials with encrypted storage
- **Configurable**: Support for custom Cycode API base URLs
- **Production Ready**: Comprehensive error handling and validation

### Technical Details
- Built with TypeScript
- Compatible with n8n 1.0.0+
- Requires Node.js >=20.15
- Implements n8n ICredentialType interface
- Uses preAuthentication hook for token management

[0.1.3]: https://github.com/vandevlinalfonso/n8n-nodes-cycode/releases/tag/v0.1.3
[0.1.2]: https://github.com/vandevlinalfonso/n8n-nodes-cycode/releases/tag/v0.1.2
[0.1.1]: https://github.com/vandevlinalfonso/n8n-nodes-cycode/releases/tag/v0.1.1
[0.1.0]: https://github.com/vandevlinalfonso/n8n-nodes-cycode/releases/tag/v0.1.0

import type {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
    ICredentialDataDecryptedObject,
} from 'n8n-workflow';

export class CycodeApi implements ICredentialType {
    name = 'cycodeApi';
    displayName = 'Cycode API';
    documentationUrl = 'https://docs.cycode.com/reference/authentication';
    icon = 'file:cycode.svg' as const;

    properties: INodeProperties[] = [
        {
            displayName: 'Client ID',
            name: 'clientId',
            type: 'string',
            default: '',
            required: true,
            description: 'Your Cycode API Client ID',
        },
        {
            displayName: 'Secret Key',
            name: 'secret',
            type: 'string',
            typeOptions: { password: true },
            default: '',
            required: true,
            description: 'Your Cycode API Secret Key',
        },
        {
            displayName: 'API Base URL',
            name: 'baseUrl',
            type: 'string',
            default: 'https://api.cycode.com',
            description: 'The base URL for Cycode API (default: https://api.cycode.com)',
        },
        {
            displayName: 'Access Token',
            name: 'token',
            type: 'hidden',
            typeOptions: {
                expirable: true,
            },
            default: '',
        },
        {
            displayName: 'Refresh Token',
            name: 'refreshToken',
            type: 'hidden',
            default: '',
        },
        {
            displayName: 'Token Expiry',
            name: 'tokenExpiry',
            type: 'hidden',
            default: 0,
        },
    ];

    async preAuthentication(
        this: any,
        credentials: ICredentialDataDecryptedObject,
    ): Promise<ICredentialDataDecryptedObject> {
        const now = Math.floor(Date.now() / 1000);
        const expiry = (credentials.tokenExpiry as number) ?? 0;

        // Check if token exists and is still valid (with 5 minute buffer)
        if (credentials.token && expiry && expiry - now > 300) {
            return credentials;
        }

        // Fetch new token
        const baseUrl = (credentials.baseUrl as string) || 'https://api.cycode.com';
        
        const response = await this.helpers.httpRequest({
            method: 'POST',
            url: `${baseUrl}/api/v1/auth/api-token`,
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
            },
            body: {
                clientId: credentials.clientId,
                secret: credentials.secret,
            },
            json: true,
        });

        if (!response.token) {
            throw new Error('Cycode authentication failed: No token received');
        }

        // Store token, refresh token, and calculate expiry
        credentials.token = response.token;
        credentials.refreshToken = response.refresh_token;
        // expires_in is in seconds, so calculate Unix timestamp
        credentials.tokenExpiry = Math.floor(Date.now() / 1000) + (response.expires_in || 2100);

        return credentials;
    }

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                Authorization: '=Bearer {{$credentials.token}}',
            },
        },
    };

    test: ICredentialTestRequest = {
        request: {
            baseURL: '={{$credentials.baseUrl || "https://api.cycode.com"}}',
            url: '/api/v1/auth/api-token',
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
            },
            body: {
                clientId: '={{$credentials.clientId}}',
                secret: '={{$credentials.secret}}',
            },
        },
    };
}

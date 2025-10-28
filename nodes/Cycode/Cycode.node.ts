import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class Cycode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Cycode',
		name: 'cycode',
		icon: 'file:cycode.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Cycode API',
		defaults: {
			name: 'Cycode',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'cycodeApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Violation',
						value: 'violation',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'violation',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['violation'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get many violations',
						action: 'Get many violations',
						routing: {
							request: {
								method: 'GET',
								url: '/api/v1/violations',
							},
						},
					},
				],
				default: 'getMany',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['user'],
					},
				},
				options: [
					{
						name: 'Get Current',
						value: 'getCurrent',
						description: 'Get current user information',
						action: 'Get current user',
						routing: {
							request: {
								method: 'GET',
								url: '/api/v1/user/me',
							},
						},
					},
				],
				default: 'getCurrent',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				let endpoint = '';
				
				if (resource === 'violation' && operation === 'getMany') {
					endpoint = '/api/v1/violations';
				} else if (resource === 'user' && operation === 'getCurrent') {
					endpoint = '/api/v1/user/me';
				}

				// Make the API call
				const responseData = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'cycodeApi',
					{
						method: 'GET',
						url: endpoint,
					},
				);

				returnData.push({
					json: responseData as any,
					pairedItem: { item: i },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error';
					returnData.push({
						json: {
							error: errorMessage,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

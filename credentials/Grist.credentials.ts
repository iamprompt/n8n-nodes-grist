import type {
  IAuthenticateGeneric,
  Icon,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow'

export class Grist implements ICredentialType {
  name = 'gristApi-enhanced'

  displayName = 'Grist API (Enhanced)'

  icon: Icon = {
    light: 'file:../icons/grist.svg',
    dark: 'file:../icons/grist.svg',
  }

  documentationUrl = 'https://support.getgrist.com/api/#section/Authentication'

  properties: INodeProperties[] = [
    {
      displayName: 'URL',
      name: 'selfHostedUrl',
      type: 'string',
      default: '',
      placeholder: 'http://localhost:8484',
      required: true,
      description:
        'URL of your Grist instance. Include http/https without /api and no trailing slash.',
    },
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      required: true,
    },
  ]

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        Authorization: '=Bearer {{$credentials?.apiKey}}',
      },
    },
  }

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{ $credentials?.selfHostedUrl }}',
      url: '/api/orgs',
      method: 'GET',
    },
  }
}

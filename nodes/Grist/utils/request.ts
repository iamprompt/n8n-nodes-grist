import {
  IDataObject,
  IExecuteFunctions,
  IExecuteSingleFunctions,
  IHookFunctions,
  IHttpRequestMethods,
  IHttpRequestOptions,
  ILoadOptionsFunctions,
  JsonObject,
} from 'n8n-workflow'
import { NodeApiError } from 'n8n-workflow'

import { GristCredentials } from '../types'

export async function gristApiRequest(
  this:
    | IHookFunctions
    | IExecuteFunctions
    | IExecuteSingleFunctions
    | ILoadOptionsFunctions,
  method: IHttpRequestMethods,
  path: string,
  qs: IDataObject = {},
  body: IDataObject | number[] | undefined = undefined,
  option: IDataObject | undefined = undefined,
) {
  const credentials = (await this.getCredentials(
    'gristApi-enhanced',
  )) as GristCredentials

  const options: IHttpRequestOptions = {
    headers: {
      Authorization: `Bearer ${credentials.apiKey}`,
    },
    method,
    qs,
    body,
    baseURL: credentials.selfHostedUrl,
    url: `${credentials.selfHostedUrl}/api${path}`,
    json: true,
  }

  if (
    body === undefined ||
    (Array.isArray(body) && body.length === 0) ||
    (!Array.isArray(body) && Object.keys(body).length === 0)
  ) {
    delete options.body
  }

  if (Object.keys(option || {}).length !== 0) {
    Object.assign(options, option)
  }

  try {
    return await this.helpers.httpRequest(options)
  } catch (error) {
    throw new NodeApiError(this.getNode(), error as JsonObject)
  }
}

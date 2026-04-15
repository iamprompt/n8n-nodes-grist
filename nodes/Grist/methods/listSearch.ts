import type { ILoadOptionsFunctions, INodeListSearchResult } from 'n8n-workflow'

import type {
  GristOrg,
  GristTable,
  GristWorkspaceWithDocsAndDomain,
} from '../types'
import { gristApiRequest } from '../utils/request'

export async function orgSearch(
  this: ILoadOptionsFunctions,
  filter?: string,
): Promise<INodeListSearchResult> {
  const response: GristOrg[] = await gristApiRequest.call(this, 'GET', '/orgs')

  const results = response
    .filter(
      (org) => !filter || org.name.toLowerCase().includes(filter.toLowerCase()),
    )
    .map((org) => ({
      name: org.name,
      value: String(org.id),
    }))

  return { results }
}

export async function workspaceSearch(
  this: ILoadOptionsFunctions,
  filter?: string,
): Promise<INodeListSearchResult> {
  const orgId = this.getNodeParameter('orgId', undefined, {
    extractValue: true,
  }) as string

  const response: GristWorkspaceWithDocsAndDomain[] =
    await gristApiRequest.call(this, 'GET', `/orgs/${orgId}/workspaces`)

  const results = response
    .filter(
      (ws) => !filter || ws.name.toLowerCase().includes(filter.toLowerCase()),
    )
    .map((ws) => ({
      name: ws.name,
      value: String(ws.id),
    }))

  return { results }
}

export async function docSearch(
  this: ILoadOptionsFunctions,
  filter?: string,
): Promise<INodeListSearchResult> {
  const orgId = this.getNodeParameter('orgId', undefined, {
    extractValue: true,
  }) as string

  const response: GristWorkspaceWithDocsAndDomain[] =
    await gristApiRequest.call(this, 'GET', `/orgs/${orgId}/workspaces`)

  const results: { name: string; value: string }[] = []

  for (const ws of response) {
    for (const doc of ws.docs || []) {
      const label = `${doc.name} (${ws.name})`
      if (!filter || label.toLowerCase().includes(filter.toLowerCase())) {
        results.push({
          name: label,
          value: doc.id,
        })
      }
    }
  }

  return { results }
}

export async function tableSearch(
  this: ILoadOptionsFunctions,
  filter?: string,
): Promise<INodeListSearchResult> {
  const docId = this.getNodeParameter('docId', undefined, {
    extractValue: true,
  }) as string

  const response: { tables: GristTable[] } = await gristApiRequest.call(
    this,
    'GET',
    `/docs/${docId}/tables`,
  )

  const results = response.tables
    .filter(
      (table) =>
        !filter || table.id.toLowerCase().includes(filter.toLowerCase()),
    )
    .map((table) => ({
      name: table.id,
      value: table.id,
    }))

  return { results }
}

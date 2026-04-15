import type { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow'

import type { GristColumn } from '../types'
import { gristApiRequest } from '../utils/request'

type LoadOptionsFunctions = {
  [key: string]: (
    this: ILoadOptionsFunctions,
  ) => Promise<INodePropertyOptions[]>
}

// GET /docs/{docId}/tables/{tableId}/columns -> { columns: GristColumn[] }
async function getColumns(
  this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
  const docId = this.getNodeParameter('docId', undefined, {
    extractValue: true,
  }) as string
  const tableId = this.getNodeParameter('tableId', undefined, {
    extractValue: true,
  }) as string

  const response: { columns: GristColumn[] } = await gristApiRequest.call(
    this,
    'GET',
    `/docs/${docId}/tables/${tableId}/columns`,
  )

  return response.columns.map((col) => ({
    name: col.fields?.label || col.id,
    value: col.id,
  }))
}

export const loadOptions: LoadOptionsFunctions = {
  getColumns,
}

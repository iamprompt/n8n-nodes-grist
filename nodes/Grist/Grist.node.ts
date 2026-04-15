import {
  type IExecuteFunctions,
  type INodeExecutionData,
  type INodeType,
  type INodeTypeDescription,
  NodeConnectionTypes,
} from 'n8n-workflow'

import * as listSearch from './methods/listSearch'
import { loadOptions } from './methods/loadOptions'
import { recordDescription } from './resources/record'
import {
  docSelect,
  orgSelect,
  tableSelect,
  workspaceSelect,
} from './shared/descriptions'
import type {
  GristFilterProperty,
  GristGetManyOptions,
  GristSortProperty,
} from './types'
import { gristApiRequest } from './utils/request'

export class Grist implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Grist',
    name: 'grist',
    icon: {
      light: 'file:../../icons/grist.svg',
      dark: 'file:../../icons/grist.svg',
    },
    group: ['input'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Consume the Grist API',
    defaults: {
      name: 'Grist',
    },
    usableAsTool: true,
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    credentials: [
      {
        name: 'gristApi-enhanced',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Record',
            value: 'record',
          },
        ],
        default: 'record',
      },
      orgSelect,
      workspaceSelect,
      docSelect,
      tableSelect,
      ...recordDescription,
    ],
  }

  methods = {
    loadOptions,
    listSearch,
  }

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData()
    const returnData: INodeExecutionData[] = []

    const resource = this.getNodeParameter('resource', 0) as string
    const operation = this.getNodeParameter('operation', 0) as string
    const docId = this.getNodeParameter('docId', 0, undefined, {
      extractValue: true,
    }) as string
    const tableId = this.getNodeParameter('tableId', 0, undefined, {
      extractValue: true,
    }) as string

    const basePath = `/docs/${docId}/tables/${tableId}`

    if (resource === 'record') {
      if (operation === 'getMany') {
        const returnAll = this.getNodeParameter('returnAll', 0) as boolean
        const options = this.getNodeParameter(
          'options',
          0,
          {},
        ) as GristGetManyOptions

        const qs: Record<string, string | number | boolean> = {}

        if (!returnAll) {
          const limit = this.getNodeParameter('limit', 0) as number
          qs.limit = limit
        }

        if (options.filter?.filterProperties?.length) {
          const parsed = options.filter.filterProperties.reduce<
            Record<string, Array<string | number | boolean>>
          >((acc, cur: GristFilterProperty) => {
            acc[cur.field] = acc[cur.field] ?? []

            let vals: (string | number | boolean)[] = []

            if (typeof cur.values === 'string') {
              vals = cur.values
                .split(',')
                .map((v) => v.trim())
                .filter((v) => v !== '')
            }

            if (Array.isArray(cur.values)) {
              vals = cur.values.filter((v) => v !== null && v !== undefined)
            }

            if (typeof cur.values === 'boolean') {
              vals = [cur.values]
            }
            const valueSet = new Set<string | number | boolean>()
            for (const v of vals) {
              valueSet.add(v)
              if (typeof v === 'string') {
                const trimmed = v.trim()
                if (trimmed === '') continue

                // Try number coercion
                const num = Number(trimmed)
                if (!isNaN(num)) {
                  valueSet.add(num)
                }

                // Try boolean coercion
                const lower = trimmed.toLowerCase()
                if (lower === 'true') valueSet.add(true)
                if (lower === 'false') valueSet.add(false)
              }
            }
            acc[cur.field].push(...Array.from(valueSet))
            return acc
          }, {})
          qs.filter = JSON.stringify(parsed)
        }

        if (options.sort?.sortProperties?.length) {
          qs.sort = options.sort.sortProperties
            .map((s: GristSortProperty) =>
              s.direction === 'desc' ? `-${s.field}` : s.field,
            )
            .join(',')
        }

        if (options.hidden) {
          qs.hidden = true
        }

        const response = await gristApiRequest.call(
          this,
          'GET',
          `${basePath}/records`,
          qs,
        )

        const records = (response.records || []) as Array<{
          id: number
          fields: Record<string, unknown>
        }>

        for (const record of records) {
          returnData.push({
            json: { id: record.id, ...record.fields },
          })
        }
      }

      if (operation === 'create') {
        const recordsJson = this.getNodeParameter('recordsJson', 0) as string
        const records = JSON.parse(recordsJson)

        const response = await gristApiRequest.call(
          this,
          'POST',
          `${basePath}/records`,
          {},
          { records },
        )

        returnData.push({ json: response })
      }

      if (operation === 'update') {
        const recordsJson = this.getNodeParameter('recordsJson', 0) as string
        const records = JSON.parse(recordsJson)

        const response = await gristApiRequest.call(
          this,
          'PATCH',
          `${basePath}/records`,
          {},
          { records },
        )

        returnData.push({ json: response })
      }

      if (operation === 'upsert') {
        const recordsJson = this.getNodeParameter('recordsJson', 0) as string
        const inputRecords = JSON.parse(recordsJson) as Array<{
          where: Record<string, unknown>
          fields: Record<string, unknown>
        }>

        // Transform {where, fields} → Grist {require, fields}
        const records = inputRecords.map((r) => ({
          require: r.where,
          fields: r.fields,
        }))

        const onMany = this.getNodeParameter('onMany', 0, 'first') as string
        const options = this.getNodeParameter('options', 0, {}) as {
          noAdd?: boolean
          noUpdate?: boolean
        }

        const qs: Record<string, string | boolean> = {
          onmany: onMany,
        }

        if (options.noAdd) {
          qs.noadd = true
        }

        if (options.noUpdate) {
          qs.noupdate = true
        }

        const response = await gristApiRequest.call(
          this,
          'PUT',
          `${basePath}/records`,
          qs,
          { records },
        )

        returnData.push({ json: response })
      }

      if (operation === 'delete') {
        const rowIdsStr = this.getNodeParameter('rowIds', 0) as string
        const rowIds = rowIdsStr.split(',').map((id) => parseInt(id.trim(), 10))

        const response = await gristApiRequest.call(
          this,
          'POST',
          `${basePath}/data/delete`,
          {},
          rowIds,
        )

        returnData.push({ json: { success: true, deleted: rowIds, response } })
      }
    }

    return [returnData.length ? returnData : items.map((i) => i)]
  }
}

import type { INodeProperties } from 'n8n-workflow'

const showForUpdate = {
  resource: ['record'],
  operation: ['update'],
}

export const recordUpdateDescription: INodeProperties[] = [
  {
    displayName: 'Records (JSON)',
    name: 'recordsJson',
    type: 'json',
    default: '[\n  { "id": 1, "fields": { "Name": "Alice", "Age": 31 } }\n]',
    required: true,
    description:
      'JSON array of record objects, each with an "id" and "fields" key mapping column names to cell values',
    displayOptions: {
      show: showForUpdate,
    },
  },
]

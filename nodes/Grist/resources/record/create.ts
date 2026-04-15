import type { INodeProperties } from 'n8n-workflow'

const showForCreate = {
  resource: ['record'],
  operation: ['create'],
}

export const recordCreateDescription: INodeProperties[] = [
  {
    displayName: 'Records (JSON)',
    name: 'recordsJson',
    type: 'json',
    default: '[\n  { "fields": { "Name": "Alice", "Age": 30 } }\n]',
    required: true,
    description:
      'JSON array of record objects, each with a "fields" key mapping column names to cell values',
    displayOptions: {
      show: showForCreate,
    },
  },
]

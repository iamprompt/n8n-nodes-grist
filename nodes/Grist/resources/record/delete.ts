import type { INodeProperties } from 'n8n-workflow'

const showForDelete = {
  resource: ['record'],
  operation: ['delete'],
}

export const recordDeleteDescription: INodeProperties[] = [
  {
    displayName: 'Row IDs',
    name: 'rowIds',
    type: 'string',
    default: '',
    required: true,
    description: 'Comma-separated list of row IDs to delete. E.g. "1,2,3".',
    placeholder: '1,2,3',
    displayOptions: {
      show: showForDelete,
    },
  },
]

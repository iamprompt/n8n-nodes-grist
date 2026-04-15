import type { INodeProperties } from 'n8n-workflow'

const showForGetMany = {
  resource: ['record'],
  operation: ['getMany'],
}

export const recordGetManyDescription: INodeProperties[] = [
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    description: 'Whether to return all results or only up to a given limit',
    displayOptions: {
      show: showForGetMany,
    },
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 50,
    description: 'Max number of results to return',
    typeOptions: {
      minValue: 1,
    },
    displayOptions: {
      show: {
        ...showForGetMany,
        returnAll: [false],
      },
    },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add option',
    default: {},
    displayOptions: {
      show: showForGetMany,
    },
    options: [
      {
        displayName: 'Filter',
        name: 'filter',
        type: 'string',
        default: '',
        description:
          'JSON object mapping column names to arrays of allowed values. E.g. {"pet": ["cat", "dog"]}.',
        placeholder: '{"columnName": ["value1", "value2"]}',
      },
      {
        displayName: 'Sort',
        name: 'sort',
        type: 'string',
        default: '',
        description:
          'Comma-separated column names to sort by. Prefix with - for descending. E.g. "name,-age".',
        placeholder: 'name,-age',
      },
      {
        displayName: 'Include Hidden Columns',
        name: 'hidden',
        type: 'boolean',
        default: false,
        description: 'Whether to include hidden columns like "manualSort"',
      },
    ],
  },
]

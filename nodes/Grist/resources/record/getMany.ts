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
        placeholder: 'Add Filter',
        description:
          'Only return rows matching all of the given filters. For complex filters, create a formula column and filter for the value "true".',
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        default: {},
        options: [
          {
            displayName: 'Filter Properties',
            name: 'filterProperties',
            values: [
              {
                displayName: 'Column Name or ID',
                name: 'field',
                type: 'options',
                typeOptions: {
                  loadOptionsDependsOn: ['docId', 'tableId'],
                  loadOptionsMethod: 'getColumns',
                },
                default: '',
                description:
                  'Column to apply the filter in. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
                required: true,
              },
              {
                displayName: 'Values',
                name: 'values',
                type: 'string',
                default: '',
                description:
                  'Comma-separated list of values to search for in the filtered column',
              },
            ],
          },
        ],
      },
      {
        displayName: 'Sort Order',
        name: 'sort',
        placeholder: 'Add Sort Field',
        type: 'fixedCollection',
        typeOptions: {
          multipleValues: true,
        },
        default: {},
        options: [
          {
            displayName: 'Sort Properties',
            name: 'sortProperties',
            values: [
              {
                displayName: 'Column Name or ID',
                name: 'field',
                type: 'options',
                typeOptions: {
                  loadOptionsDependsOn: ['docId', 'tableId'],
                  loadOptionsMethod: 'getColumns',
                },
                default: '',
                required: true,
                description:
                  'Column to sort on. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
              },
              {
                displayName: 'Direction',
                name: 'direction',
                type: 'options',
                options: [
                  {
                    name: 'Ascending',
                    value: 'asc',
                  },
                  {
                    name: 'Descending',
                    value: 'desc',
                  },
                ],
                default: 'asc',
                description: 'Direction to sort in',
              },
            ],
          },
        ],
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

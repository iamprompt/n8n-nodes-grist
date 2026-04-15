import type { INodeProperties } from 'n8n-workflow'

const showForUpsert = {
  resource: ['record'],
  operation: ['upsert'],
}

export const recordUpsertDescription: INodeProperties[] = [
  {
    displayName: 'Records (JSON)',
    name: 'recordsJson',
    type: 'json',
    default:
      '[\n  {\n    "where": { "Email": "alice@example.com" },\n    "fields": { "Name": "Alice", "Age": 30 }\n  }\n]',
    required: true,
    description:
      'JSON array of records to upsert. Each object must have "where" (columns to match on) and "fields" (columns to set). If a matching record is found it is updated; otherwise a new record is created.',
    displayOptions: {
      show: showForUpsert,
    },
  },
  {
    displayName: 'On Many Matches',
    name: 'onMany',
    type: 'options',
    default: 'first',
    options: [
      {
        name: 'Update First Match',
        value: 'first',
        description: 'Update only the first matching record',
      },
      {
        name: 'Update All Matches',
        value: 'all',
        description: 'Update all matching records',
      },
      {
        name: 'Skip',
        value: 'none',
        description: 'Do nothing if multiple records match',
      },
    ],
    description: 'What to do when multiple records match the "where" criteria',
    displayOptions: {
      show: showForUpsert,
    },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: showForUpsert,
    },
    options: [
      {
        displayName: 'No Add',
        name: 'noAdd',
        type: 'boolean',
        default: false,
        description:
          'Whether to prevent creating new records when no match is found (update only)',
      },
      {
        displayName: 'No Update',
        name: 'noUpdate',
        type: 'boolean',
        default: false,
        description: 'Whether to prevent updating existing records (add only)',
      },
    ],
  },
]

import type { INodeProperties } from 'n8n-workflow'

import { recordCreateDescription } from './create'
import { recordDeleteDescription } from './delete'
import { recordGetManyDescription } from './getMany'
import { recordUpdateDescription } from './update'
import { recordUpsertDescription } from './upsert'

const showOnlyForRecords = {
  resource: ['record'],
}

export const recordDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForRecords,
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        action: 'Create records in a table',
        description: 'Add new records to a table',
      },
      {
        name: 'Delete',
        value: 'delete',
        action: 'Delete records from a table',
        description: 'Delete records from a table by row IDs',
      },
      {
        name: 'Get Many',
        value: 'getMany',
        action: 'Get records from a table',
        description: 'Fetch records from a table',
      },
      {
        name: 'Update',
        value: 'update',
        action: 'Update records in a table',
        description: 'Modify existing records in a table',
      },
      {
        name: 'Upsert',
        value: 'upsert',
        action: 'Upsert records in a table',
        description: 'Add or update records by matching on specified columns',
      },
    ],
    default: 'getMany',
  },
  ...recordGetManyDescription,
  ...recordCreateDescription,
  ...recordUpdateDescription,
  ...recordUpsertDescription,
  ...recordDeleteDescription,
]

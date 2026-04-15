import type { INodeProperties } from 'n8n-workflow'

export const orgSelect: INodeProperties = {
  displayName: 'Organization',
  name: 'orgId',
  type: 'resourceLocator',
  default: { mode: 'list', value: '' },
  required: true,
  description: 'Select the Grist organization',
  modes: [
    {
      displayName: 'From List',
      name: 'list',
      type: 'list',
      typeOptions: {
        searchListMethod: 'orgSearch',
        searchable: true,
      },
    },
    {
      displayName: 'By ID',
      name: 'id',
      type: 'string',
      placeholder: 'e.g. 42',
    },
  ],
}

export const workspaceSelect: INodeProperties = {
  displayName: 'Workspace',
  name: 'workspaceId',
  type: 'resourceLocator',
  default: { mode: 'list', value: '' },
  required: true,
  description: 'Select the workspace within the organization',
  typeOptions: {
    loadOptionsDependsOn: ['orgId.value'],
  },
  modes: [
    {
      displayName: 'From List',
      name: 'list',
      type: 'list',
      typeOptions: {
        searchListMethod: 'workspaceSearch',
        searchable: true,
      },
    },
    {
      displayName: 'By ID',
      name: 'id',
      type: 'string',
      placeholder: 'e.g. 7',
    },
  ],
}

export const docSelect: INodeProperties = {
  displayName: 'Document',
  name: 'docId',
  type: 'resourceLocator',
  default: { mode: 'list', value: '' },
  required: true,
  description: 'Select the document within the organization',
  typeOptions: {
    loadOptionsDependsOn: ['orgId.value', 'workspaceId.value'],
  },
  modes: [
    {
      displayName: 'From List',
      name: 'list',
      type: 'list',
      typeOptions: {
        searchListMethod: 'docSearch',
        searchable: true,
      },
    },
    {
      displayName: 'By ID',
      name: 'id',
      type: 'string',
      placeholder: 'e.g. mNneSMK1PbrJsqF8DAUE3m',
    },
  ],
}

export const tableSelect: INodeProperties = {
  displayName: 'Table',
  name: 'tableId',
  type: 'resourceLocator',
  default: { mode: 'list', value: '' },
  required: true,
  description: 'Select the table within the document',
  typeOptions: {
    loadOptionsDependsOn: ['docId.value'],
  },
  modes: [
    {
      displayName: 'From List',
      name: 'list',
      type: 'list',
      typeOptions: {
        searchListMethod: 'tableSearch',
        searchable: true,
      },
    },
    {
      displayName: 'By ID',
      name: 'id',
      type: 'string',
      placeholder: 'e.g. Table1',
    },
  ],
}

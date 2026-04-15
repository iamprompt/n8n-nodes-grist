// Credentials

export interface GristCredentials {
  apiKey: string
  selfHostedUrl: string
}

// Users

export interface GristUser {
  id: number
  name: string
  picture: string | null
}

// Organizations

export interface GristOrg {
  id: number
  name: string
  domain: string | null
  owner: GristUser | null
  access: string
  createdAt: string
  updatedAt: string
}

// Workspaces

export interface GristWorkspace {
  id: number
  name: string
  access: string
}

export interface GristWorkspaceWithDocs extends GristWorkspace {
  docs: GristDoc[]
}

export interface GristWorkspaceWithDocsAndDomain extends GristWorkspaceWithDocs {
  orgDomain?: string
}

export interface GristWorkspaceWithOrg extends GristWorkspace {
  org: GristOrg
}

// Documents

export interface GristDoc {
  id: string
  name: string
  access: string
  isPinned: boolean
  urlId: string | null
}

export interface GristDocWithWorkspace extends GristDoc {
  workspace: GristWorkspaceWithOrg
}

// Tables

export interface GristTableFields {
  tableRef?: number
  onDemand?: boolean
}

export interface GristTable {
  id: string
  fields: GristTableFields
}

export interface GristTablesList {
  tables: GristTable[]
}

// Columns

export interface GristColumnFields {
  label?: string
  type?: string
  formula?: string
  isFormula?: boolean
  widgetOptions?: string
  untieColIdFromLabel?: boolean
  recalcWhen?: number
  visibleCol?: number
  recalcDeps?: string | null
  description?: string
}

export interface GristColumn {
  id: string
  fields?: GristColumnFields
}

export interface GristColumnsList {
  columns: GristColumn[]
}

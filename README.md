# @iamprompt/n8n-nodes-grist

This is an n8n community node that lets you use **[Grist](https://www.getgrist.com/)** in your n8n workflows.

Grist is an open-source, spreadsheet-database hybrid that gives you the flexibility of a spreadsheet with the power of a relational database. This node lets you create, read, update, upsert, and delete records in any Grist document — including self-hosted instances.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)  
[Version history](#version-history)  

---

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

In n8n, go to **Settings → Community Nodes → Install** and enter:

```
@iamprompt/n8n-nodes-grist
```

---

## Operations

### Resource: Record

| Operation | Description |
|-----------|-------------|
| **Get Many** | Fetch records from a table, with optional filters, sorting, and a result limit |
| **Create** | Add new records to a table |
| **Update** | Modify existing records by row ID |
| **Upsert** | Add or update records by matching on one or more columns (`where` + `fields`) |
| **Delete** | Remove records by row ID |

---

## Credentials

This node uses the **Grist API (Enhanced)** credential, which requires:

| Field | Description |
|-------|-------------|
| **URL** | Full URL of your Grist instance, e.g. `https://docs.getgrist.com` or `http://localhost:8484` — no trailing slash, no `/api` suffix |
| **API Key** | Your personal Grist API key — find it under _Profile Settings → API_ in Grist |

### Getting your API key

1. Log in to your Grist instance.
2. Click your avatar (top-right) → **Profile Settings**.
3. Scroll to the **API** section and copy your key.

The credential is tested automatically against `GET /api/orgs`.

---

## Compatibility

- Tested with **n8n ≥ 1.x**
- Works with both **Grist Cloud** (`docs.getgrist.com`) and **self-hosted** Grist instances
- Requires Grist API version that supports `/docs/{docId}/tables/{tableId}/records`

---

## Usage

### Selecting a document

Each operation requires you to select an **Organization → Workspace → Document → Table** using dynamic dropdowns. These are resolved from your Grist instance via the API.

### Get Many — Filtering

The `filter` option accepts a Grist filter object as a JSON string, for example:

```json
{"Status": ["Active", "Pending"]}
```

The `sort` option accepts a comma-separated list of column IDs, optionally prefixed with `-` for descending order:

```
-CreatedAt,Name
```

### Upsert — Record format

The **Upsert** operation accepts a JSON array where each entry has:

```json
[
  {
    "where": { "Email": "alice@example.com" },
    "fields": { "Name": "Alice", "Status": "Active" }
  }
]
```

- `where` — columns used to match existing rows
- `fields` — values to set (on match or new insert)

### Delete — Row IDs

Provide a comma-separated list of numeric row IDs to delete, e.g. `1,2,3`.

---

## Resources

- [Grist API documentation](https://support.getgrist.com/api/)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Source code on GitHub](https://github.com/iamprompt/n8n-nodes-grist)

---

## Version history

### 0.1.0

Initial release with full **Record** resource support:

- Get Many (with filter, sort, limit)
- Create
- Update
- Upsert (with `onmany`, `noadd`, `noupdate` options)
- Delete

Supports self-hosted and Grist Cloud instances via dynamic org/workspace/document/table selection.

---

## License

[MIT](LICENSE.md)

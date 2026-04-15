# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-04-15

### Added

- **Record** resource with five operations:
  - **Get Many** — fetch records with optional filter, sort, and limit parameters
  - **Create** — add new records to a table
  - **Update** — patch existing records by row ID
  - **Upsert** — add or update records matched by `where` columns (supports `onmany`, `noadd`, `noupdate` query options)
  - **Delete** — remove records by row ID
- **Grist API (Enhanced)** credential supporting self-hosted and Grist Cloud instances
- Dynamic dropdowns for Organization, Workspace, Document, and Table selection
- Automatic credential test against `GET /api/orgs`

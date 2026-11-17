# Medallion Lakehouse Data Pipeline

Visualize a data engineering pipeline that moves source data through Bronze, Silver and Gold layers. Make ingestion, quality checks, analytical models and downstream consumption visible in one editable lakehouse architecture.

[Open the editable template](https://drawarc.io/templates/medallion-lakehouse-data-pipeline?utm_source=github&utm_medium=referral&utm_campaign=templates)

## When to use
- Explain analytical data refinement and ownership to platform engineers, analysts and product stakeholders.
- Plan a batch or incremental lakehouse pipeline with explicit data quality gates and reprocessing boundaries.
- Document where orchestration, transformations and BI consumption interact without conflating control flow with data movement.

## Components
- **Operational sources:** Business systems providing extracts or change records.
- **Ingestion jobs:** Land source data with timestamps and source identifiers.
- **Bronze raw layer:** Retains source fidelity for controlled replay and investigation.
- **Spark quality transforms:** Validates schema, deduplicates records and applies transformation rules.
- **Silver validated layer:** Holds normalized, validated records for reusable downstream processing.
- **Gold business models:** Publishes documented metrics and consumption-ready analytical models.
- **BI dashboards:** Consumes curated models with agreed freshness and access requirements.
- **Airflow orchestration:** Coordinates task dependencies, retries and operational scheduling.

## Review the actual flow
- source → ingest: Extract or CDC
- ingest → bronze: Append raw records
- bronze → spark: Read incremental input
- spark → silver: Validated output
- silver → gold: Business transformations
- gold → bi: Query curated models
- airflow → ingest: Schedule
- airflow → spark: Coordinate runs

## Before implementation
Adapt security boundaries, retries, recovery, capacity and costs to your workload. Read the design notes on the linked template page. The diagram does not provision infrastructure.

## Source
`architecture.arch` is the editable diagram source. Service names refer to their respective providers; third-party icon rights remain separate. [Icon notices](https://drawarc.io/third-party-notices).

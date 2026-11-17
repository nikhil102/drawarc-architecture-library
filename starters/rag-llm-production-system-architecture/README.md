# RAG LLM Production System Architecture

Separate knowledge ingestion from online question answering in a retrieval-augmented generation system. Trace how documents become retrievable chunks and how a query uses selected context to produce a response with sources.

[Open the editable template](https://drawarc.io/templates/rag-llm-production-system-architecture?utm_source=github&utm_medium=referral&utm_campaign=templates)

## When to use
- Design a knowledge assistant that needs document retrieval, source attribution and controlled model access.
- Separate ingestion failures and index freshness concerns from the online response latency budget.
- Review tenant authorization, model costs, prompt changes and answer quality with engineering and product teams.

## Components
- **Knowledge documents:** Approved source documents with ownership, versions and access metadata.
- **Chunk and embed:** Splits content and computes embeddings while preserving source references.
- **Vector store:** Stores embeddings and metadata for access-filtered similarity retrieval.
- **User:** Submits an authenticated question to the assistant.
- **RAG application:** Enforces authorization, retrieves context and constructs the model request.
- **LLM gateway:** Applies provider routing, request limits and bounded model configuration.
- **Evaluation and traces:** Tracks retrieval relevance, response quality, latency and usage costs.

## Review the actual flow
- docs → chunk: Ingest approved content
- chunk → vectors: Index chunks
- user → api: Question
- api → vectors: Authorized retrieval
- api → llm: Question and selected context
- llm → api: Generated response
- api → user: Answer with sources
- api → eval: Quality and usage signals

## Before implementation
Adapt security boundaries, retries, recovery, capacity and costs to your workload. Read the design notes on the linked template page. The diagram does not provision infrastructure.

## Source
`architecture.arch` is the editable diagram source. Service names refer to their respective providers; third-party icon rights remain separate. [Icon notices](https://drawarc.io/third-party-notices).

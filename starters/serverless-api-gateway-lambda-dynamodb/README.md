# Serverless API Gateway Lambda DynamoDB

Design an AWS serverless API with a clear request path and a separate asynchronous processing path. Use API Gateway, Lambda and DynamoDB components to discuss authentication, data access, retry behavior and workload boundaries.

[Open the editable template](https://drawarc.io/templates/serverless-api-gateway-lambda-dynamodb?utm_source=github&utm_medium=referral&utm_campaign=templates)

## When to use
- Plan an API with bursty demand where managed routing and function execution fit the workload.
- Separate short request handling from background jobs with explicit acceptance and retry semantics.
- Review authorization, DynamoDB access patterns and downstream concurrency limits before provisioning resources.

## Components
- **API client:** Sends authenticated requests and handles asynchronous job status.
- **API Gateway:** Routes requests, applies limits and invokes authorization checks.
- **Cognito authorizer:** Provides the identity validation boundary for protected API operations.
- **Request Lambda:** Validates commands, reads or writes state and enqueues background work.
- **DynamoDB:** Stores records designed around explicit partition and query access patterns.
- **SQS work queue:** Buffers jobs and exposes retry and failure handling decisions.
- **Worker Lambda:** Processes queued work idempotently with controlled concurrency.

## Review the actual flow
- client → gateway: HTTPS
- gateway → auth: Validate identity
- gateway → handler: Invoke authorized request
- handler → db: Read or write
- handler → queue: Enqueue job
- queue → worker: Deliver job
- worker → db: Update result

## Before implementation
Adapt security boundaries, retries, recovery, capacity and costs to your workload. Read the design notes on the linked template page. The diagram does not provision infrastructure.

## Source
`architecture.arch` is the editable diagram source. Service names refer to their respective providers; third-party icon rights remain separate. [Icon notices](https://drawarc.io/third-party-notices).

# Kafka Event-Driven Microservices Architecture

Map how an order service publishes events and independent consumers handle fulfillment and notifications. Use the Kafka diagram to discuss delivery guarantees, consumer ownership and recovery when processing fails.

[Open the editable template](https://drawarc.io/templates/kafka-microservices-event-driven-architecture?utm_source=github&utm_medium=referral&utm_campaign=templates)

## When to use
- Decouple order processing from notifications or other integrations with different availability requirements.
- Discuss partition ordering, replay and idempotency with teams that own independent consumers.
- Document asynchronous dependencies and failure handling before migrating a synchronous workflow to events.

## Components
- **Order API:** Validates commands and owns the order lifecycle.
- **Order database:** Stores accepted orders; coordinate event publication with a consistent outbox strategy.
- **Kafka order events:** Retains partitioned events for independent consumer groups.
- **Fulfillment consumer:** Processes orders idempotently and tracks its own progress.
- **Notification consumer:** Sends customer updates without blocking the order API.
- **Dead-letter topic:** Retains repeatedly failing records for controlled inspection and replay.

## Review the actual flow
- api → db: Persist order
- api → events: Publish via consistency strategy
- events → fulfill: Consumer group A
- events → notify: Consumer group B
- fulfill → dlq: After bounded retries
- notify → dlq: After bounded retries

## Before implementation
Adapt security boundaries, retries, recovery, capacity and costs to your workload. Read the design notes on the linked template page. The diagram does not provision infrastructure.

## Source
`architecture.arch` is the editable diagram source. Service names refer to their respective providers; third-party icon rights remain separate. [Icon notices](https://drawarc.io/third-party-notices).

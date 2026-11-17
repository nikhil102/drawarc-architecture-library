# AWS 3-Tier Production Architecture

Separate internet-facing entry points, application compute and persistent data in an AWS three-tier architecture. Customize a working diagram of request routing, caching and database access before discussing your deployment with the team.

[Open the editable template](https://drawarc.io/templates/aws-3-tier-production-architecture?utm_source=github&utm_medium=referral&utm_campaign=templates)

## When to use
- Review a containerized web application whose presentation, compute and database responsibilities need clear separation.
- Explain public entry points and internal application-to-data access during a security or reliability discussion.
- Create a starting architecture for an API-backed product, then add environment-specific scaling and recovery decisions.

## Components
- **Web client:** Browser application initiating authenticated HTTPS requests.
- **CloudFront:** Caches eligible content and routes application traffic to the origin.
- **Application load balancer:** Distributes incoming requests across healthy application targets.
- **ECS application:** Runs application logic in independently deployable containers.
- **RDS PostgreSQL:** Stores transactional records with an explicit backup and recovery policy.
- **Redis cache:** Caches disposable data; define expiry and database fallback behavior.

## Review the actual flow
- client → cdn: HTTPS
- cdn → lb: Origin request
- lb → app: Application traffic
- app → db: SQL
- app → cache: Cache reads and writes

## Before implementation
Adapt security boundaries, retries, recovery, capacity and costs to your workload. Read the design notes on the linked template page. The diagram does not provision infrastructure.

## Source
`architecture.arch` is the editable diagram source. Service names refer to their respective providers; third-party icon rights remain separate. [Icon notices](https://drawarc.io/third-party-notices).

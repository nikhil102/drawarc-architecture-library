# Kubernetes EKS Microservices Cluster

Outline the traffic path into a Kubernetes cluster running on Amazon EKS. Separate ingress, service discovery, application workloads and external data dependencies, then customize the diagram to match your namespaces and deployment topology.

[Open the editable template](https://drawarc.io/templates/kubernetes-eks-microservices-cluster?utm_source=github&utm_medium=referral&utm_campaign=templates)

## When to use
- Review the request path and external dependencies for microservices deployed to Amazon EKS.
- Explain the difference between ingress, service routing, deployments and managed control-plane responsibilities.
- Plan additions such as workload identity, namespace isolation, observability or independent application scaling.

## Components
- **Client:** Initiates requests to the application endpoint.
- **Ingress load balancer:** Terminates or forwards external traffic according to the configured ingress policy.
- **Kubernetes service:** Provides a stable discovery and routing boundary for application pods.
- **Application deployment:** Manages application replicas, health checks and rollout behavior.
- **Worker deployment:** Runs independently scalable background processing workloads.
- **RDS PostgreSQL:** Persists application state outside the pod lifecycle.
- **Telemetry collector:** Receives application metrics, traces and operational signals.

## Review the actual flow
- user → ingress: HTTPS
- ingress → svc: Route ingress
- svc → app: Ready endpoints
- app → worker: Internal work request
- app → db: SQL
- worker → db: SQL
- app → metrics: Metrics and traces
- worker → metrics: Metrics and traces

## Before implementation
Adapt security boundaries, retries, recovery, capacity and costs to your workload. Read the design notes on the linked template page. The diagram does not provision infrastructure.

## Source
`architecture.arch` is the editable diagram source. Service names refer to their respective providers; third-party icon rights remain separate. [Icon notices](https://drawarc.io/third-party-notices).

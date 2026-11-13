"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.variantCount = exports.categories = exports.concerns = exports.deployments = exports.patterns = void 0;
exports.getPattern = getPattern;
exports.coreGraph = coreGraph;
exports.getVariant = getVariant;
exports.projectForVariant = projectForVariant;
const patterns_json_1 = __importDefault(require("./patterns.json"));
exports.patterns = patterns_json_1.default;
exports.deployments = [
    { id: "aws", name: "AWS environment", nodes: ["AWS ingress boundary", "Private application network", "Application runtime"], note: "Choose concrete AWS services, availability zones and private endpoints before deployment." },
    { id: "azure", name: "Azure environment", nodes: ["Azure entry boundary", "Application subnet", "Azure application runtime"], note: "Choose Azure services and identity assignments; validate network and data residency requirements." },
    { id: "google-cloud", name: "Google Cloud environment", nodes: ["Google Cloud entry boundary", "Private service network", "Application compute"], note: "Select Google Cloud runtime services and validate service-to-service permissions." },
    { id: "kubernetes", name: "Kubernetes", nodes: ["Ingress controller", "Service", "Application deployment"], note: "Define namespaces, resource requests, network policies and persistent storage separately." },
    { id: "docker-compose", name: "Docker Compose", nodes: ["Reverse proxy", "Container network", "Application containers"], note: "Compose does not itself supply multi-host failover. Define persistent volumes and host recovery." },
    { id: "virtual-machines", name: "Virtual machines", nodes: ["Load balancer", "Private subnet", "Application virtual machines"], note: "Plan machine patching, service supervision, image management and replacement procedures." },
    { id: "serverless", name: "Serverless application", nodes: ["Request or event gateway", "Function dispatcher", "Application functions"], note: "Validate execution time, state, concurrency and event semantics. Long-running tasks may need a different runtime." },
    { id: "hybrid", name: "Hybrid environment", nodes: ["Cloud entry boundary", "Private connectivity", "Datacenter application runtime"], note: "Define link failure handling, latency and identity boundaries across cloud and datacenter." },
    { id: "private-cloud", name: "Private cloud", nodes: ["Internal entry boundary", "Private network", "Internal application platform"], note: "Define platform ownership, capacity planning, patching and off-platform recovery." },
    { id: "multi-region", name: "Multi-region environment", nodes: ["Global request router", "Regional routing policy", "Primary regional runtime", "Secondary regional runtime"], note: "Choose failover ownership, state replication and consistency rules. This reference does not guarantee zero downtime." },
];
exports.concerns = [
    { id: "availability", name: "Availability", nodes: ["Health checks", "Traffic policy", "Secondary application instance"], edges: [[0, 1], [1, 2]], note: "Define health signals, promotion conditions and what happens when dependencies fail." },
    { id: "async-processing", name: "Asynchronous processing", nodes: ["Work queue", "Background worker", "Result store", "Dead letter queue"], edges: [[0, 1], [1, 2], [1, 3]], note: "Make workers idempotent; specify retry limits, poison-message handling and queue backpressure." },
    { id: "read-scaling", name: "Read scaling", nodes: ["Read cache", "Read model", "Projection updates"], edges: [[0, 1], [2, 1]], note: "Choose cache invalidation rules and communicate the allowed staleness of derived reads." },
    { id: "resilience", name: "Dependency resilience", nodes: ["Timeout and circuit breaker policy", "External dependency", "Fallback result"], edges: [[0, 1], [0, 2]], note: "Set timeouts and retry budgets together. A fallback must not hide an incomplete critical transaction." },
    { id: "observability", name: "Observability", nodes: ["Telemetry collector", "Metrics store", "Log store", "Trace store", "Alert evaluation"], edges: [[0, 1], [0, 2], [0, 3], [1, 4]], note: "Define useful signals and alert ownership; redact sensitive information before telemetry export." },
    { id: "audit", name: "Auditability", nodes: ["Audit event intake", "Append-only event log", "Retention archive", "Review interface"], edges: [[0, 1], [1, 2], [2, 3]], note: "Specify event provenance, access control, integrity checks and the applicable retention policy." },
    { id: "identity", name: "Identity and access", nodes: ["Identity provider", "Authorization policy", "Access decision log"], edges: [[0, 1], [1, 2]], note: "Authentication is not authorization. Bind each data operation to an explicit account and permission check." },
    { id: "disaster-recovery", name: "Disaster recovery", nodes: ["Backup coordinator", "Backup archive", "Isolated restore environment", "Restore verification"], edges: [[0, 1], [1, 2], [2, 3]], note: "Define recovery objectives and test a restore. A backup arrow alone is not evidence of recoverability." },
    { id: "multi-tenant", name: "Multi-tenant isolation", nodes: ["Tenant context resolver", "Tenant quota policy", "Tenant-scoped data access", "Isolation audit"], edges: [[0, 1], [1, 2], [2, 3]], note: "Verify tenant isolation at every data boundary. Do not rely on a browser-supplied tenant identifier alone." },
    { id: "events", name: "Event-driven integration", nodes: ["Transactional outbox", "Event broker", "Downstream consumer", "Consumer dead letter queue"], edges: [[0, 1], [1, 2], [2, 3]], note: "Define event versions, deduplication and transaction boundaries. Consumers need a deliberate replay strategy." },
];
exports.categories = [...new Set(exports.patterns.map(p => p.category))];
exports.variantCount = exports.patterns.length * exports.deployments.length * exports.concerns.length;
function getPattern(slug) { return exports.patterns.find(p => p.slug === slug); }
function coreGraph(pattern) {
    const labels = [...new Set(pattern.flows.flat())];
    const edges = pattern.flows.flatMap(flow => flow.slice(1).map((name, i) => [labels.indexOf(flow[i]), labels.indexOf(name)]));
    return { labels, edges };
}
function getVariant(patternId, deploymentId, concernId) {
    const pattern = getPattern(patternId), deployment = exports.deployments.find(d => d.id === deploymentId), concern = exports.concerns.find(c => c.id === concernId);
    if (!pattern || !deployment || !concern)
        return null;
    const { labels, edges } = coreGraph(pattern);
    const label = (s) => s.replace(/"/g, "'");
    const code = ["flowchart LR", `  subgraph core["${label(pattern.title)}"]`, ...labels.map((n, i) => `    n${i}["${label(n)}"]`), ...edges.map(([a, b]) => `    n${a} --> n${b}`), "  end",
        `  subgraph deployment["${label(deployment.name)}"]`, ...deployment.nodes.map((n, i) => `    d${i}["${label(n)}"]`), ...deployment.nodes.slice(1).map((_, i) => `    d${i} --> d${i + 1}`), "  end", `  d2 -. "runtime context" .-> n${Math.min(1, labels.length - 1)}`,
        `  subgraph concern["${label(concern.name)}"]`, ...concern.nodes.map((n, i) => `    c${i}["${label(n)}"]`), ...concern.edges.map(([a, b]) => `    c${a} --> c${b}`), "  end", `  n${Math.min(1, labels.length - 1)} -. "design concern" .-> c0`].join("\n");
    const title = `${pattern.title} — ${deployment.name} / ${concern.name}`;
    return { pattern, deployment, concern, title, code, slug: `${pattern.slug}/${deployment.id}/${concern.id}`, license: "MIT", provenance: "Original Drawarc reference variant; generated composition, not a verified production deployment." };
}
function projectForVariant(v) { return { format: "drawarc", version: 1, title: v.title.slice(0, 120), diagrams: [{ id: "example-" + v.pattern.slug, title: v.pattern.title, code: v.code, messages: [], updatedAt: 0 }] }; }

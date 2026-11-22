# CAHEZ AI Workforce & Automation — Product Requirements Document

**Version:** 1.0 planning baseline  
**Product family:** CAHEZ AI Workforce + CAHEZ Automation Solutions  
**Initial customer:** Kenyan small and medium businesses; first pilot segment appointment-based service businesses.  
**Product status:** Not yet implemented. Requirements below define intended behaviour, not existing capabilities.

## 1. Product vision

Give businesses reliable AI-powered digital employees and automation workflows that handle repetitive work, respond quickly to customers, capture opportunities and coordinate business operations—while keeping owners in control.

The product family shares one tenant-aware platform:
- **CAHEZ AI Workforce:** configurable AI agents that communicate, reason over approved business knowledge and request authorized actions.
- **CAHEZ Automation Solutions:** deterministic workflows, integrations, triggers, approvals and operational reporting.
- Both use the same identity, organization, permissions, knowledge, audit, billing and integration foundation.

## 2. Customer problem

Businesses lose time and opportunities when:
- Customer inquiries arrive outside working hours.
- Staff repeatedly answer the same questions.
- Leads are forgotten or not followed up.
- Appointments are booked manually and inconsistently.
- Information is spread across chats, spreadsheets and separate tools.
- Owners cannot see which tasks were completed or why an action occurred.

## 3. Target users and roles

- Owner: full organization control, billing, integrations, policies and analytics.
- Manager: manage agents, workflows, staff and operational settings within assigned permissions.
- Staff: view assigned conversations/tasks and take human handovers.
- Analyst: read-only reporting.
- Platform operator: tightly controlled support access with explicit audit trail; no routine access to customer content.

## 4. Product principles and guardrails

1. Accuracy over confident guessing.
2. Never invent prices, policies, availability, stock or completed actions.
3. Ground answers in approved and current organization knowledge.
4. Distinguish a proposed action from a successfully completed action.
5. Ask for confirmation before creating, changing or cancelling consequential bookings or other business records.
6. Provide human handover when confidence is low, a customer requests a person, a policy is missing, or a tool fails.
7. Tenant isolation is mandatory at database and API layers.
8. Tool permissions are explicit, scoped and revocable.
9. Every consequential action is auditable.
10. No autonomous payments, refunds, financial transfers or irreversible actions in the initial release.

## 5. Product scope

### Release 1 — shared platform
- Authentication and organization onboarding.
- Multi-tenant data model and role-based access.
- Agent configuration and status.
- Business profile and approved knowledge base.
- Web chat widget and owner inbox.
- Conversation history and human handover.
- Lead capture.
- Booking request flow with availability check integration stub or approved calendar connector.
- Automation workflow builder using a controlled set of triggers/actions.
- Approval queue for sensitive or uncertain actions.
- Usage metrics, audit log and basic plan limits.

### Release 1.1
- WhatsApp Business Platform integration, subject to Meta policy, approved provider setup and customer authorization.
- Calendar integrations.
- Follow-up scheduling with consent and opt-out.
- More robust workflow templates.

### Not in initial release
- Fully autonomous outbound campaigns.
- Unsupervised financial transactions.
- General-purpose browser agent with unrestricted access.
- Voice calling.
- Native mobile apps.
- Complex ERP integrations before customer validation.
- Promises of guaranteed sales or revenue uplift.

## 6. Core user journeys

### A. Business onboarding
1. Owner creates account and verifies email.
2. Creates organization and selects business type/timezone/currency.
3. Adds business name, hours, contact details and service catalogue.
4. Uploads or enters approved FAQs, pricing and policies.
5. System extracts draft knowledge; owner reviews and approves it.
6. Owner configures AI agent name, tone, allowed channels and permitted tools.
7. Owner tests sample conversations in preview mode.
8. Agent remains in draft until owner explicitly activates it.

### B. Customer inquiry and lead capture
1. Customer opens web chat.
2. Agent identifies itself as an AI assistant.
3. Agent answers using approved knowledge.
4. If details are missing, agent asks clarifying questions or offers human handover.
5. With appropriate notice/consent, lead details are captured.
6. Owner/staff can view and assign the lead.
7. Conversation and any action are recorded.

### C. Appointment request
1. Customer asks for a booking.
2. Agent collects service, preferred date/time and contact details.
3. Availability tool returns current options.
4. Agent presents available slots and asks customer to choose.
5. Agent repeats the selected details and requests confirmation.
6. Booking tool creates the booking.
7. Agent confirms only after tool success and stores booking reference.
8. On failure, agent says it could not complete the booking and routes to staff.

### D. Automation workflow
1. Owner chooses a trigger (new lead, booking created, status changed, scheduled time).
2. Owner adds allowed actions (notify staff, assign lead, create task, send approved message).
3. Owner configures conditions and approval requirements.
4. System validates workflow and runs test mode.
5. Owner activates workflow.
6. Each run has status, inputs, outputs, retries and audit record.
7. Failed runs enter a retry/dead-letter queue and alert authorized staff.

### E. Human handover
- Customer can request a person at any time.
- Agent escalates when policy/knowledge is insufficient, action fails, sentiment/risk thresholds are triggered, or the business config says escalation is required.
- Staff receives transcript, reason, customer details permitted for the case and pending action context.
- Agent pauses or clearly indicates whether it remains active while staff handles the case.

## 7. Functional requirements

### Identity and organization
- Email authentication and secure session handling.
- Organization membership with owner, manager, staff and analyst roles.
- Invite/revoke members.
- Every data query scoped to organization.
- Owner can export/delete organization data subject to legal retention requirements.

### Agent management
- Create, edit, test, activate, pause and archive agents.
- Version agent instructions and knowledge sources.
- Configure channel, business hours, escalation, tone and allowed tools.
- Preview changes before publishing.
- Roll back to a previous configuration.

### Knowledge
- Supported initial formats: manually entered FAQs, plain text and PDF/docx only after safe parsing is implemented.
- Knowledge status: draft, approved, expired, archived.
- Source, owner, last-reviewed date and version tracked.
- Retrieval must cite or internally reference approved source snippets.
- Conflicting or missing information triggers clarification/handover.
- Prompt injection in uploaded documents or customer messages must not override system policy or tool permissions.

### Conversation inbox
- List, filter, search and assign conversations.
- Status: open, waiting, handed-over, resolved.
- Human notes separated from customer-visible messages.
- Export restricted by role and logged.
- Retention and deletion controls.

### Leads and bookings
- Lead fields configurable and minimized.
- Booking status: requested, pending confirmation, confirmed, cancelled, completed, failed.
- Booking writes require tool success and idempotency key.
- Changes/cancellations require customer confirmation and permission checks.
- Calendar connector outage must never produce a false booking confirmation.

### Automation
- Trigger/action catalogue with schemas and permission scopes.
- Dry-run/test mode.
- Approval gates and maximum execution limits.
- Retry with backoff for transient failures.
- Idempotency for duplicate events.
- Run history and error details visible to authorized users.

### Analytics
- Conversations, response time, handover rate, leads captured, bookings requested/confirmed, workflow success/failure and usage.
- Define metric calculations and timezones.
- Avoid presenting AI-attributed revenue as fact without verified attribution.

### Billing and usage
- Track model tokens/requests, messages, workflow executions and storage.
- Configurable plan limits and alerts.
- No unexpected overage charges; pause or request upgrade according to explicit plan policy.
- Subscription and payment provider integration later after legal/business setup.

## 8. Non-functional requirements

- Security: OWASP-aligned secure development, secrets manager, TLS, encryption at rest where supported, RBAC, RLS, rate limits, secure headers and dependency scanning.
- Reliability: retries, idempotency, queue monitoring, backups and restore tests.
- Performance: chat response streaming where appropriate; initial API p95 target under 1.5 seconds excluding model/tool latency.
- Availability: define and measure before publishing an SLA; no uptime guarantee in pilot.
- Accessibility: WCAG 2.2 AA target for dashboard and widget.
- Observability: structured logs, traces, error tracking, usage and audit events.
- Portability: model-provider adapter; avoid provider lock-in.
- Data protection: data minimization, purpose limitation, retention/deletion, data-subject request handling, processor/subprocessor register and cross-border transfer review.

## 9. Architecture

- Web apps: Next.js + TypeScript.
- API: Node.js/TypeScript application API for auth, organizations, dashboard and integrations.
- Agent engine: Python service for orchestration, retrieval, policy evaluation and tool routing.
- Database: Supabase Postgres with strict RLS and migrations.
- Storage: private object storage buckets with signed access.
- Background work: durable queue/worker service; retry and dead-letter handling.
- Deployment: Vercel for web; Render or another persistent service host for API/agent workers.
- AI provider: model adapter with explicit data-processing settings and fallback policy.
- Observability: centralized error reporting, metrics and structured logs.

### Core modules
1. Agent Core — planning/orchestration under bounded policy.
2. Memory & Knowledge Core — tenant-scoped approved context and retrieval.
3. Action Core — typed tools, authorization, idempotency and result verification.
4. Intelligence Core — evaluation, analytics and feedback.
5. Control Core — identity, permissions, approvals, safety and audit.

### Initial data entities
organizations, profiles, memberships, agents, agent_versions, knowledge_sources, knowledge_chunks, conversations, messages, leads, bookings, workflows, workflow_versions, workflow_runs, integrations, tool_permissions, tool_executions, approvals, usage_records, subscriptions, audit_logs.

Every tenant-owned table must include organization_id and appropriate RLS policies. Service-role access must be limited to server-side services and must never reach the browser.

## 10. AI behaviour and evaluation

- System policy and tool permissions are enforced outside model-generated text.
- Use structured tool schemas and validate every argument server-side.
- Retrieve only approved, relevant tenant knowledge.
- Redact secrets and unnecessary personal data before model calls.
- Model output cannot directly update the database; actions pass through Action Core.
- Tool result is the source of truth for booking/action completion.
- Maintain a test suite of known-answer, missing-knowledge, prompt-injection, conflicting-policy, tool-failure and handover cases.
- Track grounded-answer rate, unsupported-claim rate, correct handover rate, tool success rate, booking correctness, latency and cost per resolved conversation.
- Require human review before changing production prompts or policies.

## 11. Privacy and compliance

Before live customer use:
- Map controller/processor roles per customer contract.
- Determine ODPC registration requirement and applicable exemptions.
- Publish privacy notice and customer terms.
- Execute data-processing agreements where CAHEZ processes customer data on behalf of businesses.
- Define lawful basis, purpose, retention, deletion and data-subject request process.
- Obtain consent/opt-out for marketing and follow-ups where required.
- Review international AI/model hosting and cross-border transfers.
- Restrict access to production data; audit support access.
- Maintain incident response and breach notification process.
- Do not use customer conversations for model training by default.

## 12. Success metrics and pilot exit criteria

Pilot metrics:
- At least 90% of test questions answered with approved knowledge or correctly escalated.
- Zero fabricated confirmed bookings in acceptance tests.
- 100% of consequential tool actions logged with actor, tenant, permission and outcome.
- No cross-tenant data exposure in security tests.
- Human handover reliably available.
- Customer/owner feedback captured and reviewed.
- Cost per conversation measured before pricing is finalized.

These are internal acceptance targets, not public claims.

## 13. Open product decisions

- Initial pilot business segment and 3–5 pilot customers.
- First calendar/booking provider.
- First messaging provider for WhatsApp Business.
- Model provider and data residency/processing terms.
- Final plan limits and pricing after cost measurement.
- Support hours and escalation SLA.
- Retention periods and customer export/deletion policy.

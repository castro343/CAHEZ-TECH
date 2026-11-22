# CAHEZ TECHNOLOGIES — Implementation roadmap and task register

**Working repository:** https://github.com/castro343/CAHEZ-TECH  
**Planning branch:** docs/cahez-company-and-product-blueprint  
**Status:** Planning artifacts being established. No production app or database has been deployed by this document.

## Delivery strategy

Build the company website and shared product foundation together. Deliver a thin end-to-end pilot before expanding breadth. CAHEZ AI Workforce and CAHEZ Automation Solutions share identity, tenancy, knowledge, permissions, tools, audit, billing and integrations.

## Phase 0 — company and project foundations

- [ ] Confirm registered-office county, town and address.
- [ ] Run BRS company-name search and reserve CAHEZ TECHNOLOGIES LIMITED or approved alternative.
- [ ] Conduct KIPI trademark search and choose relevant classes.
- [ ] Confirm modest nominal share capital with Kenyan advocate/accountant.
- [ ] Prepare and file incorporation forms through eCitizen.
- [ ] Establish company statutory registers and tax/accounting calendar.
- [ ] Verify domain availability and register chosen domain.
- [ ] Confirm GitHub repository ownership/access and protect main branch.
- [ ] Add CODEOWNERS, issue templates, PR template and security policy.
- [ ] Configure CI for lint, typecheck, tests and build.
- [ ] Define environment separation: local, preview/staging, production.

## Phase 1 — corporate website

- [ ] Audit existing CAHEZ-TECH repository and preserve reusable work.
- [ ] Migrate/organize website into Next.js + TypeScript only after repository audit.
- [ ] Implement design tokens and responsive shell.
- [ ] Build Home, About, Divisions, AI Workforce, Automation, Research, Careers and Contact pages.
- [ ] Create accessible navigation/footer and reusable CTA components.
- [ ] Implement validated contact endpoint with rate limiting and spam controls.
- [ ] Add SEO metadata, sitemap, robots and social preview.
- [ ] Draft privacy/terms and obtain legal review before collecting leads.
- [ ] Run accessibility, mobile, performance and security checks.
- [ ] Connect Vercel to repository after framework/root directory are confirmed.
- [ ] Add verified custom domain after purchase and DNS configuration.

## Phase 2 — shared application foundation

- [ ] Decide whether to create a dedicated Supabase project and select organization/region after reviewing cost.
- [ ] Create database migrations for organizations, profiles, memberships and audit logs.
- [ ] Implement auth and verified email flow.
- [ ] Implement organization creation and invitation.
- [ ] Define roles and server-side permission checks.
- [ ] Enable RLS for every tenant-owned table and test isolation.
- [ ] Create private storage buckets and file validation.
- [ ] Add API request validation, rate limits and structured errors.
- [ ] Add secrets management, backups and restore test.
- [ ] Add monitoring, error tracking and audit event pipeline.

## Phase 3 — CAHEZ AI Workforce

- [ ] Agent CRUD, versions and draft/active/paused lifecycle.
- [ ] Business profile, services, hours, pricing and policies.
- [ ] Knowledge upload/entry, parsing, review and approval.
- [ ] Retrieval with source references and tenant isolation.
- [ ] Agent orchestration service and model adapter.
- [ ] Typed tool registry and policy engine.
- [ ] Web chat widget and conversation inbox.
- [ ] Lead capture and staff assignment.
- [ ] Booking availability adapter and confirmation workflow.
- [ ] Human handover and owner notifications.
- [ ] Usage metering and analytics.
- [ ] Evaluation suite for hallucination, prompt injection and tool failures.

## Phase 4 — CAHEZ Automation Solutions

- [ ] Trigger/action registry with typed schemas.
- [ ] Visual or guided workflow editor.
- [ ] Workflow versioning and validation.
- [ ] Dry-run/test mode.
- [ ] Approval gates for sensitive actions.
- [ ] Durable queue, retry/backoff and dead-letter handling.
- [ ] Idempotency and duplicate-event protection.
- [ ] Execution history and failure notifications.
- [ ] Starter templates: new lead routing, booking reminders, staff notification, follow-up task.
- [ ] Integration credentials stored encrypted and scoped.

## Phase 5 — pilot, privacy and launch readiness

- [ ] Select 3–5 pilot businesses and document workflows.
- [ ] Sign pilot terms and data-processing terms as applicable.
- [ ] Confirm controller/processor roles and ODPC registration/exemption.
- [ ] Threat model and penetration/security review.
- [ ] Verify backup restoration and incident response.
- [ ] Test data export/deletion and retention.
- [ ] Test cross-tenant isolation.
- [ ] Measure model, messaging and infrastructure costs.
- [ ] Finalize plan limits/pricing only after measured costs.
- [ ] Test onboarding and support processes.
- [ ] Launch only after critical acceptance criteria pass.

## Architecture boundaries

- Corporate website is public and separate from authenticated SaaS application.
- Dashboard never contains service-role keys or provider secrets.
- Model output is untrusted; all tool actions are validated by backend policy.
- Automation workflows execute only approved typed actions.
- Customer tenant data is isolated by organization_id, RLS and API authorization.
- External integrations are per-tenant and revocable.
- Existing CAHEZTRADING-AI project/database is separate and must not be reused for this product.

## Definition of done

A task is complete only when:
1. Code is committed to a named branch.
2. Tests/lint/typecheck/build pass.
3. Security and tenant-boundary implications are reviewed.
4. Documentation/configuration is updated.
5. Preview deployment is verified where applicable.
6. No secrets or personal data are committed.
7. Acceptance criteria are demonstrated—not merely described.

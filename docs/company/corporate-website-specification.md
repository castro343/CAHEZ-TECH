# CAHEZ TECHNOLOGIES — Corporate website specification

**Purpose:** Build the official digital headquarters for CAHEZ TECHNOLOGIES and a conversion-focused entry point for business customers, partners, talent and the public.

## 1. Brand foundation

- Brand: CAHEZ TECHNOLOGIES
- Expansion: Cutting-edge Advanced Hybrid Engineering Zone
- Slogan: **Engineering Intelligence. Advancing Humanity.**
- Positioning: A technology and advanced engineering company designing intelligent systems, automation and software that improve productivity and solve real operational problems.
- Tone: confident, clear, technically credible, ambitious, human and responsible.
- Avoid: unsupported claims, fake client logos, fabricated metrics, random emoji, excessive animation and vague “AI will change everything” copy.

### Visual system

| Token | Value | Use |
|---|---|---|
| Midnight navy | #0B1829 | Main backgrounds |
| Deep background | #07111E | Hero / footer |
| Surface | #122238 | Cards / panels |
| Electric cyan | #63D8FF | Primary accent / links |
| Metallic silver | #C5CCD5 | Secondary accents |
| Primary text | #F5F8FC | Headings / body |
| Secondary text | #A9B8C9 | Supporting copy |
| Border | #29425B | Dividers / outlines |

Typography: Space Grotesk headings, Inter body, JetBrains Mono technical labels. Maintain contrast, readable type sizes and keyboard focus states. Motion must respect prefers-reduced-motion.

## 2. Information architecture

1. Home
2. About
3. Divisions
   - CAHEZ AI Workforce
   - CAHEZ Automation Solutions
   - CAHEZ Digital (future/overview only)
   - CAHEZ Research (future/overview only)
4. Solutions / Industries
5. Research & Insights
6. Careers (can initially show “No current openings”)
7. Contact
8. Legal
   - Privacy Notice
   - Terms of Use
   - Cookie Notice, if applicable

Separate product application at a later stage: app.cahez... Domain not selected or verified. The corporate website must not pretend the application is live before deployment.

## 3. Page requirements

### Home
- Hero headline: “Engineering Intelligence. Advancing Humanity.”
- Supporting message: “We build intelligent AI systems, business automation and software that help people and organisations work smarter.”
- Primary CTA: “Explore our solutions”
- Secondary CTA: “Talk to our team”
- Company introduction.
- Two featured division cards: AI Workforce and Automation Solutions.
- Outcome-led use cases: faster response, fewer repetitive tasks, reliable workflows, better visibility.
- Responsible engineering / security principles.
- Research and future direction section.
- Contact CTA and complete footer.

### About
- Company story and meaning of CAHEZ.
- Vision, mission and values.
- Founder-led company positioning without publishing private founder details.
- Commitment to responsible AI, engineering quality and measurable outcomes.

### CAHEZ AI Workforce
- Explain AI agents as supervised digital workers for customer service, lead capture, bookings and internal workflows.
- Demonstrate capabilities using a clearly labelled illustrative demo.
- Explain human handover, permissions, audit trail and verified knowledge.
- CTA: request a pilot / book a discovery call.

### CAHEZ Automation Solutions
- Workflow discovery and process mapping.
- Integrations between business tools.
- Approval-driven automation.
- Reporting and operational visibility.
- Custom implementation and support.
- CTA: request an automation assessment.

### Solutions / Industries
- Initial focus: appointment-based service businesses and small/medium businesses.
- Do not claim integrations or industry deployments that have not been built and tested.
- Present future sectors as exploration, not existing capability.

### Research & Insights
- Publish engineering notes, responsible AI guidance, case studies only with customer permission, and product updates.
- No invented research papers, awards or performance results.

### Contact
- Business inquiry form with name, work email/phone, organisation, interest area and message.
- Consent/privacy explanation and spam protection.
- Form submissions must reach a controlled backend and have retention limits.
- Display only verified company contact details once established.

## 4. UX and interaction

- Mobile-first responsive layout; optimize for Android screens and low-bandwidth connections.
- Clear navigation, accessible menus, semantic HTML and keyboard support.
- Fast loading; compress images, lazy-load below-the-fold media and avoid heavy background video.
- Subtle motion only; no forced scroll effects.
- Reusable cards, buttons, forms, navigation and footer.
- SEO metadata, Open Graph cards, sitemap, robots.txt and structured organization metadata only after legal details are confirmed.
- Analytics only with privacy review and appropriate consent/configuration.
- No public admin routes or secrets in client-side code.

## 5. Technical implementation

Preferred stack:
- Next.js App Router + TypeScript.
- Tailwind CSS or a small token-based CSS system.
- Shared design tokens in CSS variables.
- Vercel deployment connected to GitHub.
- Contact API with server-side validation, rate limiting and spam controls.
- Optional Supabase storage only if a concrete requirement exists; do not create a database just for a static marketing site.
- Keep corporate site separate from the authenticated SaaS dashboard.

Suggested structure:
```
apps/corporate-website/
  app/
    page.tsx
    about/page.tsx
    divisions/page.tsx
    ai-workforce/page.tsx
    automation/page.tsx
    research/page.tsx
    careers/page.tsx
    contact/page.tsx
    privacy/page.tsx
    terms/page.tsx
    api/contact/route.ts
  components/
  styles/
  public/
  tests/
```

## 6. SEO and content

Primary phrases: AI automation company Kenya, AI workforce platform, business process automation, AI agents for businesses, software engineering and intelligent systems. Use naturally; do not keyword-stuff.
- One clear H1 per page.
- Unique titles and descriptions.
- Descriptive image alt text.
- Internal links between divisions and contact.
- Publish only factual company information.
- No claims of registration, certification, partnerships or client results until verified.

## 7. Acceptance criteria

- Responsive at 360px width and desktop breakpoints.
- All navigation and CTAs work.
- Contact form validates server-side and reports success/failure accurately.
- No secret keys in browser bundle.
- Lighthouse performance/accessibility/SEO reviewed.
- Keyboard navigation and focus states verified.
- Privacy and terms pages reviewed before collecting personal data.
- Production domain and DNS verified before launch.
- Build and deployment checks pass.

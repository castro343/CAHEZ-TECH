import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

const capabilities = [
  { number: "01", title: "AI Workforce", text: "Purpose-built AI agents that support customers, capture opportunities and help teams move work forward.", href: "/ai-workforce" },
  { number: "02", title: "Automation Solutions", text: "Connected workflows that reduce repetitive work, coordinate systems and keep people in control.", href: "/automation" },
  { number: "03", title: "Software & Systems", text: "Reliable digital products and intelligent systems designed around real operational needs.", href: "/divisions" },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="eyebrow"><i /> INDEPENDENT TECHNOLOGY & ENGINEERING COMPANY</span>
            <h1>Engineering intelligence.<br /><em>Advancing humanity.</em></h1>
            <p className="hero-lead">We engineer intelligent AI systems, business automation and software that help people and organisations work smarter, move faster and build what comes next.</p>
            <div className="hero-actions">
              <Link className="button" href="/divisions">Explore our solutions <span>↗</span></Link>
              <Link className="text-link" href="/about">Discover CAHEZ <span>→</span></Link>
            </div>
            <div className="hero-note"><span className="note-line" /> Built for meaningful progress, not technology for its own sake.</div>
          </div>
          <div className="hero-visual" aria-label="Abstract representation of connected intelligent systems">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
            <div className="core"><span className="core-symbol">C</span><span className="core-label">INTELLIGENCE<br />ENGINEERED</span></div>
            <span className="node node-a">AI SYSTEMS</span><span className="node node-b">AUTOMATION</span><span className="node node-c">ENGINEERING</span>
            <span className="visual-caption">SYSTEMS THAT CONNECT.<br />INTELLIGENCE THAT WORKS.</span>
          </div>
        </div>
        <div className="container hero-bottom"><span>01 / 03</span><span className="hero-bottom-line" /><span>TECHNOLOGY WITH INTENT</span></div>
      </section>

      <section className="section section-intro">
        <div className="container intro-layout">
          <div><span className="eyebrow">WHO WE ARE</span><h2>We turn complex challenges into <em>intelligent possibilities.</em></h2></div>
          <div className="intro-copy"><p>CAHEZ TECHNOLOGIES is building practical technology for a world that expects more from every system. Our work brings together artificial intelligence, automation and software engineering to solve problems that matter.</p><Link className="text-link" href="/about">More about our company <span>→</span></Link></div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionHeading eyebrow="WHAT WE BUILD" title="Intelligence translated into action." description="Two connected divisions. One engineering mindset. Solutions designed around measurable business outcomes." />
          <div className="capability-grid">
            {capabilities.map((item) => <Link className="capability-card" href={item.href} key={item.number}><span className="card-number">{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p><span className="card-link">Explore capability <b>↗</b></span></div></Link>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container approach-layout">
          <div><span className="eyebrow">HOW WE THINK</span><h2>Useful intelligence.<br /><em>Responsible by design.</em></h2></div>
          <div className="principles">
            <div><span>01</span><h3>Understand first</h3><p>We start with the people, process and problem—not a technology looking for a use.</p></div>
            <div><span>02</span><h3>Engineer with discipline</h3><p>We value secure foundations, thoughtful architecture and systems that can evolve.</p></div>
            <div><span>03</span><h3>Keep humans in control</h3><p>Automation should create capacity and clarity, with meaningful oversight where it matters.</p></div>
          </div>
        </div>
      </section>

      <section className="closing-cta"><div className="container closing-inner"><span className="eyebrow">LET&apos;S BUILD WHAT&apos;S NEXT</span><h2>Have a challenge worth solving?</h2><p>Tell us what your organisation is trying to achieve. Let&apos;s explore the right way to engineer it.</p><Link className="button button-light" href="/contact">Start a conversation <span>↗</span></Link></div></section>
    </>
  );
}

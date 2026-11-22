import type { Metadata } from "next";
export const metadata: Metadata = { title: "Research & Insights" };
export default function ResearchPage() {
 return <section className="page-hero page-hero-tall"><div className="container"><span className="eyebrow">RESEARCH & INSIGHTS</span><h1>Explore deeply.<br /><em>Engineer responsibly.</em></h1><p>Our research direction focuses on applied AI, intelligent systems, automation and the engineering practices that make emerging technology useful.</p><div className="notice-panel"><strong>Research programme in development</strong><p>We are establishing our research themes and publication process. Technical notes and validated findings will appear here as they are ready to share.</p></div></div></section>;
}

import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/divisions", label: "Divisions" },
  { href: "/research", label: "Research" },
  { href: "/careers", label: "Careers" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" href="/" aria-label="CAHEZ TECHNOLOGIES home">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span className="brand-copy">
            <strong>CAHEZ</strong>
            <small>TECHNOLOGIES</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </nav>
        <Link className="button button-small nav-cta" href="/contact">Talk to our team <span aria-hidden="true">↗</span></Link>
        <details className="mobile-nav">
          <summary aria-label="Open navigation menu"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            <Link href="/about">About</Link>
            <Link href="/divisions">Divisions</Link>
            <Link href="/research">Research</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

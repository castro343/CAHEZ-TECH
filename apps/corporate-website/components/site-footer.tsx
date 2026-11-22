import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden="true"><span /></span>
            <span className="brand-copy"><strong>CAHEZ</strong><small>TECHNOLOGIES</small></span>
          </Link>
          <p>Engineering Intelligence.<br />Advancing Humanity.</p>
        </div>
        <div className="footer-links">
          <div><strong>Explore</strong><Link href="/about">About us</Link><Link href="/divisions">Our divisions</Link><Link href="/research">Research</Link></div>
          <div><strong>Solutions</strong><Link href="/ai-workforce">AI Workforce</Link><Link href="/automation">Automation</Link><Link href="/contact">Contact</Link></div>
          <div><strong>Information</strong><Link href="/privacy">Privacy notice</Link><Link href="/terms">Terms of use</Link><Link href="/careers">Careers</Link></div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} CAHEZ TECHNOLOGIES. All rights reserved.</span>
        <span>Built with purpose. Engineered with care.</span>
      </div>
    </footer>
  );
}

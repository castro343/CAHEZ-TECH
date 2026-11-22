import Link from "next/link";

export default function HomePage() {
  return (
    <main className="shell">
      <header className="topbar">
        <Link className="brand" href="/"><span className="brand-mark">C</span><span>CAHEZ<small>AI WORKFORCE</small></span></Link>
        <Link className="top-link" href="/login">Sign in</Link>
      </header>
      <section className="auth-wrap">
        <div className="auth-story">
          <span className="eyebrow">ENGINEERING INTELLIGENCE</span>
          <h1>Your business deserves a <em style={{color:"var(--cyan)"}}>smarter workforce.</em></h1>
          <p>Deploy AI employees that help your team respond, organise and move work forward — while you stay in control.</p>
          <p className="muted">Start with your business workspace. Add your first AI front desk employee when you are ready.</p>
        </div>
        <div className="auth-card">
          <span className="eyebrow">CAHEZ AI WORKFORCE PLATFORM</span>
          <h2>Get started</h2>
          <p className="muted">Create a workspace for your business or sign in to continue.</p>
          <Link className="primary" style={{display:"block",textAlign:"center",textDecoration:"none"}} href="/signup">Create your account</Link>
          <p className="form-foot">Already registered? <Link href="/login">Sign in</Link></p>
        </div>
      </section>
    </main>
  );
}

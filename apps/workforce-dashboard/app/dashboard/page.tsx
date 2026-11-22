import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createWorkspace, signOut } from "@/app/actions";

type Membership = {
  org_id: string;
  role: "owner" | "admin" | "member";
  organizations: { name: string; slug: string } | { name: string; slug: string }[] | null;
};

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (!userId) redirect("/login");

  const [{ data: profile }, { data: memberships }, params] = await Promise.all([
    supabase.from("profiles").select("display_name").eq("id", userId).maybeSingle(),
    supabase.from("memberships").select("org_id, role, organizations(name, slug)").eq("user_id", userId),
    searchParams
  ]);

  const rows = (memberships ?? []) as Membership[];
  const displayName = profile?.display_name || String(claimsData?.claims?.email ?? "there").split("@")[0];
  const errorMessage = params.error === "workspace-name" ? "Workspace name must be between 2 and 120 characters." : params.error === "workspace-create" ? "We could not create that workspace. Check the name and try again." : "";

  return <main className="shell">
    <header className="topbar">
      <Link className="brand" href="/"><span className="brand-mark">C</span><span>CAHEZ<small>AI WORKFORCE</small></span></Link>
      <form action={signOut}><button className="signout">Sign out</button></form>
    </header>
    <div className="dashboard">
      <aside className="sidebar">
        <span className="side-label">WORKSPACE</span><Link className="side-link active" href="/dashboard">Overview</Link>
        <span className="side-label">YOUR AI WORKFORCE</span><span className="side-link">AI Employees · Coming next</span>
        <span className="side-link">Conversations · Coming next</span><span className="side-link">Knowledge · Coming next</span>
        <span className="side-label">MANAGEMENT</span><span className="side-link">Team · Coming next</span><span className="side-link">Settings · Coming next</span>
      </aside>
      <section className="main">
        <div className="welcome"><div><span className="eyebrow">YOUR OPERATIONS, INTELLIGENTLY CONNECTED</span><h1>Welcome, {displayName}</h1><p>Here is the starting point for your CAHEZ AI Workforce.</p></div></div>
        <div className="stat-grid">
          <article className="stat-card"><span>BUSINESS WORKSPACES</span><strong>{rows.length}</strong></article>
          <article className="stat-card"><span>AI EMPLOYEES</span><strong>0</strong></article>
          <article className="stat-card"><span>OPEN CONVERSATIONS</span><strong>0</strong></article>
        </div>
        <h2 className="section-title">Your workspaces</h2>
        {rows.length ? <div className="workspace-list">{rows.map((membership) => {
          const org = Array.isArray(membership.organizations) ? membership.organizations[0] : membership.organizations;
          return <article className="workspace-row" key={membership.org_id}><div><strong>{org?.name ?? "Business workspace"}</strong><small>{org?.slug ?? membership.org_id}</small></div><span className="pill">{membership.role.toUpperCase()}</span></article>;
        })}</div> : <div className="empty-card"><h3>No workspace yet</h3><p className="muted">Create your business workspace to begin setting up your first AI employee.</p></div>}
        <h2 className="section-title">Create a business workspace</h2>
        <div className="workspace-card"><p className="muted">Use your business or organisation name. You can invite teammates after the workspace is created.</p>
          <form action={createWorkspace} className="create-form"><input name="name" required minLength={2} maxLength={120} placeholder="e.g. Acme Services" aria-label="Business workspace name"/><button type="submit">Create workspace</button></form>
          {errorMessage && <p className="form-error" role="alert">{errorMessage}</p>}
        </div>
        <p className="notice">You are in control. AI employees, external integrations and actions that affect customers will be configured with explicit permissions and approval rules.</p>
      </section>
    </div>
  </main>;
}

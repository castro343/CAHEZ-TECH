import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAgent, signOut } from "@/app/actions";

type Membership = {
  org_id: string;
  role: "owner" | "admin" | "member";
  organizations: { name: string } | { name: string }[] | null;
};

type Agent = {
  id: string;
  org_id: string;
  name: string;
  agent_type: string;
  description: string | null;
  status: "draft" | "active" | "paused" | "archived";
  created_at: string;
};

const typeLabels: Record<string, string> = {
  front_desk: "Front Desk",
  sales: "Sales",
  support: "Customer Support",
  research: "Research",
  operations: "Operations",
  custom: "Custom"
};

export default async function AgentsPage({ searchParams }: { searchParams: Promise<{ error?: string; created?: string }> }) {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (!userId) redirect("/login");

  const [{ data: memberships }, params] = await Promise.all([
    supabase.from("memberships").select("org_id, role, organizations(name)").eq("user_id", userId),
    searchParams
  ]);

  const workspaces = (memberships ?? []) as Membership[];
  const orgIds = workspaces.map((item) => item.org_id);
  let agents: Agent[] = [];
  if (orgIds.length) {
    const { data } = await supabase.from("agents").select("id, org_id, name, agent_type, description, status, created_at").in("org_id", orgIds).order("created_at", { ascending: false });
    agents = (data ?? []) as Agent[];
  }

  const manageable = workspaces.filter((item) => item.role === "owner" || item.role === "admin");
  const errorMessage = params.error === "agent-input"
    ? "Enter a valid employee name and choose a workspace."
    : params.error === "agent-type"
      ? "Choose a supported AI employee type."
      : params.error === "agent-create"
        ? "The AI employee could not be created. Check that you have owner or admin access to the selected workspace."
        : "";

  return <main className="shell">
    <header className="topbar">
      <Link className="brand" href="/dashboard"><span className="brand-mark">C</span><span>CAHEZ<small>AI WORKFORCE</small></span></Link>
      <form action={signOut}><button className="signout">Sign out</button></form>
    </header>
    <div className="dashboard">
      <aside className="sidebar">
        <span className="side-label">WORKSPACE</span><Link className="side-link" href="/dashboard">Overview</Link>
        <span className="side-label">YOUR AI WORKFORCE</span><Link className="side-link active" href="/dashboard/agents">AI Employees</Link>
        <span className="side-link">Conversations · Coming next</span><span className="side-link">Knowledge · Coming next</span>
        <span className="side-label">MANAGEMENT</span><span className="side-link">Team · Coming next</span><span className="side-link">Settings · Coming next</span>
      </aside>
      <section className="main">
        <div className="welcome"><div><span className="eyebrow">CAHEZ AI WORKFORCE</span><h1>AI Employees</h1><p>Create and manage specialised AI employees for your business.</p></div><Link className="back-link" href="/dashboard">← Dashboard</Link></div>
        {params.created === "1" && <p className="form-success" role="status">AI employee created as a draft. Configure its knowledge and permissions before activation.</p>}
        {errorMessage && <p className="form-error" role="alert">{errorMessage}</p>}
        <div className="agent-layout">
          <section>
            <h2 className="section-title">Your AI employees <span className="count-pill">{agents.length}</span></h2>
            {agents.length ? <div className="agent-list">{agents.map((agent) => {
              const workspace = workspaces.find((item) => item.org_id === agent.org_id);
              const org = Array.isArray(workspace?.organizations) ? workspace?.organizations[0] : workspace?.organizations;
              return <article className="agent-card" key={agent.id}>
                <div className="agent-card-top"><div><span className="eyebrow">{typeLabels[agent.agent_type] ?? agent.agent_type}</span><h3>{agent.name}</h3></div><span className={`status-pill status-${agent.status}`}>{agent.status}</span></div>
                <p className="muted">{agent.description || "No description added yet."}</p>
                <div className="agent-meta"><span>{org?.name ?? "Workspace"}</span><span>Created {new Date(agent.created_at).toLocaleDateString()}</span></div>
              </article>;
            })}</div> : <div className="empty-card"><h3>No AI employees yet</h3><p className="muted">Your first employee can start as a Front Desk assistant that answers enquiries and captures booking requests.</p></div>}
          </section>
          <section className="workspace-card create-agent-card">
            <span className="eyebrow">NEW AI EMPLOYEE</span><h2>Create an employee</h2>
            <p className="muted">Every new employee starts in draft mode. It cannot contact customers or perform external actions until you configure and explicitly activate it.</p>
            {manageable.length ? <form action={createAgent} className="agent-form">
              <label>Workspace<select name="org_id" required defaultValue={manageable[0].org_id}>{manageable.map((item) => {
                const org = Array.isArray(item.organizations) ? item.organizations[0] : item.organizations;
                return <option key={item.org_id} value={item.org_id}>{org?.name ?? "Business workspace"}</option>;
              })}</select></label>
              <label>Employee name<input name="name" required minLength={2} maxLength={120} placeholder="e.g. CAHEZ Front Desk"/></label>
              <label>Specialisation<select name="agent_type" required defaultValue="front_desk">
                <option value="front_desk">Front Desk</option><option value="sales">Sales</option><option value="support">Customer Support</option><option value="research">Research</option><option value="operations">Operations</option><option value="custom">Custom</option>
              </select></label>
              <label>Description<textarea name="description" rows={3} maxLength={1000} placeholder="What should this AI employee help your business with?"/></label>
              <button className="create-agent-button" type="submit">Create draft employee</button>
            </form> : <p className="form-error">You need owner or admin access to a workspace to create AI employees.</p>}
          </section>
        </div>
        <p className="notice">Safety by design: creation does not activate an agent, connect external channels, or grant permission to send messages, book appointments, or modify customer records.</p>
      </section>
    </div>
  </main>;
}

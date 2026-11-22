"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createWorkspace(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (name.length < 2 || name.length > 120) redirect("/dashboard?error=workspace-name");

  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (!userId) redirect("/login");

  const base = name.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "workspace";
  const suffix = String(userId).replace(/-/g, "").slice(0, 8);
  const slug = `${base}-${suffix}`;
  const { error } = await supabase.rpc("create_organization", { p_name: name, p_slug: slug });
  if (error) redirect("/dashboard?error=workspace-create");
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function createAgent(formData: FormData) {
  const orgId = String(formData.get("org_id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const agentType = String(formData.get("agent_type") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!orgId || name.length < 2 || name.length > 120) redirect("/dashboard/agents?error=agent-input");
  const allowedTypes = ["front_desk", "sales", "support", "research", "operations", "custom"];
  if (!allowedTypes.includes(agentType)) redirect("/dashboard/agents?error=agent-type");

  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims?.sub) redirect("/login");

  const { error } = await supabase.rpc("create_agent", {
    p_org_id: orgId,
    p_name: name,
    p_agent_type: agentType,
    p_description: description || null
  });

  if (error) redirect("/dashboard/agents?error=agent-create");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/agents");
  redirect("/dashboard/agents?created=1");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

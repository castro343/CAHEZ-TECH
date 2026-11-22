"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function ResetPasswordForm() {
  const [password,setPassword]=useState("");
  const [confirm,setConfirm]=useState("");
  const [error,setError]=useState("");
  const [busy,setBusy]=useState(false);
  const router=useRouter();

  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault(); setError("");
    if(password.length<8){setError("Use at least 8 characters.");return;}
    if(password!==confirm){setError("The passwords do not match.");return;}
    setBusy(true);
    const {error: updateError}=await createClient().auth.updateUser({password});
    setBusy(false);
    if(updateError){setError(updateError.message);return;}
    router.replace("/dashboard");
    router.refresh();
  }

  return <form onSubmit={submit}>
    <h2>Choose a new password</h2><p className="muted">Create a strong password for your CAHEZ account.</p>
    <div className="field"><label htmlFor="new-password">New password</label><input id="new-password" type="password" autoComplete="new-password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)}/></div>
    <div className="field"><label htmlFor="confirm-password">Confirm password</label><input id="confirm-password" type="password" autoComplete="new-password" minLength={8} required value={confirm} onChange={e=>setConfirm(e.target.value)}/></div>
    {error&&<p className="form-error" role="alert">{error}</p>}
    <button className="primary" type="submit" disabled={busy}>{busy?"Updating…":"Update password"}</button>
  </form>;
}

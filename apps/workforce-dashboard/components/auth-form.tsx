"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup" | "recovery";

export function AuthForm({ mode }: { mode: Mode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError(""); setMessage("");
    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/callback`;
      if (mode === "signup") {
        const { data, error: authError } = await supabase.auth.signUp({
          email, password,
          options: { data: { full_name: name.trim() }, emailRedirectTo: redirectTo }
        });
        if (authError) throw authError;
        if (data.session) window.location.assign("/dashboard");
        else setMessage("Account created. Check your email for the verification link, then return here to sign in.");
      } else if (mode === "login") {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw authError;
        window.location.assign("/dashboard");
      } else {
        const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`
        });
        if (authError) throw authError;
        setMessage("If an account exists for that email, a password reset link will be sent.");
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const title = mode === "signup" ? "Create your account" : mode === "recovery" ? "Reset your password" : "Welcome back";
  const description = mode === "signup" ? "Set up your secure CAHEZ workspace access." : mode === "recovery" ? "We will send a secure reset link if the account exists." : "Sign in to manage your AI workforce.";

  return (
    <form onSubmit={submit}>
      <h2>{title}</h2><p className="muted">{description}</p>
      {mode === "signup" && <div className="field"><label htmlFor="name">Your name</label><input id="name" autoComplete="name" required minLength={2} value={name} onChange={e=>setName(e.target.value)} /></div>}
      <div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} /></div>
      {mode !== "recovery" && <div className="field"><label htmlFor="password">Password</label><input id="password" type="password" autoComplete={mode==="signup"?"new-password":"current-password"} required minLength={mode==="signup"?8:1} value={password} onChange={e=>setPassword(e.target.value)} /></div>}
      {error && <p className="form-error" role="alert">{error}</p>}
      {message && <p className="form-success" role="status">{message}</p>}
      <button className="primary" type="submit" disabled={busy}>{busy ? "Please wait…" : mode==="signup" ? "Create account" : mode==="recovery" ? "Send reset link" : "Sign in"}</button>
      <div className="form-foot">
        {mode === "signup" ? <>Already have an account? <Link href="/login">Sign in</Link></> : mode === "recovery" ? <Link href="/login">Back to sign in</Link> : <><Link href="/forgot-password">Forgot password?</Link><br/><span>New to CAHEZ? </span><Link href="/signup">Create an account</Link></>}
      </div>
    </form>
  );
}

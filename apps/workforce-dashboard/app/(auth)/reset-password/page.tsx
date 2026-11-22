import Link from "next/link";
import { ResetPasswordForm } from "@/components/reset-password-form";

export default function ResetPasswordPage(){return <main className="shell"><header className="topbar"><Link className="brand" href="/"><span className="brand-mark">C</span><span>CAHEZ<small>AI WORKFORCE</small></span></Link><Link className="top-link" href="/login">Sign in</Link></header><section className="auth-wrap"><div className="auth-story"><span className="eyebrow">SECURE ACCOUNT RECOVERY</span><h1>A fresh start, <em style={{color:"var(--cyan)"}}>securely.</em></h1><p>Set a new password after opening the secure recovery link sent to your email.</p></div><div className="auth-card"><ResetPasswordForm/></div></section></main>}

import { SignIn } from "@clerk/react";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

// To update login providers, app branding, or OAuth settings use the Auth
// pane in the workspace toolbar. More information can be found in the Replit docs.
export default function SignInPage() {
  return (
    <div className="kt-auth-page">
      <div className="grain-overlay" aria-hidden />
      <div className="kt-auth-inner">
        <div className="kt-auth-brand">
          <img src="/kt-logo.png" alt="KT Vault" className="kt-auth-logo" />
          <p className="kt-auth-tagline">Welcome back to the vault.</p>
        </div>
        <SignIn
          routing="path"
          path={`${basePath}/sign-in`}
          signUpUrl={`${basePath}/sign-up`}
          fallbackRedirectUrl={`${basePath}/lessons`}
        />
      </div>
    </div>
  );
}

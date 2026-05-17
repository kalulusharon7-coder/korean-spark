import { SignUp } from "@clerk/react";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

// To update login providers, app branding, or OAuth settings use the Auth
// pane in the workspace toolbar. More information can be found in the Replit docs.
export default function SignUpPage() {
  return (
    <div className="kt-auth-page">
      <div className="grain-overlay" aria-hidden />
      <div className="kt-auth-inner">
        <div className="kt-auth-brand">
          <img src="/kt-logo.png" alt="KT Vault" className="kt-auth-logo" />
          <p className="kt-auth-tagline">Create your vault. Start speaking Korean.</p>
        </div>
        <SignUp
          routing="path"
          path={`${basePath}/sign-up`}
          signInUrl={`${basePath}/sign-in`}
          fallbackRedirectUrl={`${basePath}/lessons`}
        />
      </div>
    </div>
  );
}

import { LoginForm } from "@/components/auth/login-form";
import { createMetadata } from "@/lib/utils/seo-metadata";

export const metadata = createMetadata({
  title: "Sign Up",
  description: "Create a new account with Google or email and password.",
});

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <LoginForm isSignup={true} />
    </div>
  );
}

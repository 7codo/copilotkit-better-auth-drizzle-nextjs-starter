import { createAuthClient } from "better-auth/react";

import { lastLoginMethodClient } from "better-auth/client/plugins";

export const { signIn, signUp, useSession } = createAuthClient({
  plugins: [lastLoginMethodClient()],
});

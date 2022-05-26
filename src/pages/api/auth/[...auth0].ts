import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
import { getConfig } from "src/app/shared/config";

export default handleAuth({
  async login(req, res) {
    const config = getConfig();

    try {
      await handleLogin(req, res, {
        authorizationParams: {
          audience: config.auth0.audience,
          // Add the `offline_access` scope to also get a Refresh Token
          scope: config.auth0.scope,
        },
      });
    } catch (error: any) {
      res.status(error.status || 400).end(error.message);
    }
  },
});

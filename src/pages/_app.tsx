import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;

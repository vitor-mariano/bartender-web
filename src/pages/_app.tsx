import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <CssBaseline />
      <Component {...pageProps} />
      <ToastContainer />
    </UserProvider>
  );
}

export default MyApp;

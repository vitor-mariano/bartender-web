import { Box, Container, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const FOOTER_HEIGHT = "4rem";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bartender</title>
      </Head>
      <Container maxWidth="sm">
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: `calc(100vh - ${FOOTER_HEIGHT})`,
            textAlign: "center",
          }}
        >
          <Box>
            <Image
              src="/images/bartender.png"
              alt="Logo"
              width={180}
              height={180}
              aria-hidden
            />
            <Typography variant="h2" component="h1" my={2}>
              Bartender
            </Typography>
            <Typography>
              It's a simple app to manage orders, created to test some web
              technologies.
            </Typography>
          </Box>
        </Box>
        <Box
          component="footer"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            height: FOOTER_HEIGHT,
          }}
        >
          <Typography>
            Developed by{" "}
            <Link href="https://github.com/vitor-mariano">Vítor Mariano</Link>
          </Typography>
          <Typography variant="body2">
            <Link href="https://www.flaticon.com/free-icons/bartender">
              Bartender icon created by Linector - Flaticon
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Home;

import { Box, Container, Typography } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { Children } from "react";
import { Order } from "src/app/order/models";
import OrderTable from "./components/OrderTable";

export interface Props {
  orders: Order[];
}

const AdminPage: NextPage<Props> = ({ orders }) => {
  return (
    <>
      <Head>
        <title>Bartender - Orders</title>
      </Head>
      <Container>
        <Box component="header">
          <Typography variant="h4" component="h1" my={2}>
            Orders
          </Typography>
        </Box>
        <Box component="main">
          {Children.toArray(
            orders.map((order) => <OrderTable order={order} />)
          )}
        </Box>
      </Container>
    </>
  );
};

export default AdminPage;

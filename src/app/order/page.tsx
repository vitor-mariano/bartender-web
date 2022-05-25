import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Children, useMemo } from "react";
import { formatPrice } from "src/app/shared/functions/formatters";
import { Props } from "./server";

const OrderPage: NextPage<Props> = ({ items }) => {
  const router = useRouter();
  const orderId = router.query.orderId as string;
  const total = useMemo(
    () =>
      items.reduce((total, { price, quantity }) => total + price * quantity, 0),
    [items]
  );

  return (
    <>
      <Head>
        <title>Bartender - Order #{orderId}</title>
      </Head>
      <Container>
        <Box>
          <Typography variant="h4" component="h2" my={2}>
            Order #{orderId}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Children.toArray(
                  items.map(({ description, price, quantity }) => (
                    <TableRow>
                      <TableCell>{description}</TableCell>
                      <TableCell>{quantity}</TableCell>
                      <TableCell>{formatPrice(price)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell>{formatPrice(total)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
};

export default OrderPage;

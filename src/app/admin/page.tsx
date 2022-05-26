import {
  Box,
  Checkbox,
  Container,
  IconButton,
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
import { LoadingButton } from "@mui/lab";
import TrashIcon from "@mui/icons-material/Delete";
import { NextPage } from "next";
import Head from "next/head";
import { Children, useCallback } from "react";
import { formatPrice } from "src/app/shared/functions/formatters";
import { OrderItem } from "src/app/order/models";
import { Props } from "./server";

const AdminPage: NextPage<Props> = ({ orders }) => {
  const getTotal = useCallback(
    (items: OrderItem[]) =>
      items.reduce((acc, { price, quantity }) => acc + price * quantity, 0),
    [orders]
  );

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
            orders.map(({ orderId, items }) => (
              <Box>
                <Typography variant="h5" component="h2" my={2}>
                  Order #{orderId}
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {Children.toArray(
                          ["Description", "Quantity", "Price", "Delivered"].map(
                            (header) => <TableCell>{header}</TableCell>
                          )
                        )}
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        {Children.toArray(
                          items.map(
                            ({ description, price, quantity, delivered }) => (
                              <>
                                <TableCell>{description}</TableCell>
                                <TableCell>{quantity}</TableCell>
                                <TableCell>{formatPrice(price)}</TableCell>
                                <TableCell>
                                  <Checkbox checked={delivered} />
                                </TableCell>
                                <TableCell align="right">
                                  <IconButton>
                                    <TrashIcon />
                                  </IconButton>
                                </TableCell>
                              </>
                            )
                          )
                        )}
                      </TableRow>
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={2} />
                        <TableCell>
                          Total: {formatPrice(getTotal(items))}
                        </TableCell>
                        <TableCell align="right" colSpan={2}>
                          <LoadingButton variant="contained" disabled>
                            Save
                          </LoadingButton>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Box>
            ))
          )}
        </Box>
      </Container>
    </>
  );
};

export default AdminPage;

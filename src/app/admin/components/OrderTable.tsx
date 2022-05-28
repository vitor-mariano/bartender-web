import { Children, FC, useState } from "react";
import * as Yup from "yup";
import { FieldArray, Form, Formik, getIn } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import evolve from "ramda/src/evolve";
import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import TrashIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { formatPrice } from "src/app/shared/functions/formatters";
import { Order, OrderItem } from "src/app/order/models";

interface Props {
  order: Order;
}

const schema = Yup.object({
  items: Yup.array(
    Yup.object({
      description: Yup.string().required(),
      price: Yup.number().required(),
      quantity: Yup.number().required(),
      delivered: Yup.boolean().required(),
    }).required()
  ).required(),
}).required();

type FormSchema = Yup.InferType<typeof schema>;
type FormRow = FormSchema["items"][number];
type FieldName = keyof FormRow;

const emptyFormRow = {
  description: "",
  price: "",
  quantity: "",
  delivered: false,
};

const OrderTable: FC<Props> = ({ order: { orderId, items } }) => {
  const [loading, setLoading] = useState(false);
  const getTotal = (items: OrderItem[]) =>
    items.reduce((acc, { price, quantity }) => acc + price * quantity, 0);

  return (
    <Box>
      <Typography variant="h5" component="h2" my={2}>
        Order #{orderId}
      </Typography>
      <Formik
        initialValues={{
          items: items.length > 0 ? items : [emptyFormRow],
        }}
        validationSchema={schema}
        onSubmit={async ({ items }) => {
          setLoading(true);

          try {
            const result = await axios.post("/api/orders/" + orderId, {
              items,
            });

            toast.success(`Order #${orderId} updated successfully.`);
            setLoading(false);
          } catch (error) {
            toast.error("Could not save order.");
            console.error(error);
            setLoading(false);
          }
        }}
      >
        {({ handleBlur, handleChange, errors, values, isValid }) => (
          <Form>
            <FieldArray name="items">
              {({ push, remove }) => (
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
                      {Children.toArray(
                        values.items.map((item, index) => {
                          const getName = (name: FieldName): string =>
                            `items[${index}].${name}`;

                          const getInputProps = (name: FieldName) => {
                            return {
                              name: getName(name),
                              value: item[name],
                              onBlur: handleBlur,
                              onChange: handleChange,
                            };
                          };

                          const getTextFieldProps = (
                            name: FieldName
                          ): TextFieldProps => ({
                            ...getInputProps(name),
                            fullWidth: true,
                            variant: "standard",
                            error: Boolean(getIn(errors, getName(name))),
                          });

                          return (
                            <TableRow>
                              <TableCell>
                                <TextField
                                  {...getTextFieldProps("description")}
                                  label="Description"
                                />
                              </TableCell>
                              <TableCell>
                                <TextField
                                  {...getTextFieldProps("quantity")}
                                  label="Quantity"
                                  type="number"
                                />
                              </TableCell>
                              <TableCell>
                                <TextField
                                  {...getTextFieldProps("price")}
                                  label="Price"
                                  type="number"
                                />
                              </TableCell>
                              <TableCell>
                                <Checkbox
                                  {...getInputProps("delivered")}
                                  checked={item.delivered}
                                />
                              </TableCell>
                              <TableCell align="right">
                                <IconButton onClick={() => remove(index)}>
                                  <TrashIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <IconButton onClick={() => push(emptyFormRow)}>
                            <AddIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          Total:{" "}
                          {formatPrice(
                            getTotal(
                              values.items.map((item) =>
                                evolve(
                                  {
                                    price: (price) => Number(price),
                                    quantity: (quantity) => Number(quantity),
                                  },
                                  item
                                )
                              )
                            )
                          )}
                        </TableCell>
                        <TableCell align="right" colSpan={2}>
                          <LoadingButton
                            variant="contained"
                            type="submit"
                            disabled={!isValid}
                            loading={loading}
                          >
                            Save
                          </LoadingButton>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default OrderTable;

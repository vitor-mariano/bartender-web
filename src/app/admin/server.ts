import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { OrderItem } from "src/app/order/models";
import { getAxiosInstance } from "src/app/shared/providers/api";

interface Order {
  orderId: string;
  items: OrderItem[];
}

export interface Props {
  orders: Order[];
}

interface OrdersResponse {
  orders: Order[];
}

export default withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const { accessToken } = getSession(req, res)!;

    const api = getAxiosInstance(accessToken);

    try {
      const result = await api.get<OrdersResponse>("/orders");

      return {
        props: result.data,
      };
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  },
});

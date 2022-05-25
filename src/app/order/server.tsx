import { GetServerSideProps } from "next";
import { getAxiosInstance } from "src/app/shared/providers/api";
import { OrderItem } from "./models";

export interface Props {
  items: OrderItem[];
}

interface ApiResponse {
  order: {
    orderId: string;
    items: OrderItem[];
  };
}

const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const http = getAxiosInstance();
  const { orderId } = query;

  try {
    const result = await http.get<ApiResponse>("/orders/" + orderId);

    const { items } = result.data.order;

    return {
      props: { items },
    };
  } catch (error: any) {
    if (error.response?.status === 404)
      return {
        notFound: true,
      };

    throw error;
  }
};

export default getServerSideProps;

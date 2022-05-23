import { GetServerSideProps } from "next";
import { OrderItem } from "./models";

export interface Props {
  items: OrderItem[];
}

const getServerSideProps: GetServerSideProps<Props> = async () => {
  // FIXME: request from API.
  const items: OrderItem[] = [
    {
      id: "1",
      description: "Still water 500ml",
      price: 2.5,
      quantity: 1,
      delivered: false,
    },
  ];

  return {
    props: {
      items,
    },
  };
};

export default getServerSideProps;

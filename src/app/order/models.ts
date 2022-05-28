export interface OrderItem {
  description: string;
  price: number;
  quantity: number;
  delivered: boolean;
}

export interface Order {
  orderId: string;
  items: OrderItem[];
}

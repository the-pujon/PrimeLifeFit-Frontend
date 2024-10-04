export interface OrderProduct {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  totalAmount: number;
  paymentMethod: "COD" | "Stripe";
  status: "Pending" | "Completed" | "Cancelled";
  city: string;
  address: string;
  phone: string;
  email: string;
  products: OrderProduct[];
}

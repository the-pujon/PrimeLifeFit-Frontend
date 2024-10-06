import { Product } from "./Product";

export interface OrderProduct {
  product: Product;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  totalAmount: number;
  paymentMethod: "COD" | "Stripe";
  status: "Pending" | "Completed" | "Cancelled";
  city: string;
  address: string;
  phone: string;
  email: string;
  products: OrderProduct[];
  createdAt: string;
  updatedAt: string;
}

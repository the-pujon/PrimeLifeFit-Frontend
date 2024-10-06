import { Product } from "./Product";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

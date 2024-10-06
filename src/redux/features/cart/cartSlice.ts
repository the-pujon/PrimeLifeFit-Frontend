import { RootState } from "@/redux/store";
import { Product } from "@/types/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: (Product & { quantity: number })[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        if (existingItem.quantity < action.payload.stock) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item._id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, updateItemQuantity, removeItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const CurrentCart = (state: RootState) => state.cart.items;

export const selectProductStock = (
  state: RootState,
  productId: string | undefined,
  initialStock: number
) => {
  if (!productId) return 0;
  const cartItem = state.cart.items.find((item) => item._id === productId);
  if (cartItem) {
    return initialStock - cartItem.quantity;
  }
  return initialStock;
};

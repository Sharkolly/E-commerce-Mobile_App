import { storage } from "@/lib/asyncstorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductState = {
  products: any[];
  sliding_products: any[];
  addToCart: CartedProductType[];
  total: {
    totalPrice: number;
    totalItems: number;
    overallTotal: number;
    totalDelivery?: number;
  };
};

export type CartedProductType = {
  id: number | string;
  quantity: number;
  image: string;
  title: string;
  price: number;
  brand: string;
  category: string;
  new_price?: number;
  minimumOrderQuantity?: number;
};

const initialState: ProductState = {
  products: [],
  sliding_products: [],
  addToCart: [],
  total: { totalPrice: 0, totalItems: 0, overallTotal: 0, totalDelivery: 0 },
};

const counterSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartedProductType>) => {
      const {
        brand,
        category,
        id,
        price,
        image,
        quantity,
        title,
        new_price,
        minimumOrderQuantity,
      } = action.payload;

      const checkIfCartExists = state.addToCart.find((item) => item.id === id);
      if (checkIfCartExists) {
        checkIfCartExists.quantity = quantity;
        return;
      }

      state.addToCart.push({
        id,
        quantity,
        image,
        title,
        price,
        brand,
        category,
        new_price: price * quantity,
        minimumOrderQuantity,
      });
      let total: {
        totalPrice: number;
        totalItems: number;
        overallTotal: number;
        totalDelivery: number;
      } = {
        totalPrice: 0,
        totalItems: 0,
        overallTotal: 0,
        totalDelivery: 0,
      };
      state.addToCart.forEach((item) => {
        total.totalPrice += item.new_price || 0;
        total.totalItems += item.quantity;
        total.totalDelivery =
          total.totalItems < 18
            ? total.totalItems * 1210
            : total.totalItems * 830;

        total.overallTotal = total.totalPrice + total.totalDelivery;
      });

      state.total = total;

      storage.addToCart("carted_products", JSON.stringify(state.addToCart));
    },

    incrementQuantity: (
      state,
      action: PayloadAction<{ id: number | string }>
    ) => {
      const { id } = action.payload;
      const product = state.addToCart.find(
        (item) => String(item.id) === String(id)
      );
      if (product) {
        product.quantity += 1;
        product.new_price = product.price * product.quantity;
      }

      let total: {
        totalPrice: number;
        totalItems: number;
        overallTotal: number;
        totalDelivery: number;
      } = {
        totalPrice: 0,
        totalItems: 0,
        overallTotal: 0,
        totalDelivery: 0,
      };
      state.addToCart.forEach((item) => {
        total.totalPrice += item.new_price || 0;
        total.totalItems += item.quantity;
        total.totalDelivery =
          total.totalItems < 18
            ? total.totalItems * 1210
            : total.totalItems * 830;
        total.overallTotal = total.totalPrice + total.totalDelivery;
      });

      state.total = total;
    },
    decrementQuantity: (
      state,
      action: PayloadAction<{
        id: number | string;
        minimumOrderQuantity: number;
      }>
    ) => {
      const { id, minimumOrderQuantity } = action.payload;
      const product = state.addToCart.find((item) => item.id === id);
      if (product && product.quantity - 1 >= minimumOrderQuantity) {
        product.quantity -= 1;
        // if (product.quantity < 0) product.quantity = 0;
        product.new_price = product.price * product.quantity;
      }

      let total: {
        totalPrice: number;
        totalItems: number;
        overallTotal: number;
        totalDelivery: number;
      } = {
        totalPrice: 0,
        totalItems: 0,
        overallTotal: 0,
        totalDelivery: 0,
      };
      state.addToCart.forEach((item) => {
        total.totalPrice += item.new_price || 0;
        total.totalItems += item.quantity;
        total.totalDelivery =
          total.totalItems < 18
            ? total.totalItems * 1210
            : total.totalItems * 830;
        total.overallTotal = total.totalPrice + total.totalDelivery;
      });

      state.total = total;
    },
    updateProductQuantity: (
      state,
      action: PayloadAction<{ id: number | string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const product = state.addToCart.find(
        (item) => String(item.id) === String(id)
      );
      if (product) {
        product.quantity = quantity;
        product.new_price = product.price * product.quantity;
      }

      state.addToCart = state.addToCart.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: quantity,
            new_price: item.price * quantity,
          };
        }
        return item;
      });
    },
    setProducts: (state, action: PayloadAction<any[]>) => {
      state.products = action.payload;
    },
    setSliding_products: (state, action: PayloadAction<any[]>) => {
      state.sliding_products = action.payload;
    },
    clearProducts: (state) => {
      state.products = [];
    },
  },
});

export const {
  incrementQuantity,
  decrementQuantity,
  updateProductQuantity,
  addToCart,
  setProducts,
  setSliding_products,
} = counterSlice.actions;

export default counterSlice.reducer;

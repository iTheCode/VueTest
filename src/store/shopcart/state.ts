import { Product } from "../product/getters";

export const state = {
  productList: new Array<Product>(),
  loading: false,
};

export type State = typeof state;

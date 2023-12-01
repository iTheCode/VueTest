import { Product } from "./getters";

export const state = {
  productList: new Array<Product>(),
  categoryList: new Array<string>(),
  categorySelected: "",
  loading: false,
};

export type State = typeof state;

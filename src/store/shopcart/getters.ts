import { GetterTree } from "vuex";
import { Product } from "../product/getters";
import { State } from "./state";

export type Getters = {
  cartList(state: State): Array<Product>;
  loading(state: State): Boolean;
};

export const getters: GetterTree<State, State> & Getters = {
  cartList: (state) => {
    return state.productList;
  },
  loading: (state) => {
    return state.loading;
  },
};

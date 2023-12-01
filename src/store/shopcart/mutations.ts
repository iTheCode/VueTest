import { MutationTree } from "vuex";
import { Product } from "../product/getters";
import { State } from "./state";
import { MutationTypes } from "./types";

export type Mutations<S = State> = {
  [MutationTypes.ADD_PRODUCT](state: S, payload: Product): void;
  [MutationTypes.DEL_PRODUCT](state: S, payload: number): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.ADD_PRODUCT](state, payload: Product) {
    const productoEncontrado = state.productList.find(
      (product) => product.id === payload.id
    );
    if (productoEncontrado) {
      productoEncontrado.quantity++;
    } else {
      state.productList.push({ ...payload, quantity: 1 });
    }
  },
  [MutationTypes.DEL_PRODUCT](state, payload: number) {
    state.productList = state.productList.filter(
      (product) => product.id !== payload
    );
  },
  [MutationTypes.SET_LOADING](state, payload: boolean) {
    state.loading = payload;
    return state;
  },
};

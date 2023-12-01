import { MutationTree } from "vuex";
import { Product } from "./getters";
import { State } from "./state";
import { MutationTypes } from "./types";

export type Mutations<S = State> = {
  [MutationTypes.SET_PRODUCTS](state: S, payload: Product[]): void;
  [MutationTypes.SET_CATEGORIES](state: S, payload: Array<string>): void;
  [MutationTypes.SET_LOADING](state: S, payload: boolean): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_PRODUCTS](state, payload: Product[]) {
    state.productList = payload;
    return state;
  },
  [MutationTypes.SET_CATEGORIES](state, payload: Array<string>) {
    state.categoryList = payload;
    return state;
  },
  [MutationTypes.SET_LOADING](state, payload: boolean) {
    state.loading = payload;
    return state;
  },
};

import { ApiService } from "@/services/api.service";
import { ActionTree, Commit } from "vuex";
import { Product } from "./getters";
import { State } from "./state";
import { ActionTypes, MutationTypes } from "./types";

const api = new ApiService();

export interface Actions {
  [ActionTypes.GET_PRODUCTS]({
    commit,
  }: {
    commit: Commit;
  }): Promise<Array<Product>>;

  [ActionTypes.GET_CATEGORIES]({
    commit,
  }: {
    commit: Commit;
  }): Promise<Array<string>>;

  [ActionTypes.GET_PRODUCTS](
    {
      commit,
    }: {
      commit: Commit;
    },
    payload: number
  ): Promise<Array<Product>>;
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.GET_PRODUCTS]({ commit }) {
    return new Promise(async (resolve) => {
      commit(MutationTypes.SET_LOADING, true);
      const products = await api.get<Array<Product>>("/products");
      commit(MutationTypes.SET_PRODUCTS, products);
      commit(MutationTypes.SET_LOADING, false);
      resolve(products);
    });
  },
  [ActionTypes.GET_CATEGORIES]({ commit }) {
    return new Promise(async (resolve) => {
      commit(MutationTypes.SET_LOADING, true);
      const categories = await api.get<Array<string>>("/products/categories");
      commit(MutationTypes.SET_CATEGORIES, categories);
      commit(MutationTypes.SET_LOADING, false);
      resolve(categories);
    });
  },
  [ActionTypes.GET_PRODUCTS_BY_CATEGORY]({ commit }, payload) {
    return new Promise(async (resolve) => {
      commit(MutationTypes.SET_LOADING, true);
      const products = await api.get<Array<string>>(
        `/products/category/${payload}`
      );
      commit(MutationTypes.SET_PRODUCTS, products);
      commit(MutationTypes.SET_LOADING, false);
      resolve(products);
    });
  },
};

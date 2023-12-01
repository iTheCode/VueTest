import { ActionTree, Commit } from "vuex";
import { Product } from "../product/getters";
import { State } from "./state";
import { ActionTypes, MutationTypes } from "./types";

export interface Actions {
  [ActionTypes.ADD_PRODUCT](
    { commit }: { commit: Commit },
    payload: Product
  ): Promise<boolean>;
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.ADD_PRODUCT]({ commit }, data) {
    return new Promise((resolve) => {
      commit(MutationTypes.SET_LOADING, true);
      setTimeout(() => {
        commit(MutationTypes.ADD_PRODUCT, data);
        commit(MutationTypes.SET_LOADING, false);
        resolve(true);
      }, 100);
    });
  },
  [ActionTypes.DEL_PRODUCT]({ commit }, data) {
    commit(MutationTypes.SET_LOADING, true);
    return new Promise((resolve) => {
      setTimeout(() => {
        commit(MutationTypes.DEL_PRODUCT, data);
        commit(MutationTypes.SET_LOADING, false);
        resolve(true);
      }, 100);
    });
  },
};

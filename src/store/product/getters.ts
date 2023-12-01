import { GetterTree } from "vuex";
import { State } from "./state";

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  quantity: number;
}
export type Getters = {
  productList(state: State): Array<Product>;
  categoryList(state: State): Array<string>;
  loading(state: State): Boolean;
};

export const getters: GetterTree<State, State> & Getters = {
  productList: (state) => {
    return state.productList;
  },
  categoryList: (state) => {
    return state.categoryList.map((category) => ({
      name: category,
      code: category,
    })) as Array<any>;
  },
  loading: (state) => {
    return state.loading;
  },
};

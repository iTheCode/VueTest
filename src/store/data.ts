import { createLogger, createStore, Store } from "vuex";
import Modules from "./modules";

export const useDataStore = () => {
  return createStore({
    strict: false,
    plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
    modules: Modules,
  }) as Store<any>;
};

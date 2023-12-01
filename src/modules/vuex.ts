import { useDataStore } from "@/store";
import type { UserModule } from "@/types";

export const install: UserModule = ({
  isClient,
  initialState,
  app,
  router,
}) => {
  const store = useDataStore();
  app.use(store);
};

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { certificatesApi } from "./services/certificates";
import { endUsersApi } from "./services/endusers";

export const store = configureStore({
  reducer: {
    [endUsersApi.reducerPath]: endUsersApi.reducer,
    [certificatesApi.reducerPath]: certificatesApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(endUsersApi.middleware)
      .concat(certificatesApi.middleware),
});

setupListeners(store.dispatch);

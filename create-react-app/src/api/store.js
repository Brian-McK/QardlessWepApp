import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { certificatesApi } from "./services/certificates";
import { endUsersApi } from "./services/endusers";
import { coursesApi } from "./services/courses";

export const store = configureStore({
  reducer: {
    [endUsersApi.reducerPath]: endUsersApi.reducer,
    [certificatesApi.reducerPath]: certificatesApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(endUsersApi.middleware)
      .concat(certificatesApi.middleware)
      .concat(coursesApi.middleware),
});

setupListeners(store.dispatch);

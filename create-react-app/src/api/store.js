import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { certificatesApi } from "./services/certificates";
import { endUsersApi } from "./services/endusers";
import { coursesApi } from "./services/courses";
import { loginUsersApi } from "./services/login";

export const store = configureStore({
  reducer: {
    [endUsersApi.reducerPath]: endUsersApi.reducer,
    [certificatesApi.reducerPath]: certificatesApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [loginUsersApi.reducerPath]: loginUsersApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(endUsersApi.middleware)
      .concat(certificatesApi.middleware)
      .concat(coursesApi.middleware)
      .concat(loginUsersApi.middleware),
});

setupListeners(store.dispatch);

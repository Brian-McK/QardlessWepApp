import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { certificatesApi } from "./services/certificates";
import { employeesApi } from "./services/employees";
import { coursesApi } from "./services/courses";
import { loginUsersApi } from "./services/login";

export const store = configureStore({
  reducer: {
    [employeesApi.reducerPath]: employeesApi.reducer,
    [certificatesApi.reducerPath]: certificatesApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [loginUsersApi.reducerPath]: loginUsersApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(employeesApi.middleware)
      .concat(certificatesApi.middleware)
      .concat(coursesApi.middleware)
      .concat(loginUsersApi.middleware),
});

setupListeners(store.dispatch);

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const middleware = [apiSlice.middleware];

const persistConfig = {
  key: "redux",
  version: 1,
  storage,
  whitelist: ["login"],
  timeout: 0,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const setupStore = (preloadedState: any) =>
  configureStore({
    reducer: persistedReducer,
    preloadedState,
    devTools: true,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(middleware),
    // devTools: true ? true : process.env.NODE_ENV === 'development',
  });

const store = setupStore({});

const persistor = persistStore(store);
const storeValues = store.getState();
setupListeners(store.dispatch);

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor, storeValues, setupStore };

import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { teamTestReducer } from "./teamReducer";
import persistReducer from "redux-persist/es/persistReducer";

const teamPersistConfig = {
  key: "team",
  storage,
};

export const store = configureStore({
  reducer: {
    teamStore: persistReducer(teamPersistConfig, teamTestReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

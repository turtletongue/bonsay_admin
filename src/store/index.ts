import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import persistStorage from './persistStorage';
import coreReducer from './core/core.slice';
import productsReducer from './products/products.slice';
import categoriesReducer from './categories/categories.slice';
import signInReducer from './sign-in/sign-in.slice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: persistStorage,
  blacklist: ['signIn'],
};

const rootReducer = combineReducers({
  core: coreReducer,
  products: productsReducer,
  categories: categoriesReducer,
  signIn: signInReducer,
});

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

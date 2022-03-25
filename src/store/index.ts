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

import coreReducer from '@store/core/core.slice';
import productsReducer from '@store/products/products.slice';
import categoriesReducer from '@store/categories/categories.slice';
import adminsReducer from '@store/admins/admins.slice';
import ordersReducer from '@store/orders/orders.slice';
import signInReducer from '@store/sign-in/sign-in.slice';
import persistStorage from './persistStorage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: persistStorage,
  blacklist: ['signIn', 'products', 'categories', 'admins', 'orders'],
};

const rootReducer = combineReducers({
  core: coreReducer,
  products: productsReducer,
  categories: categoriesReducer,
  admins: adminsReducer,
  orders: ordersReducer,
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

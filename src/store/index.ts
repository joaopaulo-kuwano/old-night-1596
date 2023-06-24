import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { BalconySlice } from './balcony';

const combinedReducer = combineReducers({
  balcony: BalconySlice.reducer,
})

const persistedReducer = persistReducer({
  key: 'root',
  storage,
  whitelist: [],
}, combinedReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

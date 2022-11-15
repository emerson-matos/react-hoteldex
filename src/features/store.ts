import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cachedHotelsReducer } from "./cachedHotelsSlice";
import { hotelsReducer } from "./hotelsSlice";

export const rootReducer = combineReducers({
  cachedHotels: cachedHotelsReducer,
  hotels: hotelsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;

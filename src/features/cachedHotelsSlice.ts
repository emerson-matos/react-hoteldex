import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import fromApi from "../api/fromApi";
import { SliceStatus } from "../globals";
import { RootState } from "./store";
import { NamedAPIResource } from "./types";
import { statusHandlerReducer, wrapReduxAsyncHandler } from "./utilities";
import Levenshtein from "fast-levenshtein";
import { shuffle } from "../utils/shuffle";
import { camelcaseObject } from "../utils/camelcaseObject";
import { useState } from "react";

type SliceState = {
  cache: (NamedAPIResource & { distance: number })[];
  data: (NamedAPIResource & { distance: number })[];
  apikey: string;
  status: {
    state: SliceStatus;
  };
};

const initialState: SliceState = {
  cache: [],
  apikey: "",
  data: [],
  status: {
    state: SliceStatus.IDLE,
  },
};

const cachedHotelsSlice = createSlice({
  name: "cachedHotels",
  initialState,
  reducers: {
    ...statusHandlerReducer,
    getCachedHotelsReducer(
      state,
      action: PayloadAction<{
        cachedHotels: (NamedAPIResource & { distance: number })[];
      }>
    ) {
      const { cachedHotels } = action.payload;
      state.cache = cachedHotels;
      state.data = shuffle([...cachedHotels]);
    },
    searchHotelsByNameReducer(
      state,
      action: PayloadAction<{
        hotelName: string;
      }>
    ) {
      const { hotelName } = action.payload;

      state.data = state.cache
        .map((hotel) => {
          return {
            ...hotel,
            distance: Levenshtein.get(hotel.name, hotelName),
          };
        })
        .sort((a, b) => a.distance - b.distance);
    },
    apiKeyReducer(
      state,
      action: PayloadAction<{
        apikey: string;
      }>
    ){
      const { apikey } = action.payload;

      state.apikey = apikey
    },
    randomizeHotelsReducer(state, action) {
      state.data = shuffle([...state.cache]);
    },
  },
});

export const cachedHotelsReducer = cachedHotelsSlice.reducer;
export const {
  initialize,
  error,
  success,
  getCachedHotelsReducer,
  searchHotelsByNameReducer,
  apiKeyReducer,
  randomizeHotelsReducer,
} = cachedHotelsSlice.actions;

const statusHandler = { initialize, error, success };

export const cachedHotelsSelector = (state: RootState) =>
  state.cachedHotels;

export const getCachedHotels = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { apikey }) => {
    const results : NamedAPIResource[] = await fromApi.getHotels(apikey);
    const transformedHotels = results.map((res: NamedAPIResource) => ({
      ...res,
      distance: 0,
    }));
    console.log("passou aqui" , transformedHotels)
    dispatch(
      getCachedHotelsReducer({
        cachedHotels: camelcaseObject(transformedHotels),
      })
    );
  }
);

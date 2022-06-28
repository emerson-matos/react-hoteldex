import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import fromApi from "../api/fromApi";
import { SliceStatus } from "../globals";
import { RootState } from "./store";
import { NamedAPIResource } from "./types";
import { statusHandlerReducer, wrapReduxAsyncHandler } from "./utilities";
import Levenshtein from "fast-levenshtein";
import { shuffle } from "../utils/shuffle";
import { camelcaseObject } from "../utils/camelcaseObject";

export enum PokemonGenerationsEnum {
  GENERATION_1 = "151",
  GENERATION_2 = "251",
  GENERATION_3 = "386",
  GENERATION_4 = "494",
  GENERATION_5 = "649",
  GENERATION_6 = "721",
  GENERATION_7 = "809",
}

type SliceState = {
  cache: (NamedAPIResource & { distance: number })[];
  data: (NamedAPIResource & { distance: number })[];
  status: {
    state: SliceStatus;
  };
};

const initialState: SliceState = {
  cache: [],
  data: [],
  status: {
    state: SliceStatus.IDLE,
  },
};

const cachedPokemonsSlice = createSlice({
  name: "cachedPokemons",
  initialState,
  reducers: {
    ...statusHandlerReducer,
    getCachedPokemonsReducer(
      state,
      action: PayloadAction<{
        cachedPokemons: (NamedAPIResource & { distance: number })[];
      }>
    ) {
      const { cachedPokemons } = action.payload;
      state.cache = cachedPokemons;
      state.data = shuffle([...cachedPokemons]);
    },
    searchPokemonsByNameReducer(
      state,
      action: PayloadAction<{
        pokemonName: string;
      }>
    ) {
      const { pokemonName } = action.payload;

      state.data = state.cache
        .map((pokemon) => {
          return {
            ...pokemon,
            distance: Levenshtein.get(pokemon.name, pokemonName),
          };
        })
        .sort((a, b) => a.distance - b.distance);

      console.log(state.data);
    },
    randomizePokemonsReducer(state, action) {
      state.data = shuffle([...state.cache]);
    },
  },
});

export const cachedPokemonsReducer = cachedPokemonsSlice.reducer;
export const {
  initialize,
  error,
  success,
  getCachedPokemonsReducer,
  searchPokemonsByNameReducer,
  randomizePokemonsReducer,
} = cachedPokemonsSlice.actions;

const statusHandler = { initialize, error, success };

export const cachedPokemonsSelector = (state: RootState) =>
  state.cachedPokemons;

export const getCachedPokemons = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch) => {
    const results : NamedAPIResource[] = await fromApi.getPokemons();
    const transformedPokemons = results.map((res: NamedAPIResource) => ({
      ...res,
      distance: 0,
    }));
    console.log("passou aqui" , transformedPokemons)
    dispatch(
      getCachedPokemonsReducer({
        cachedPokemons: camelcaseObject(transformedPokemons),
      })
    );
  }
);

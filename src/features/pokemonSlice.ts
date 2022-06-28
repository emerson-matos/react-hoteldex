import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import fromApi from "../api/fromApi";
import { SliceStatus } from "../globals";
import { RootState } from "./store";
import { NamedAPIResource } from "./types";
import { camelcaseObject } from "../utils/camelcaseObject";
import {
  statusHandlerReducer,
  transformSpriteToBaseImage,
  wrapReduxAsyncHandler,
} from "./utilities";
import { baseImageUrl } from "../api/axios";

export const PAGINATE_SIZE = 6;

// export type Pokemon = {
//   id: number;
//   name: string;
//   baseExperience: number;
//   height: number;
//   isDefault: boolean;
//   order: number;
//   weight: number;
//   abilities: {
//     isHidden: boolean;
//     slot: number;
//     ability: NamedAPIResource;
//   }[];
//   forms: NamedAPIResource[];
//   moves: {
//     move: NamedAPIResource;
//   }[];
//   sprites: {
//     frontDefault: string;
//     frontShiny: string;
//     frontFemale: string;
//     frontShinyFemale: string;
//     backDefault: string;
//     backShiny: string;
//     backFemale: string;
//     backShinyFemale: string;
//   };
//   species: NamedAPIResource[];
//   stats: {
//     baseStat: number;
//     effort: number;
//     stat: NamedAPIResource;
//   }[];
//   types: {
//     slot: number;
//     type: NamedAPIResource;
//   }[];
// };

export type Hotel = {
  placeId: string;
  name: string;
  adrAddress: string;
  formattedAddress: string;
  icon: string;
};

type SliceState = {
  data: (Hotel | null)[];
  status: {
    state: SliceStatus;
  };
};

const initialState: SliceState = {
  data: [],
  status: {
    state: SliceStatus.IDLE,
  },
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    ...statusHandlerReducer,
    initializePokemonsReducer(state, action: PayloadAction<{ size: number }>) {
      const { size } = action.payload;
      const nullValues = new Array<null>(size).fill(null);
      if (state.data.length === 0) {
        state.data = nullValues;
      } else {
        state.data = state.data.concat(nullValues);
      }
    },
    getPokemonsReducer(
      state,
      action: PayloadAction<{ pokemon: Hotel; index: number; size: number }>
    ) {
      const { pokemon, size, index } = action.payload;

      const isPokemonAlreadyExists = state.data.find(
        (existingPokemon) =>
          existingPokemon !== null && existingPokemon.placeId === pokemon.placeId
      );
      if (!isPokemonAlreadyExists) {
        state.data[state.data.length - (size - index)] = pokemon;
      }
    },
    // getSinglePokemonReducer(
    //   state,
    //   action: PayloadAction<{ pokemon: Pokemon }>
    // ) {
    //   const { pokemon } = action.payload;
    //   const isPokemonAlreadyExists = state.data.find(
    //     (existingPokemon) =>
    //       existingPokemon !== null && existingPokemon.id === pokemon.id
    //   );
    //   if (!isPokemonAlreadyExists) {
    //     state.data.push(pokemon);
    //   }
    // },
    resetPokemonsReducer(state, action) {
      state.data = [];
    },
  },
});

export const pokemonsReducer = pokemonsSlice.reducer;
export const {
  initialize,
  error,
  success,
  initializePokemonsReducer,
  getPokemonsReducer,
  resetPokemonsReducer,
  // getSinglePokemonReducer,
} = pokemonsSlice.actions;

export const pokemonsSelector = (state: RootState) => state.pokemons;

const statusHandler = { initialize, error, success };

export const getPokemons = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { page, cachedPokemons, pokemons }) => {
    const size = PAGINATE_SIZE - (pokemons.length % PAGINATE_SIZE);
    const results = cachedPokemons.slice(page, page + size);
    dispatch(initializePokemonsReducer({ size }));
    console.log("passou aqui3");
    for await (const [index, hotel] of results.entries()) {
      console.log("passou aqui4", hotel);
      dispatch(
        getPokemonsReducer({
          pokemon: {
            ...camelcaseObject(hotel),
          },
          size,
          index,
        })
      );
    }
  }
);

// export const getPokemonById = wrapReduxAsyncHandler(
//   statusHandler,
//   async (dispatch, { pokemonId }) => {console.log("passou aqui");
//     const pokemon = await fromApi.getPokemonByNameOrId(pokemonId);
//     const pokemonImageUrl = transformSpriteToBaseImage(
//       pokemon.id,
//       baseImageUrl
//     );
//     const transformedPokemon = {
//       ...camelcaseObject(pokemon),
//       sprites: { frontDefault: pokemonImageUrl },
//     };
//     dispatch(getSinglePokemonReducer({ pokemon: transformedPokemon }));
//   }
// );

export const getPokemonsDynamically = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { pokemonIds }) => {
    // for await (const id of pokemonIds) {console.log("passou aqui2");
    //   const pokemon = await fromApi.getPokemonByNameOrId(id);
    //   const pokemonImageUrl = transformSpriteToBaseImage(
    //     pokemon.id,
    //     baseImageUrl
    //   );
    //   const transformedPokemon = {
    //     ...camelcaseObject(pokemon),
    //     sprites: { frontDefault: pokemonImageUrl },
    //   };
    //   // dispatch(getSinglePokemonReducer({ pokemon: transformedPokemon }));
    // }
  }
);

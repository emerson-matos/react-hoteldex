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

const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    ...statusHandlerReducer,
    initializeHotelsReducer(state, action: PayloadAction<{ size: number }>) {
      const { size } = action.payload;
      const nullValues = new Array<null>(size).fill(null);
      if (state.data.length === 0) {
        state.data = nullValues;
      } else {
        state.data = state.data.concat(nullValues);
      }
    },
    getHotelsReducer(
      state,
      action: PayloadAction<{ hotel: Hotel; index: number; size: number }>
    ) {
      const { hotel, size, index } = action.payload;

      const isHotelAlreadyExists = state.data.find(
        (existingHotel) =>
          existingHotel !== null && existingHotel.placeId === hotel.placeId
      );
      if (!isHotelAlreadyExists) {
        state.data[state.data.length - (size - index)] = hotel;
      }
    },
    // getSingleHotelReducer(
    //   state,
    //   action: PayloadAction<{ hotel: Hotel }>
    // ) {
    //   const { hotel } = action.payload;
    //   const isHotelAlreadyExists = state.data.find(
    //     (existingHotel) =>
    //       existingHotel !== null && existingHotel.id === hotel.id
    //   );
    //   if (!isHotelAlreadyExists) {
    //     state.data.push(hotel);
    //   }
    // },
    resetHotelsReducer(state, _action) {
      state.data = [];
    },
  },
});

export const hotelsReducer = hotelsSlice.reducer;
export const {
  initialize,
  error,
  success,
  initializeHotelsReducer,
  getHotelsReducer,
  resetHotelsReducer,
  // getSingleHotelReducer,
} = hotelsSlice.actions;

export const hotelsSelector = (state: RootState) => state.hotels;

const statusHandler = { initialize, error, success };

export const getHotels = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { page, cachedHotels, hotels }) => {
    const size = PAGINATE_SIZE - (hotels.length % PAGINATE_SIZE);
    const results = cachedHotels.slice(page, page + size);
    dispatch(initializeHotelsReducer({ size }));
    console.log("passou aqui3");
    for await (const [index, hotel] of results.entries()) {
      console.log("passou aqui4", hotel);
      dispatch(
        getHotelsReducer({
          hotel: {
            ...camelcaseObject(hotel),
          },
          size,
          index,
        })
      );
    }
  }
);

// export const getHotelById = wrapReduxAsyncHandler(
//   statusHandler,
//   async (dispatch, { hotelId }) => {console.log("passou aqui");
//     const hotel = await fromApi.getHotelByNameOrId(hotelId);
//     const hotelImageUrl = transformSpriteToBaseImage(
//       hotel.id,
//       baseImageUrl
//     );
//     const transformedHotel = {
//       ...camelcaseObject(hotel),
//       sprites: { frontDefault: hotelImageUrl },
//     };
//     dispatch(getSingleHotelReducer({ hotel: transformedHotel }));
//   }
// );

export const getHotelsDynamically = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { hotelIds }) => {
    // for await (const id of hotelIds) {console.log("passou aqui2");
    //   const hotel = await fromApi.getHotelByNameOrId(id);
    //   const hotelImageUrl = transformSpriteToBaseImage(
    //     hotel.id,
    //     baseImageUrl
    //   );
    //   const transformedHotel = {
    //     ...camelcaseObject(hotel),
    //     sprites: { frontDefault: hotelImageUrl },
    //   };
    //   // dispatch(getSingleHotelReducer({ hotel: transformedHotel }));
    // }
  }
);

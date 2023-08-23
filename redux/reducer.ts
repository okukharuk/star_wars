import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  liked: { [name: string]: boolean };
  sortFilms: 1 | -1;
} = {
  sortFilms: 1,
  liked: {},
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    changeLiked: (state, action: PayloadAction<{ character: string; liked: boolean }>) => {
      return {
        ...state,
        liked: {
          ...state.liked,
          [`${action.payload.character}`]: action.payload.liked,
        },
      };
    },
    changeFilmSort: (state) => {
      return {
        ...state,
        sortFilms: (state.sortFilms * -1) as 1 | -1,
      };
    },
  },
});

export default rootSlice.reducer;

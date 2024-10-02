import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, saveToLocalStorage } from "../utils";

const selectedCountriesSlice = createSlice({
  name: "selectedCountries",
  initialState: {
    selectedCountries: getFromLocalStorage("selectedCountries") ?? [],
  },
  reducers: {
    add: (state, action) => {
      state.selectedCountries = [...state.selectedCountries, action.payload];
      saveToLocalStorage("selectedCountries", state.selectedCountries);
    },
    remove: (state, action) => {
      // state.countries = action.payload;
      console.log(action.payload);
      state.selectedCountries = state.selectedCountries.filter(
        (country) => country.name !== action.payload
      );
      saveToLocalStorage("selectedCountries", state.selectedCountries);
    },
  },
});

export const { add, remove } = selectedCountriesSlice.actions;
export default selectedCountriesSlice.reducer;

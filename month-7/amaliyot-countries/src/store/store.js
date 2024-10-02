import { configureStore } from "@reduxjs/toolkit";
import selectedCountriesSlice from "./selectedCountriesSlice";
import countriesSlice from "./countriesSlice";

export default configureStore({
  reducer: { selectedCountriesSlice, countriesSlice },
});

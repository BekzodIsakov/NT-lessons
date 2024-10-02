import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/helper";

const initialUserData = getFromLocalStorage("user");
console.log({ initialUserData });

const userSlice = createSlice({
  name: "user",
  initialState: { userData: initialUserData, error: null },
  reducers: {
    addUser: function (state, action) {
      state.userData = action.payload;
      saveToLocalStorage("user", state.userData);
      if (state.userData.token) {
        saveToLocalStorage("token", state.userData.token);
      }
    },
    setUserError: function (state, action) {
      state.error = action.payload;
    },
    removeUser: function () {
      return { userData: null, error: null };
    },
  },
});

export const { addUser, setUserError, removeUser } = userSlice.actions;
export default userSlice.reducer;

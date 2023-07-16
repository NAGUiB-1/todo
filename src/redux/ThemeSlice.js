import { createSlice } from "@reduxjs/toolkit";

export const Theme = createSlice({
  name: "theme",
  initialState: {
    theme: "dark", // ###
  },
  reducers: {
    toggleTheme: (state) => {
      if (state.theme == "dark") {
        state.theme = "light";
      } else {
        state.theme = "dark";
      }
    },
  },
});

export const { toggleTheme } = Theme.actions;
export default Theme.reducer;

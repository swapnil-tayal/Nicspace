import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLightMode: true,
  user: null,
  token: null,
  posts: []
}

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers:{
    setMode: (state) => {
      state.isLightMode = !state.isLightMode;
    },
    setLogin:(state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  }
})

export const { setMode, setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLightMode: true,
  user: null,
  token: null,
  posts: [],
  page:"home"
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
    setPage: (state, action) => {
      state.page = action.payload.page;
    }
  }
})

export const { setMode, setLogin, setLogout, setPage } = authSlice.actions;
export default authSlice.reducer;
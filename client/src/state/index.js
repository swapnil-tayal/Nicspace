import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLightMode: true,
  user: null,
  token: null,
  posts: [],
  page: "home",
  currPost: null,
  searchWord: ""
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMode: (state) => {
      state.isLightMode = !state.isLightMode;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      console.log("hello from redux");
      state.user = null;
      state.token = null;
      (state.posts = []), (state.page = "home");
    },
    setPage: (state, action) => {
      state.page = action.payload.page;
    },
    setPost: (state, action) => {
      state.posts = action.payload.posts;
    },
    setCurrPost: (state, action) => {
      state.currPost = action.payload.currPost;
    },
    setSearchWord: (state, action) => {
      state.searchWord = action.payload.searchWord
    }
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setPage,
  setPost,
  setCurrPost,
  setSearchWord
} = authSlice.actions;
export default authSlice.reducer;

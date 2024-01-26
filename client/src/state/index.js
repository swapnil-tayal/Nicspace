import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  posts: [],
  page: "home",
  currPost: null,
  searchWord: "",
  host:"https://nicspace-server.onrender.com"
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      // console.log("hello from redux");
      state.user = null;
      state.token = null;
      state.posts = [];
      state.page = "/";
      state.host = "https://nicspace-server.onrender.com";
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
    },
  },
});

export const {
  setLogin,
  setLogout,
  setPage,
  setPost,
  setCurrPost,
  setSearchWord,
  setDark
} = authSlice.actions;
export default authSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import post from "./slices/post";
import auth from "./slices/auth";

const store = configureStore({
  reducer:{
    post:post,
    auth:auth
  }
})

export default store
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feautures/auth/authSlice";
import commentSlice from "./feautures/comments/commentSlice";
import postSlice from "./feautures/post/postSlice";
import userSlice from "./feautures/users/userSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    comment: commentSlice,
    users: userSlice
  },
});

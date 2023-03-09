import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  users: [],
  isLoading: false,
  status: null,
};

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (username) => {
    try {
      const { data } = await axios.delete(`/users/${username}`, username);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (username) => {
    try {
      const { data } = await axios.put(`/users/${username}`, username);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeUser: (state) => {
      state.status = null;
    },
  },
  extraReducers: {
    // delete
    [deleteUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    [deleteUser.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    // update
    [updateUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    [updateUser.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
  },
});
export const { removeUser } = userSlice.actions;
export default userSlice.reducer;

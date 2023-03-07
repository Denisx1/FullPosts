import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ADMIN } from "../../../const";
import axios from "../../../utils/axios";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, password }) => {
    try {
      const { data } = await axios.post(`/auth/registration`, {
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }) => {
    try {
      const { data } = await axios.post(`/auth/login`, {
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMe = createAsyncThunk("auth/getMe", async () => {
  try {
    const { data } = await axios.get(`/auth/me`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (username) => {
    try {
      const { data } = await axios.delete(`/auth/${username}`, username);
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
      const { data } = await axios.put(`/auth/${username}`, username);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
    removeUser: (state)=>{
      state.status = null;
    }
  },
  extraReducers: {
    //RegisterUser
    [registerUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload?.newUser.role;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    // LoginUser
    [loginUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload?.user.role;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    // Проверка авторизации
    [getMe.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [getMe.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = null;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
      state.role = action.payload?.user.role;
    },
    [getMe.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
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
export const checkRole = (state) => Boolean(state.auth.role === ADMIN);
export const checkIsAuth = (state) => Boolean(state.auth.token);

export const { logout, removeUser } = authSlice.actions;
export default authSlice.reducer;

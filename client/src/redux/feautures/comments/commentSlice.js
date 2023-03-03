import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  comments: [],
  loading: false,
  status: null
};

export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ postId, comment }) => {
    try {
      const { data } = await axios.post(`/comments/${postId}`, {
        postId,
        comment,
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);
export const getPostComments = createAsyncThunk(
  "comment/getPostComments",
  async (postId) => {
    try {
      const { data } = await axios.get(`/posts/comments/${postId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteComment = createAsyncThunk('comment/deleteComment', async({id, commentId})=>{
  try{
    const {data} = await axios.delete(`/comments/${id}/${commentId}`)
    return data
  } catch(e) {
    console.log(e)
  }
})

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    // CreateComment
    [createComment.pending]: (state) => {
      state.loading = true;
    },
    [createComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments.push(action.payload);
    },
    [createComment.rejected]: (state) => {
      state.loading = false;
    },
    //getComment
    [getPostComments.pending]: (state) => {
      state.loading = true;
    },
    [getPostComments.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload
    },
    [getPostComments.rejected]: (state) => {
      state.loading = false;
    },
    // deleteComment
    [deleteComment.pending]: (state) => {
      state.loading = true;
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.comments = state.comments.filter((comment)=>console.log(comment));
      state.status = action.payload.message
      state.loading = false;
    },
    [deleteComment.rejected]: (state) => {
      state.loading = false;  
    },
  },
});



export default commentSlice.reducer;

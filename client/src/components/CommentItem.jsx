import React, { useEffect, useCallback } from "react";
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ADMIN, POSTS_PAGE, POST_ONE_PAGE } from "../const";
import { checkRole } from "../redux/feautures/auth/authSlice";
import {
  deleteComment,
  getPostComments,
} from "../redux/feautures/comments/commentSlice";

export const CommentItem = ({ cmt }) => {
  const history = useHistory();
  const role = useSelector(checkRole);
  const dispatch = useDispatch();
  const { id } = useParams();
  const {loading} = useSelector(state=> state.comment)
  const avatar = cmt.comment.trim().toUpperCase().split("").slice(0, 2);
  const deleteCommentHandler = () => {
    dispatch(deleteComment({ id, commentId: cmt._id }));
  };

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(id));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    
    <div className="flex items-center gap-3 mb-2">
      <div className="flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-sm">
        {avatar}
      </div>
      <div className="flex text-gray-300 text-[10px]">{cmt.comment}</div>
      {role === ADMIN && (
        <button
          onClick={deleteCommentHandler}
          className="flex items-center justify-center gap-2  text-white opacity-50"
        >
          <AiFillDelete />
        </button>
      )}
    </div>
  );
};

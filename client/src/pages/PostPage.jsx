import React, { useCallback, useEffect, useState } from "react";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import { ADMIN, EDIT_POST_PAGE, MAIN_PAGE, POSTS_PAGE } from "../const";
import { removePost } from "../redux/feautures/post/postSlice";
import { CommentItem } from "../components/CommentItem";
import {
  createComment,
  getPostComments,
} from "../redux/feautures/comments/commentSlice";
import { checkIsAuth, checkRole } from "../redux/feautures/auth/authSlice";

const PostPage = () => {
  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");

  const isAuth = useSelector(checkIsAuth);
  const admin = useSelector(checkRole);

  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);
  const { id } = useParams();

  const removePostHandler = () => {
    try {
      dispatch(removePost({ id, author: post.author }));
      toast("Пост был удален");
      history.push(POSTS_PAGE);
    } catch (error) {
      console.log(error);
    }
  };

  const handlerSubmit = () => {
    try {
      const postId = id;
      dispatch(createComment({ postId, comment }));
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(id));
    } catch (error) {
      console.log(error);
    }
  }, [id, dispatch]);

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${id}`);
    setPost(data);
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px4">
        <Link to={MAIN_PAGE}>Назад</Link>
      </button>
      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div className={post?.imgUrl ? "flex  h-80" : "flex rounded-sm"}>
              {post.imgUrl && (
                <img
                  src={`http://localhost:5000/${post.imgUrl}`}
                  alt="img"
                  className="object-cover w-full rounded-2xl"
                />
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-white opacity-50">{post.username}</div>
            <div className="text-xs text-white opacity-50">
              <Moment data={post.createdAt} format="D MM YYYY" />
            </div>
          </div>
          <div className=" text-white text-xl">{post.title}</div>
          <p className="text-white opacity-50 text-s pt-4">{post.text}</p>
          <div className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex gap-3 mt-4">
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiFillEye />
                <span>{post.views}</span>
              </button>
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiOutlineMessage /> <span>{post.comments?.length}</span>
              </button>
            </div>
            {(user?._id === post.author ||  admin) && (
              <div className="flex gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 text-white opacity-50">
                  <Link to={EDIT_POST_PAGE + "/" + id}>
                    <AiTwotoneEdit />
                  </Link>
                </button>
                <button
                  onClick={removePostHandler}
                  className="flex items-center justify-center gap-2  text-white opacity-50"
                >
                  <AiFillDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/3 p-8 bg-gray-700  flex flex-col-reverse gap-2 rounded-xl">
          <form className="flex gap-2 " onSubmit={(e) => e.preventDefault()}>
            {isAuth ? (
              <>
                <input
                  type={"text"}
                  value={comment}
                  placeholder="comment"
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full rounded-sm bg-gray-400 border p-2 text-xs outline pla text-gray-700"
                />
                <button
                  type="submit"
                  onClick={handlerSubmit}
                  className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
                >
                  Отправить
                </button>
              </>
            ) : (
              <button>Что бы оставить коментарий зарегистрируйтесь</button>
            )}
          </form>
          {comments.length > 0
            ? comments.map((cmt) => <CommentItem key={cmt._id} cmt={cmt} />)
            : ""}
        </div>
      </div>
    </div>
  );
};
export default PostPage;

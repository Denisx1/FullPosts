import React from "react";
import { Link } from "react-router-dom";
import { POST_ONE_PAGE } from "../const";

export const PopularPosts = ({ post }) => {
  return (
    <div className="bg-gray-600 my-1">
      <Link
        to={POST_ONE_PAGE + "/" + post._id}
        className="flex text-xs p-3 text-gray-300 hover:bg-gray-800 hover:text-white"
      >
        {post.title}
      </Link>
    </div>
  );
};

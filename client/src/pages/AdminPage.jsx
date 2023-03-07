import React, { Children, useEffect, useState } from "react";
import { DELETE_USER, ADMIN_PAGE } from "../const/index";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  deleteUserfromLine,
  removeUser,
  updateUser,
} from "../redux/feautures/auth/authSlice";
import { toast } from "react-toastify";

const AdminPage = () => {
  const [username, setUsername] = useState("");
  const [updateUserState, setUpdateUserState] = useState("");
  const status = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  const deleteHandler = () => {
    if (!username) {
      toast("Write Username");
    } else {
      dispatch(deleteUser(username));
      setUsername("");
    }
  };
  const updateHandler = () => {
    if (!updateUserState) {
      toast("Write Username");
    } else {
      dispatch(updateUser(updateUserState));
      setUpdateUserState("");
    }
  };

  useEffect(() => {
    if (status) {
      toast(status);
    }
    dispatch(removeUser());
  }, [status]);

  return (
    <React.Fragment>
      <div className="flex mt-5">
        <ul className="flex flex-col gap-8">
          <div className="flex flex-col items-center">
            <NavLink
              to={ADMIN_PAGE}
              href="/"
              className="text-s text-gray-400 hover:text-white"
            >
              Delete User
            </NavLink>
            <input
              type="text"
              value={username}
              className="ml-5"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="">
              <button className="ml-5" onClick={deleteHandler}>
                Delete
              </button>
              <button className="ml-5" onClick={deleteHandler}>
                Delete
              </button>
            </div>
          </div>
          <li>
            <NavLink
              to={ADMIN_PAGE}
              href="/"
              className="text-s text-gray-400 hover:text-white"
            >
              Update Role User
            </NavLink>
            <input
              type="text"
              value={updateUserState}
              className="ml-5"
              placeholder="Update to manager"
              onChange={(e) => setUpdateUserState(e.target.value)}
            />
            <button className="ml-5" onClick={updateHandler}>
              Update
            </button>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default AdminPage;

// <div className="flex justify-center items-center bg-gray-600 text-xs text-white ronded-sm px-4 py-2">
//   <button>
//     <Link to={ADMIN_PAGE}>Admin</Link>
//   </button>
// </div>;

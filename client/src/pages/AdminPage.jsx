import React, { Children, useEffect, useState } from "react";
import { DELETE_USER, ADMIN_PAGE } from "../const/index";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  removeUser,
  updateUser,
} from "../redux/feautures/users/userSlice";
import { toast } from "react-toastify";
import Logik from "../components/adminPanel/logicAdminPanel";
import Component from "../components/adminPanel/componentAdminPanel";

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
    <div className=" mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-3/5 bg-white">
          <Component />
        </div>
        <div className="basis-1/5 bg-white">
          <Logik
            deleteHandler={deleteHandler}
            updateHandler={updateHandler}
            setUsername={setUsername}
            setUpdateUserState={setUpdateUserState}
            username={username}
            updateUserState={updateUserState}
            ADMIN_PAGE={ADMIN_PAGE}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

// <div className="flex justify-center items-center bg-gray-600 text-xs text-white ronded-sm px-4 py-2">
//   <button>
//     <Link to={ADMIN_PAGE}>Admin</Link>
//   </button>
// </div>;

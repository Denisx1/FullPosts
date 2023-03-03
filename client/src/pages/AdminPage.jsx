import React, { Children, useState } from "react";
import { LayoutAdmin } from "../components/layoutAdmin";
import { DELETE_USER, ADMIN_PAGE } from "../const/index";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser, updateUser } from "../redux/feautures/auth/authSlice";

const AdminPage = () => {
  const [username, setUsername] = useState('')
  const [updateUserState, setUpdateUserState] = useState('')
  const dispatch = useDispatch()

  const deleteHandler = () =>{
    dispatch(deleteUser(username))
    setUsername('')
  }
  const updateHandler = () =>{
    dispatch(updateUser(updateUserState))
    setUpdateUserState('')
  }
  
  return (
    <React.Fragment>
      <div className="flex mt-5">
        <ul className="flex flex-col gap-8">
          <li>
            <NavLink
              to={ADMIN_PAGE}
              href="/"
              className="text-s text-gray-400 hover:text-white"
            >
              Delete User
            </NavLink>
            <input type="text" className="ml-5" placeholder="username" onChange={(e)=> setUsername(e.target.value)}/>
            <button className="ml-5" onClick={deleteHandler}>Delete</button>
          </li>
          <li>
            <NavLink
              to={ADMIN_PAGE}
              href="/"
              className="text-s text-gray-400 hover:text-white"
            >
              Update Role User
            </NavLink>
            <input type="text" className="ml-5" placeholder="Update to manager" onChange={(e)=> setUpdateUserState(e.target.value)}/>
            <button className="ml-5" onClick={updateHandler}>Update</button>
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

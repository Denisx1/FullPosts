import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  MAIN_PAGE,
  POSTS_PAGE,
  NEW_POST,
  LOGIN_PAGE,
  ADMIN_PAGE,
} from "../const";
import {
  checkIsAuth,
  checkRole,
  logout,
} from "../redux/feautures/auth/authSlice";

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const admin = useSelector(checkRole);

  const dispatch = useDispatch();
  const history = useHistory();

  const activeStyles = {
    color: "white",
  };

  const logouthandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    history.push(MAIN_PAGE);
    toast("Вы вышли из системы");
  };

  return (
    <div className="flex py-4 justify-evenly items-center">
      <span className="flex justify-center  items-center w-6 h-6 bg-gray-600 text-cx text-white ronded-3xl">
        <NavLink
          to={MAIN_PAGE}
          href="/"
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
          className="text-s text-gray-400 hover:text-white "
        >
          Главная
        </NavLink>
      </span>

      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              to={POSTS_PAGE}
              href="/"
              style={(isActive) => (isActive ? activeStyles : undefined)}
              className="text-s text-gray-400 hover:text-white"
            >
              Мои посты
            </NavLink>
          </li>
          <li>
            <NavLink
              to={NEW_POST}
              href="/"
              style={(isActive) => (isActive ? activeStyles : undefined)}
              className="text-s text-gray-400 hover:text-white"
            >
              Добавить пост
            </NavLink>
          </li>
          {admin && (
            <li>
              <NavLink
                to={ADMIN_PAGE}
                href="/"
                style={(isActive) => (isActive ? activeStyles : undefined)}
                className="text-s text-gray-400 hover:text-white"
              >
                Админ панель
              </NavLink>
            </li>
          )}
        </ul>
      )}

      <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded px-4 py-2">
        {isAuth ? (
          <button onClick={logouthandler}>Выйти</button>
        ) : (
          <Link to={LOGIN_PAGE}>Войти</Link>
        )}
      </div>
    </div>
  );
};

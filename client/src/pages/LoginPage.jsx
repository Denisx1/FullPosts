import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { REGISTER_PAGE } from "../const";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, loginUser } from "../redux/feautures/auth/authSlice";
import { toast } from "react-toastify";
import { MAIN_PAGE } from "../const";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isAuth = useSelector(checkIsAuth);
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (status) toast(status);
    if (isAuth) {
      history.push(MAIN_PAGE);
    }
  }, [status, isAuth, history]);

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40"
    >
      <h1 className="text-lg text-white text-center">авторизация</h1>
      <label className="text-xs text-gray-400">
        Username:
        <input
          type={"text"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={"username"}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>
      <label className="text-xs text-gray-400">
        Password:
        <input
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={"password"}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>
      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4"
        >
          Войти
        </button>
        <Link
          to={REGISTER_PAGE}
          className="flex justify-center items-center text-xs text-white"
        >
          Нет аккаунта?
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;

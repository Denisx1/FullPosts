import React from "react";
import { NavLink } from "react-router-dom";

const Logik = ({
  deleteHandler,
  updateHandler,
  setUsername,
  setUpdateUserState,
  username,
  updateUserState,
  ADMIN_PAGE,
}) => {
  return (
    <>
      <label
        for="website-admin"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Username
      </label>
      <div class="flex">
        <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          @
        </span>
        <input
          type="text"
          id="website-admin"
          class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="elonmusk"
        />
        <button
          class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
          onClick={deleteHandler}
        >
          Delete User
        </button>
      </div>
    </>
  );
};
export default Logik;

{
  /* <form class="w-full max-w-sm">
        <div class="flex flex-col items-center border-b border-teal-500 py-2">
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
            onClick={deleteHandler}
          >
            Delete User
          </button>
        </div>
        <div className="flex flex-col items-center border-b border-teal-500 py-2">
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            value={updateUserState}
            className="ml-5"
            placeholder="Update to manager"
            onChange={(e) => setUpdateUserState(e.target.value)}
          />
          <button
            class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
            onClick={updateHandler}
          >
            Update User
          </button>
        </div>
      </form> */
}

import AddPostPage from "./pages/AddPostPage";
import EditPostPage from "./pages/EditPostPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from './pages/AdminPage'

import {
  MAIN_PAGE,
  POSTS_PAGE,
  REGISTER_PAGE,
  LOGIN_PAGE,
  NEW_POST,
  POST_ONE_PAGE,
  EDIT_POST_PAGE,
  ADMIN_PAGE,
} from "./const";

export const authRoutes = [
  {
    path: NEW_POST,
    Component: AddPostPage,
  },
  {
    path: EDIT_POST_PAGE + "/:id",
    Component: EditPostPage,
  },
  {
    path: POSTS_PAGE,
    Component: PostsPage,
  },

];

export const adminRoute = [
  {
    path: ADMIN_PAGE,
    Component: AdminPage,
  },

]

export const publickRoutes = [
  {
    path: MAIN_PAGE,
    Component: MainPage,
  },

  {
    path: REGISTER_PAGE,
    Component: RegisterPage,
  },
  {
    path: LOGIN_PAGE,
    Component: LoginPage,
  },
  {
    path: POST_ONE_PAGE + "/:id",
    Component: PostPage,
  },
];

import { Layout } from "./components/Layout";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/feautures/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(getMe());
    }, 200);
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Layout>
        <AppRouter />
        <ToastContainer position="bottom-right" />
      </Layout>
    </BrowserRouter>
  );
}

export default App;

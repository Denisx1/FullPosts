import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { adminRoute, authRoutes, publickRoutes } from "../routes";
import { ADMIN, MAIN_PAGE } from "../const";
import { useSelector } from "react-redux";
import { checkIsAuth, checkRole } from "../redux/feautures/auth/authSlice";

const AppRouter = () => {

  const isAuth = useSelector(checkIsAuth);
  const role = useSelector(checkRole);

  return (
    <Switch>
      {isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {role &&
        adminRoute.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}

      {publickRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      <Redirect to={MAIN_PAGE} />
    </Switch>
  );
};

export default AppRouter;

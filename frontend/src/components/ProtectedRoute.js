import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "./AppContext";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const loginContext = React.useContext(AppContext);
  console.log(loginContext);
  console.log(props.loggedIn);
  return (
    <Route>
      {() => {
          return loginContext.loggedIn ? <Component {...props} /> : <Redirect to="./sign-in" />
        }
      }
    </Route>
  );
};

export default ProtectedRoute

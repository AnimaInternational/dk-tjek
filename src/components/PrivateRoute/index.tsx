import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAppState } from "../../state";

export default function PrivateRoute({ children, ...props }: RouteProps) {
  const { user } = useAppState();

  const shouldRenderChildren = !!user;

  return (
    <Route
      {...props}
      render={({ location }) =>
        shouldRenderChildren ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

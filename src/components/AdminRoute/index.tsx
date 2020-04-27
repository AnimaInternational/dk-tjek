import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAppState } from "../../state";

export default function AdminRoute({ children, ...props }: RouteProps) {
  const { user, isAdmin } = useAppState();

  const shouldRenderChildren = user && isAdmin;

  return (
    <Route
      {...props}
      render={({ location }) =>
        shouldRenderChildren ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: user ? "/" : "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

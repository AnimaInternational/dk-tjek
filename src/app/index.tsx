import React from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledApp } from "./style";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import PrivateRoute from "../components/PrivateRoute";
import AdminRoute from "../components/AdminRoute";
import { AdminPage } from "../pages/AdminPage";
import { MainPage } from "../pages/MainPage";
import { useAppState } from "../state";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { Overlay } from "../components/Overlay";
import { StyledIconButton } from "../styles/styled/StyledIconButton";
import { ProfilePage } from "../pages/ProfilePage";

export const App: React.FC = () => {
  const { user, isAdmin } = useAppState();

  return (
    <StyledApp>
      <Router>
        <header>
          <h1>Anima</h1>
          {user !== undefined && (
            <nav>
              {user && (
                <ul>
                  {isAdmin && (
                    <>
                      <li>
                        <Link to="/">Search</Link>
                      </li>
                      <li>
                        <Link to="/users">Admin</Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link to="/profile">
                      <StyledIconButton>
                        <FontAwesomeIcon icon={faUser} />
                      </StyledIconButton>
                    </Link>
                  </li>
                </ul>
              )}
            </nav>
          )}
        </header>
        {user === undefined ? (
          <Overlay>
            <LoadingIndicator />
          </Overlay>
        ) : (
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <AdminRoute path="/users">
              <AdminPage />
            </AdminRoute>
            <PrivateRoute path="/profile">
              <ProfilePage />
            </PrivateRoute>
            <PrivateRoute path="/">
              <MainPage />
            </PrivateRoute>
          </Switch>
        )}
      </Router>
    </StyledApp>
  );
};

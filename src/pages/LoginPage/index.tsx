import React, { FormEvent, useEffect } from "react";
import { StyledLoginPage } from "./style";
import { useAppState } from "../../state";
import { useHistory, useLocation } from "react-router-dom";
import { useLoginForm } from "../../hooks/useForm/useLoginForm";

export const LoginPage: React.FC = ({ children, ...props }) => {
  const { user } = useAppState();
  const history = useHistory();
  const location = useLocation<{ from: Location }>();
  const {
    handleSubmit,
    handleInputChange,
    error,
    loading,
    values,
  } = useLoginForm();

  useEffect(() => {
    if (user) history.replace(location?.state?.from || { pathname: "/" });
  }, [user, history, location]);

  const handleFormSubmit = async (event: FormEvent) => {
    await handleSubmit(event);
    history.replace(location?.state?.from || { pathname: "/" });
  };

  return (
    <StyledLoginPage>
      <main>
        <h2>Welcome</h2>
        <form onSubmit={handleFormSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="hanna@anima.dk"
              onChange={handleInputChange}
              value={values.email}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="*********"
              onChange={handleInputChange}
              value={values.password}
            />
          </label>
          {error && <p className="error">{error.message}</p>}
          <button type="submit" disabled={loading}>
            Login
          </button>
        </form>
      </main>
    </StyledLoginPage>
  );
};

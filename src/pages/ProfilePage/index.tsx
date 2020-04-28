import React, { useEffect, useState } from "react";
import { ProfileEntry } from "../../components/ProfileEntry";
import { useForm } from "../../hooks/useForm";
import { useAppState } from "../../state";
import { StyledProfilePage } from "./style";

interface ProfilePageProps {}

const NameEntry: React.FC = () => {
  const { user } = useAppState();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const {
    values,
    error,
    loading,
    valid,
    handleInputChange,
    handleSubmit,
  } = useForm(
    { name: user?.displayName || "" },
    async (values) => {
      await user!.updateProfile({ displayName: values.name });
    },
    (values) => {
      return values.name.length > 3;
    }
  );

  useEffect(() => {
    setErrorMessage(error?.message);
  }, [error]);

  return (
    <ProfileEntry
      onFormSubmit={handleSubmit}
      label="Name"
      value={user?.displayName}
      error={errorMessage}
      disabled={loading || !valid}
    >
      <label>
        Name
        <input
          type="text"
          name="name"
          onChange={handleInputChange}
          value={values.name}
        />
      </label>
    </ProfileEntry>
  );
};

const EmailEntry: React.FC = () => {
  const { user, reauthenticate } = useAppState();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const {
    values,
    error,
    loading,
    valid,
    handleInputChange,
    handleSubmit,
  } = useForm(
    { email: user?.email || "", password: "" },
    async (values) => {
      await reauthenticate(values.password);
      await user!.updateEmail(values.email);
    },
    (values) => {
      return values.email.includes("@");
    }
  );

  useEffect(() => {
    setErrorMessage(error?.message);
  }, [error]);

  return (
    <ProfileEntry
      onFormSubmit={handleSubmit}
      label="Email"
      value={user?.email}
      error={errorMessage}
      disabled={loading || !valid}
    >
      <label>
        New email
        <input
          type="email"
          name="email"
          onChange={handleInputChange}
          value={values.email}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          onChange={handleInputChange}
          value={values.password}
        />
      </label>
    </ProfileEntry>
  );
};

const PasswordEntry: React.FC = () => {
  const { user, reauthenticate } = useAppState();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const {
    values,
    loading,
    error,
    valid,
    handleInputChange,
    handleSubmit,
  } = useForm(
    { old: "", new: "", confirm: "" },
    async (values) => {
      await reauthenticate(values.old);
      await user!.updatePassword(values.new);
    },
    (values) => {
      return values.new === values.confirm && values.new.length > 5;
    }
  );

  useEffect(() => {
    setErrorMessage(error?.message);
  }, [error]);

  return (
    <ProfileEntry
      onFormSubmit={handleSubmit}
      label="Password"
      value="********"
      error={errorMessage}
      disabled={loading || !valid}
    >
      <label>
        Old password
        <input
          type="password"
          name="old"
          onChange={handleInputChange}
          value={values.old}
        />
      </label>
      <label>
        New password
        <input
          type="password"
          name="new"
          onChange={handleInputChange}
          value={values.new}
        />
      </label>
      <label>
        Confirm password
        <input
          type="password"
          name="confirm"
          onChange={handleInputChange}
          value={values.confirm}
        />
      </label>
    </ProfileEntry>
  );
};

export const ProfilePage: React.FC<ProfilePageProps> = ({
  children,
  ...props
}) => {
  const { signOut } = useAppState();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <StyledProfilePage>
      <main>
        <div className="header">
          <h2>My profile</h2>
          <button onClick={handleLogout}>Log out</button>
        </div>
        <ul>
          <NameEntry />
          <EmailEntry />
          <PasswordEntry />
        </ul>
      </main>
    </StyledProfilePage>
  );
};

import React, { FormEvent } from "react";
import { useCreateUserForm } from "../../hooks/useForm/useCreateUserForm";
import { StyledCreateUserModal } from "./style";
import { Api } from "../../types/api";

interface CreateUserModalProps {
  onUserCreated: (user: Api.User) => void;
  onClose: () => void;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = ({
  children,
  ...props
}) => {
  const {
    error,
    loading,
    values,
    valid,
    handleSubmit,
    handleInputChange,
  } = useCreateUserForm();

  const handleFormSubmit = async (event: FormEvent) => {
    const user = await handleSubmit(event);
    props.onUserCreated(user);
  };

  return (
    <StyledCreateUserModal title="Create user" onClose={() => props.onClose()}>
      <form onSubmit={handleFormSubmit}>
        <label>
          Email
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
            type="text"
            name="password"
            onChange={handleInputChange}
            value={values.password}
          />
        </label>
        <label>
          Name (optional)
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            value={values.name}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading || !valid}>
          Create
        </button>
      </form>
    </StyledCreateUserModal>
  );
};

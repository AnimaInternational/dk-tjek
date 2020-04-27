import React, { FormEvent } from "react";
import axios from "../../axios";
import { useUpdateUserForm } from "../../hooks/useForm/useUpdateUserForm";
import { Api } from "../../types/api";
import { StyledUpdateUserModal } from "./style";

interface UpdateUserModalProps {
  user: Api.User;
  onUserUpdated: (user: Api.User) => void;
  onUserDeleted: () => void;
  onClose: () => void;
}

export const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
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
  } = useUpdateUserForm(props.user);

  const handleUserDelete = async (event: FormEvent) => {
    event.preventDefault();
    await axios.delete(`users/${props.user!.uid}`);
    props.onUserDeleted();
  };

  const handleFormSubmit = async (event: FormEvent) => {
    const user = await handleSubmit(event);
    props.onUserUpdated(user);
  };

  return (
    <StyledUpdateUserModal title="Update user" onClose={() => props.onClose()}>
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
          Name
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            value={values.name}
          />
        </label>
        <label>
          New password
          <input
            type="text"
            name="password"
            onChange={handleInputChange}
            value={values.password}
          />
        </label>
        <label>
          Is admin?
          <input
            type="checkbox"
            name="admin"
            checked={values.admin}
            onChange={handleInputChange}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading || !valid}>
          Update
        </button>
        <button className="delete" onClick={handleUserDelete}>
          Delete
        </button>
      </form>
    </StyledUpdateUserModal>
  );
};

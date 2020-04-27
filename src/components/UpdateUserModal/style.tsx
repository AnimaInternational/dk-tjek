import styled from "styled-components";
import { Modal } from "../Modal";

export const StyledUpdateUserModal = styled(Modal)`
  width: var(--width-card-medium);

  form {
    border: none;
    box-shadow: none;
    input {
      width: 100%;
    }
    .delete {
      margin-left: 12px;
      background: none;
      border: none;
      color: var(--color-danger);
    }
    .error {
      display: block;
      color: var(--color-danger);
    }
  }
`;

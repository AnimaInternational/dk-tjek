import styled from "styled-components";
import { Modal } from "../Modal";

export const StyledCreateUserModal = styled(Modal)`
  width: var(--width-card-medium);

  form {
    border: none;
    box-shadow: none;
    input {
      width: 100%;
    }
    .error {
      display: block;
      color: var(--color-danger);
    }
  }
`;

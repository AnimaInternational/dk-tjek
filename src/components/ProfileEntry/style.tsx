import styled from "styled-components";

export const StyledProfileEntry = styled.li`
  button {
    margin-left: 12px;
    &.cancel {
      background: var(--color-text-secondary);
      border-color: var(--color-text-secondary);
    }
  }
  form {
    .error {
      display: block;
      color: var(--color-danger);
    }
  }
`;

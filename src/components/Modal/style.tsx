import styled from "styled-components";

export const StyledModal = styled.aside`
  background-color: var(--color-bg);
  box-shadow: var(--box-shadow) var(--color-shadow);
  border-radius: var(--border-radius);
  border: 1px solid var(--color-bg-secondary);
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    button {
      background: var(--color-text-secondary);
      border-color: var(--color-text-secondary);
    }
  }
`;

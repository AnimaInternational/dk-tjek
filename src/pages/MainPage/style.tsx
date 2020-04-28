import styled from "styled-components";

export const StyledMainPage = styled.div`
  .header {
    display: flex;
    align-items: center;
    p {
      margin-left: 16px;
    }
  }

  .error {
    display: block;
    color: var(--color-danger);
  }

  table {
    min-width: 100%;
  }
`;

import styled from "styled-components";

export const StyledAdminPage = styled.div`
  .header {
    display: flex;
    align-items: center;
    button {
      margin-left: 16px;
    }
  }

  table {
    min-width: 100%;
    td.admin {
      color: var(--color);
      font-weight: bold;
    }
  }
`;

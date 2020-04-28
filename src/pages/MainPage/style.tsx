import styled from "styled-components";

export const StyledMainPage = styled.div`
  .header {
    display: flex;
    align-items: center;
    p {
      margin-left: 16px;
    }
  }

  form {
    .search-bar {
      display: flex;
      flex-flow: row wrap;

      select,
      label,
      button {
        margin: 8px 0;
      }

      select,
      label {
        margin-right: 8px;
      }

      label {
        flex-basis: 160px;
        flex-grow: 1;
        input {
          width: 100%;
          height: 100%;
          margin: 0;
        }
      }
    }
    .error {
      display: block;
      color: var(--color-danger);
    }
  }

  .table-wrapper {
    overflow-x: scroll;
    table {
      min-width: 100%;
    }
  }
`;

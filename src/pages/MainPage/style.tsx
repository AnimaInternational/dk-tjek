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
      tbody {
        tr {
          &.danger {
            background-color: var(--color-danger-tint);
          }
          &.warning {
            background-color: var(--color-warning-tint);
          }
          &.success {
            background-color: var(--color-success-tint);
          }
          &:nth-child(even) {
            filter: brightness(2);
          }
        }
        .status {
          width: 16px;
          height: 16px;
          border-radius: 8px;
          &.danger {
            background-color: var(--color-danger);
          }
          &.warning {
            background-color: var(--color-warning);
          }
          &.success {
            background-color: var(--color-success);
          }
        }
      }
    }
  }
`;

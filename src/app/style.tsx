import styled from "styled-components";

export const StyledApp = styled.div`
  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box; /* Firefox, other Gecko */
    box-sizing: border-box; /* Opera/IE 8+ */
  }

  table {
    tbody {
    }
    tfoot {
      p {
        text-align: center;
      }
    }
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    nav {
      margin-bottom: 0;
      ul {
        li {
          margin-left: 16px;
        }
      }
    }
  }
`;

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
    tfoot {
      p {
        text-align: center;
      }
    }
  }

  select {
    display: inline-block;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    background-repeat: no-repeat;
    background-image: linear-gradient(45deg, transparent 50%, currentColor 50%),
      linear-gradient(135deg, currentColor 50%, transparent 50%);
    background-position: right 15px top 50%, right 10px top 50%;
    background-size: 5px 5px, 5px 5px;
    padding-right: 2rem;
    &::-ms-expand {
      display: none;
    }
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 120px;
    h1 {
      display: flex;
      align-items: center;
      svg {
        height: 30px;
      }
    }
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

import styled from "styled-components";

export const StyledLoadingIndicator = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  transform: rotate(45deg);
  transform-origin: 40px 40px;
  div {
    top: 32px;
    left: 32px;
    position: absolute;
    width: 32px;
    height: 32px;
    background: var(--color);
    animation: lds-heart 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  div:after,
  div:before {
    content: " ";
    position: absolute;
    display: block;
    width: 32px;
    height: 32px;
    background: var(--color);
  }
  div:before {
    left: -24px;
    border-radius: 50% 0 0 50%;
  }
  div:after {
    top: -24px;
    border-radius: 50% 50% 0 0;
  }
  @keyframes lds-heart {
    0% {
      transform: scale(0.95);
    }
    5% {
      transform: scale(1.1);
    }
    39% {
      transform: scale(0.85);
    }
    45% {
      transform: scale(1);
    }
    60% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(0.9);
    }
  }
`;

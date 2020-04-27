import styled from "styled-components";

export const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(1px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

import React from "react";
import { StyledOverlay } from "./style";

interface OverlayProps {
  onClick?: () => void;
}

export const Overlay: React.FC<OverlayProps> = ({ children, ...props }) => {
  return <StyledOverlay onClick={props.onClick}>{children}</StyledOverlay>;
};

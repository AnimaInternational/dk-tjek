import React from "react";
import { StyledLoadingIndicator } from "./style";

interface LoadingIndicatorProps {}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  children,
  ...props
}) => {
  return (
    <StyledLoadingIndicator>
      <div></div>
    </StyledLoadingIndicator>
  );
};

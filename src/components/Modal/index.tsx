import React from "react";
import { StyledModal } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { StyledIconButton } from "../../styles/styled/StyledIconButton";

interface ModalProps {
  title: string;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  return (
    <StyledModal {...props}>
      <div className="header">
        <h3>{props.title}</h3>
        <StyledIconButton onClick={() => props.onClose()}>
          <FontAwesomeIcon icon={faTimes} />
        </StyledIconButton>
      </div>
      {children}
    </StyledModal>
  );
};

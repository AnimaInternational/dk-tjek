import { faEdit, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  FormEvent,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import { StyledIconButton } from "../../styles/styled/StyledIconButton";
import { StyledProfileEntry } from "./style";

interface ProfileEntryProps {
  onFormSubmit: (event: FormEvent) => any;
  label: string;
  error?: string;
  disabled?: boolean;
  value?: string | null;
}

export const ProfileEntry: React.FC<ProfileEntryProps> = ({
  children,
  ...props
}) => {
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const handleCancel: MouseEventHandler = (event) => {
    event.preventDefault();
    setShouldUpdate(false);
  };

  const handleFormSubmit: FormEventHandler = async (event) => {
    await props.onFormSubmit(event);
    setShouldUpdate(false);
  };

  return (
    <StyledProfileEntry>
      <h3>{props.label}</h3>
      {shouldUpdate ? (
        <>
          <form onSubmit={handleFormSubmit}>
            {props.error && <p className="error">{props.error}</p>}
            {children}
            <StyledIconButton type="submit" disabled={props.disabled}>
              <FontAwesomeIcon icon={faSave} />
            </StyledIconButton>
            <StyledIconButton className="cancel" onClick={handleCancel}>
              <FontAwesomeIcon icon={faTimes} />
            </StyledIconButton>
          </form>
        </>
      ) : (
        <>
          <span>{props.value || "–"}</span>
          <StyledIconButton onClick={() => setShouldUpdate(true)}>
            <FontAwesomeIcon icon={faEdit} />
          </StyledIconButton>
        </>
      )}
    </StyledProfileEntry>
  );
};

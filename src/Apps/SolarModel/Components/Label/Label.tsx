import React from 'react';
import {StyledLabel} from "./Label.styles";

const Label = (props:OwnProps) => {
  const {name, onClick, show} = props;
  return (
    <StyledLabel show={show} onClick={onClick}>
      {name}
    </StyledLabel>
  );
};

interface OwnProps{
  name: string,
  show: boolean,
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default Label;
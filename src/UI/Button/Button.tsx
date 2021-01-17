import React from 'react';
import {StyledButton} from "./Button.styles";

const Button = (props:OwnProps) => {
  return (
    <StyledButton {...props} />
  );
};

interface OwnProps {
  children?: React.ReactChildren | any
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default Button;
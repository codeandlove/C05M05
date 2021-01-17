import React from 'react';
import {StyledBurger} from "./Burger.styles";

const Burger = (props:OwnProps) => {
  const {enabled} = props;

  return (
    <StyledBurger {...props} enabled={enabled} >
      <span/>
    </StyledBurger>
  );
};

interface OwnProps {
  children?: React.ReactChildren | any
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  enabled: boolean
}

export default Burger;
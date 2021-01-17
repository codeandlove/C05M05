import React from 'react';
import {StyledCheckbox, StyledCheckboxWrapper} from "./Switcher.styles";

const Switcher = (props:OwnProps) => {
  const {checked} = props;

  return (
    <StyledCheckboxWrapper checked={checked}>
      <StyledCheckbox {...props} type="checkbox" />
    </StyledCheckboxWrapper>
  );
};

interface OwnProps {
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default Switcher;
import React from 'react';
import logo from './c05m05_logo.svg';
import styled from "@emotion/styled";
import useStore from "../../../Store/Store";

const Logo = (props:OwnProps) => {
  const {setApp} = useStore();

  return (
    <StyledLogo onClick={() => setApp('solar')}>
      <img src={logo} alt="C05M05.COM" title="C05M05.COM" />
    </StyledLogo>
  );
};

interface OwnProps {}

const StyledLogo = styled.button`
  position: absolute;
  background: transparent;
  border: 0;
  left: 50%;
  top: 50%;
  width: 80%;
  max-width: 320px;
  transform: translate(-50%, -50%);
  z-index: 1;
  appearance: none;
`

export default Logo;
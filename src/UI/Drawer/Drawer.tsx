import React from 'react';
import {StyledDrawer} from "./Drawer.styles";

const Drawer = (props:OwnProps) => {
  const {visible, children} = props;
  return (
    <StyledDrawer visible={visible}>
      {children}
    </StyledDrawer>
  )
}

interface OwnProps {
  children?: React.ReactChildren | any
  visible: boolean
}

export default Drawer;
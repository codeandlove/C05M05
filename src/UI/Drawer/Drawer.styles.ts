import styled from "@emotion/styled";
import {css} from "@emotion/react";

export const StyledDrawer = styled.div<{visible: boolean}>`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 340px;
  background: rgba(0, 0, 0, .95);
  border-left: 1px solid #333333;
  color: #999999;
  transition: all .3s ease 0s;
  transform: translate(340px, 0);
  outline: 0;
  z-index: 99;
  
  ${({visible}) => visible && css(`
    transform: translate(0, 0);
  `)}
`;

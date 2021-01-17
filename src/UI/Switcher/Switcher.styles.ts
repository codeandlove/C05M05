import styled from "@emotion/styled";
import {css} from "@emotion/react";

export const StyledCheckbox = styled.input<{checked: boolean}>`
  transform: scale(0);
  position: absolute;
  z-index: -999;
`;

export const StyledCheckboxWrapper = styled.label<{checked: boolean}>`
  width: 5rem;
  height: 3rem;
  background: black;
  display: block;
  position: relative;
  border-radius: 50px;
  border: 1px solid #333;
  transition: all .3s ease 0s;
  
  &:hover {
    border-color: color: #666;
    
    &:after {
      color: #666666;
    }    
  }
  
  &:after {
    content: '';
    position: absolute;
    background: #333;
    border-radius: 100px;
    width: 3rem;
    height: 3rem;
    left: 0;
    cursor: pointer;
    transition: all .3s ease 0s;
    
    &:hover {
      color: #666;
    }
  }
  
  ${({checked}) => checked && css(`
    &:after {
      left: calc(100% - 3rem);
    }
  `)}
`;

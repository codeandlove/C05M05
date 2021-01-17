import styled from "@emotion/styled";
import {css} from "@emotion/core";

export const StyledLabel = styled.button<{show:boolean}>`
  background: #000000;
  border: 1px solid #333333;
  border-radius: 2px;
  padding: 5px 10px;
  color: #666666;
  transition: color .3s ease 0s, opacity 1s ease 0s;
  appearance: none;
  outline: 0;
  cursor: pointer;
  opacity: 0;
  
  &:hover {
    color: #999999;
    outline: 0;
  }
  
  ${({show}) => show && css`
    opacity: 1;
  `}
`;
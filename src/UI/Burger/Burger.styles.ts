import styled from "@emotion/styled";
import {Button} from "../index";
import {css} from "@emotion/react";

export const StyledBurger = styled(Button)<{enabled: boolean}>`
  position: relative;
  z-index: 2;
  display: block;
  width: 3.2rem;
  height: 3.2rem;
  padding: 0;
  cursor: pointer;
  transition: all .3s ease 0s;
  box-shadow: 0 0 0 0;
  border-radius: 1px;

  &:hover,
  &:focus,
  &:active {
    outline: none;
  }

  > span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    width: 1.8rem;
    height: .2rem;
    display: block;
    transition: all .3s ease 0s;
    color: transparent;
    font-size: 0;
    border-radius: 1px;

    &::before,
    &::after {
      background: #ffffff;
      content: '';
      display: block;
      height: .2rem;
      transform: rotate(0deg);
      transition: all .3s ease 0s;
      width: 100%;
      position: absolute;
      transform-origin: 100% 50% 0;
      border-radius: 1px;
    }

    &::before {
      transform: translateY(-.5rem);
    }

    &::after {
      transform: translateY(.5rem);
    }
  }

  ${({enabled}) => enabled && css`
    span {
      background-color: transparent;
      box-shadow: 0 0 0 transparent;

      &::before {
        background-color: #ffffff;
        transform: rotate(-45deg) translateY(0);
        transform-origin: 50% 50% 0;
        box-shadow: 0 0 0 transparent;
      }

      &::after {
        background-color: #ffffff;
        transform: rotate(45deg) translateY(0);
        transform-origin: 50% 50% 0;
        box-shadow: 0 0 0 transparent;
      }
    }
  `}
`;
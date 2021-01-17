import React from "react";
import Background from "./Background/Background";
import Logo from "./Logo/Logo";

const LandingPage = (props:OwnProps) => {

  return (
    <>
      <Logo />
      <Background />
    </>
  )
}

interface OwnProps {}

export default LandingPage;
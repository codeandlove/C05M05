import React from "react";
import {css, Global} from "@emotion/core";
import emotionReset from "emotion-reset";
import SolarModel from "./Apps/SolarModel/SolarModel";
import LandingPage from "./Apps/LandingPage/LandingPage";
import useStore from "./Store/Store";
import "fontsource-titillium-web";

const App = () => {
  const {app} = useStore();

  const renderApp = () => {
    switch (app) {
      case 'landing':
        return <LandingPage />;
      case 'solar':
         return <SolarModel />;
      default:
        return <LandingPage />;
    }
  }

  return (
    <>
      <Global styles={css`
        ${emotionReset}
     
        *, *::after, *::before {
          box-sizing: border-box;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          font-smoothing: antialiased;
        }
        
        html, body, #root {
          background: #000000;
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        body {
          font-family: "Titillium Web", sans-serif;
        }
      `} />
      <>
        {renderApp()}
      </>
    </>
  )
}

export default App;
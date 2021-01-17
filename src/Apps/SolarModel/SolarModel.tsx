import React, {Suspense} from 'react';
import * as THREE from 'three';
import Effects from "./Effects/Effects";
import {Canvas} from 'react-three-fiber';
import useStore from "../../Store/Store";
import SolarSystem from "./Components/SolarSystem/SolarSystem";
import Controls from "./Components/Controls/Controls";
import Camera from "./Components/Camera/Camera";
import Universe from "./Components/Universe/Universe";
import {withControls, Controls as GUIControls} from "react-three-gui";
import Navigation from "../../Componetns/Navigation/Navigation";
import LensFlare from "./Components/LensFlare/LensFlare";
import Helpers from "./Components/Helpers/Helpers";

const AppCanvas = withControls(Canvas);

const Scene = () => {
  const {settings: {godMode}} = useStore();

  return (
    <Suspense fallback={null}>
      <AppCanvas
        invalidateFrameloop
        // @ts-ignore
        onCreated={({gl}) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.setClearColor(new THREE.Color('#000000'));
      }}
      >
        <Camera/>
        <ambientLight intensity={.05}/>
        <Helpers />
        <LensFlare hsl={[.08, .05, .99]} position={[0, 0, 0]} />
        <SolarSystem />
        <Universe radius={10000000}/>
        <Effects/>
        <Controls/>
      </AppCanvas>
    </Suspense>
  );
};


const SolarModel = (props:OwnProps) => {
  return (
    <GUIControls.Provider>
      <Navigation />
      {/*<GUIControls*/}
      {/*  title="react-three-gui"*/}
      {/*  collapsed={true}*/}
      {/*  defaultClosedGroups={['Other', 'Stuff']}*/}
      {/*  width={300} // default 300*/}
      {/*  anchor={'top_left'}*/}
      {/*  // anchor={'top_left' | 'bottom_left' | 'top_right' | 'bottom_right'} // see ControlsAnchor enum*/}
      {/*  style={{*/}
      {/*    'zIndex': 999*/}
      {/*  }} // pass any kind of styles here. Supports @react-spring/web styles.*/}
      {/*/>*/}
      <Scene />
    </GUIControls.Provider>
  )
}

interface OwnProps {}

export default SolarModel;

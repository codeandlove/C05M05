import React, {useEffect, useRef} from "react";
import {useFrame, useThree} from "react-three-fiber";
import constants from "../../../../utils/constants";
import {PerspectiveCamera} from "drei";
import {Vector3} from "three";
import useStore from "../../../../Store/Store";
import { animate } from 'popmotion';
import {getPointInBetweenByLength, getPointInBetweenByPercent} from "../../../../utils/vectors";

const Camera = (props:any) => {
  const camRef:any = useRef();
  const godCamRef:any = useRef();
  const {setDefaultCamera} = useThree();
  const {controls: {target, startPos}, toggleControls, setSettings, settings: {godMode}} = useStore();
  const sunDistance:number = constants.radius.star.sun * 2;
  const earthRadius:number = constants.radius.planet.earth;
  const earthCamOffset:number = 3;
  const lengthToEarth:number = (new Vector3(0,0,0)).distanceTo(startPos) + earthRadius + earthCamOffset;
  const camProps:object = {
    far: 99999999999999
  }

  // Make the camera known to the system
  useEffect(() => {
    void setDefaultCamera(godMode ? godCamRef.current : camRef.current);

    godCamRef.current.position.set(0, 10000, 10000);

    if(godMode) toggleControls(true);

  }, [setDefaultCamera, godMode]);

  //Play intro animation
  useEffect(() => {
    camRef.current.lookAt(new Vector3(0,0,0));
console.log('intro');
    animate({
      to: [
        getPointInBetweenByLength(new Vector3(0,0,0), startPos, lengthToEarth),
        getPointInBetweenByLength(new Vector3(0,0,0), startPos, lengthToEarth + 20).addScaledVector(new Vector3(1, 0, 0), -30),
        getPointInBetweenByLength(new Vector3(0,0,0), startPos, lengthToEarth + 20).addScaledVector(new Vector3(0, 1, 0), 1000),
        getPointInBetweenByLength(new Vector3(0,0,0), startPos, sunDistance).addScaledVector(new Vector3(0, 1, 0), 100000),
      ],
      duration: 3 * 1000,
      onPlay: () => {
        camRef.current.position.set(startPos.x, startPos.y, startPos.z)
      },
      onUpdate: s => {
        camRef.current.position.set(s.x, s.y, s.z);
        camRef.current.lookAt(0, 0, 0);
      },
      onComplete: () => {
        toggleControls(true);
        setSettings({
          showLabels: true
        });
      }
    });
  }, [])

  //Change target
  useEffect(() => {
    if(target) {
      animate({
        to: [
          camRef.current.position,
          // getPointInBetweenByLength(camRef.current.position, target.position, ),
          target.position
        ],
        duration: 5 * 1000,
        onUpdate: s => {
          console.log(s);
          camRef.current.position.set(s.x, s.y, s.z);
        }
      });
    }
  }, [target]);

  useFrame(() => {
    camRef.current.updateMatrixWorld();
    godCamRef.current.updateMatrixWorld();
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault={!godMode}
        name="defaultCamera"
        ref={camRef}
        {...camProps}
        {...props}
      />
      <PerspectiveCamera
        makeDefault={godMode}
        name="godCamera"
        ref={godCamRef}
        {...camProps}
        {...props}
      />
    </>
  )
}
export default Camera;
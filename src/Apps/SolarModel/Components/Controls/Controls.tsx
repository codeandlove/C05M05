import React, {useEffect, useRef, useState} from 'react';
import {TrackballControls, FlyControls} from "drei";
import useStore from "../../../../Store/Store";
import {animate} from "popmotion";

const Controls = (props:OwnProps) => {
  const refFly:any = useRef();
  const refTrack:any = useRef();
  const {controls: {target, enabled}, settings: {flyMode, godMode}} = useStore();
  const [canFallow, setCanFallow] = useState(true);

  useEffect(() => {
    if(canFallow && target) {
      console.log('canFallow');
      //refTrack.current.target = target.position;

      //@ts-ignore
      refTrack.current.minDistance = target.geometry.parameters.radius + 1;
    }
  }, [canFallow]);

  useEffect(() => {
    if(target) {
      setCanFallow(false);

      animate({
        to: [
          refTrack.current.target,
          target.position
        ],
        duration: 2 * 1000,
        onPlay: () => {
          setCanFallow(false);
        },
        onUpdate: s => {
          refTrack.current.target.set(s.x, s.y, s.z);
        },
        onComplete: () => {
          setCanFallow(true);
        }
      });

      //if(!isAnimate){
        //console.log('asd');
        // refTrack.current.target = target.position;
        // //@ts-ignore
        // refTrack.current.minDistance = target.geometry.parameters.radius + 1;
      //}
    }
  }, [target]);

  return flyMode ? (
    <FlyControls
      ref={refFly}
      dragToLook={true}
      movementSpeed={30}
      rollSpeed={10}
    />
  ):(
    <TrackballControls
      ref={refTrack}
      maxDistance={9999999999}
      enabled={enabled}
    />
  );
};

interface OwnProps {}

export default Controls;
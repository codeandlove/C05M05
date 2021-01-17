import React, {useEffect, useRef, useState} from "react";
import {useFrame, useThree} from "react-three-fiber";
import useStore from "../../../../Store/Store";
import {Vector3} from "three";
import Astronomy from "../../../../utils/astronomy";
import {Html} from "drei";
import Label from "../Label/Label";

const CelestialObject = (props: OwnProps) => {
  const {type, name, children, keepVisible} = props;

  const {camera} = useThree();
  const {setTarget, timeFactor, settings: {showLabels}} = useStore();

  const mesh:any = useRef();
  const title:any = useRef();
  const radius:number = Astronomy.getRadius(type, name);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [titlePosition, setTitlePosition] = useState(new Vector3(0,0,0));

  useFrame((state) => {
    if(mesh.current) {
      const elapsedTime = state.clock.getElapsedTime() / 3600 * timeFactor;
      const jde = Astronomy.getJDETime() + elapsedTime;
      const pos = Astronomy.getCurrentXYZ(type, name, jde);
      const rot = Astronomy.getRotation(type, name, jde);
      const visibilityFactor = type === 'moon' ? 150 : 50;

      mesh.current.position.set(pos.x, pos.y, pos.z);
      //mesh.current.rotation.setFromVector3(rot);
      //mesh.current.rotation.x = Math.PI/2;
      setTitlePosition(new Vector3(pos.x, pos.y, pos.z));
      setVisible(camera.position.distanceTo(mesh.current.position) < radius * visibilityFactor);
    }
  });

  useEffect(() => {
    if(active) {
      setTarget(mesh.current);
    }
  }, [active, setTarget]);

  return (
    <>
      <mesh
        {...props}
        ref={mesh}
        onClick={(e) => setActive(!active)}
        visible={keepVisible || visible}
        castShadow
        receiveShadow
      >
        {children}
      </mesh>
      <Html
        position={titlePosition}
        prepend // Project content behind the canvas (default: false)
        center // Adds a -50%/-50% css transform (default: false)
        style={type === 'moon' ? {
            'visibility': (keepVisible || visible) ? 'visible': 'hidden'
          }:{}
        }
      >
        <Label show={showLabels} onClick={(e) => setActive(!active)} name={name.toUpperCase()} />
      </Html>
    </>
  )
}

interface OwnProps {
  children: React.ReactNode,
  // ref?: any,
  objectColor?: string,
  name: string,
  type: string,
  radius?: number | 1,
  keepVisible?: boolean,
  texture?: TextureProps,
  position?: Vector3,
  onClick?: React.EventHandler<any>
}

export default CelestialObject;
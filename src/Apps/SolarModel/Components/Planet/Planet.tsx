import React, {useMemo} from 'react';
import CelestialObject from "../CelestialObject/CelestialObject";
import Astronomy from "../../../../utils/astronomy";
import useStore from "../../../../Store/Store";
import {loadTexture} from "../../../../utils/texture";
import Orbit from "../Orbit/Orbit";
import * as THREE from 'three';
import Atmosphere from "../Atmosphere/Atmosphere";

const Planet = (props: OwnProps) => {
  const {type, name, texture: {mapUrl, bumpUrl, dispUrl}} = props;

  const radius = Astronomy.getRadius(type, name);

  const {settings: {details, showOrbits}, celestialObjects} = useStore();

  const {orbitPoints, objectColor} = celestialObjects.filter(item => item.name === name)[0];

  const [map, bump, disp] = useMemo(() => loadTexture(mapUrl, bumpUrl, dispUrl), [mapUrl, bumpUrl, dispUrl]);

  return (
    <>
      <CelestialObject
        {...props}
      >
        <octahedronBufferGeometry
          attach="geometry"
          args={[radius, details]}
        />
        <meshPhongMaterial
          attach="material"
          displacementScale={-radius/100}
          bumpScale={-radius/100}
          shininess={5}
          emissive={ new THREE.Color( 0x010101 )}
        >
          <primitive attach="map" object={map} />
          <primitive attach="bumpMap" object={bump} />
          <primitive attach="displacementMap" object={disp} />
        </meshPhongMaterial>
        {/*<Atmosphere type={'none'} radius={radius} texture={{mapUrl: './assets/textures/earth/atmosphere_texture.png'}} />*/}
      </CelestialObject>
      {showOrbits && orbitPoints && <Orbit orbitPoints={orbitPoints} orbitColor={objectColor} />}
    </>
  )
}

interface OwnProps {
  name: string,
  type: string,
  texture: TextureProps
}

export default Planet;

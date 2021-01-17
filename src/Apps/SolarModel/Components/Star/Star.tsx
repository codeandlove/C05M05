import React, {useMemo, Suspense} from "react";
import * as THREE from "three";
import CelestialObject from "../CelestialObject/CelestialObject";
import Astronomy from "../../../../utils/astronomy";
import useStore from "../../../../Store/Store";
import {loadShaderTexture} from "../../../../utils/texture";
import {Vector2, Vector3} from "three";
import {useFrame, useResource} from "react-three-fiber";
import {StarShader} from "../../shaders/StarShader";


const Star = (props: OwnProps) => {
  const [matRef, material] = useResource();
  const {type, name, texture: {mapUrl, dispUrl}} = props;

  const radius = Astronomy.getRadius(type, name);

  const {settings: {details}} = useStore();

  const [map, disp] = useMemo(() => loadShaderTexture(mapUrl,  dispUrl), [mapUrl, dispUrl]);

  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  disp.wrapS = disp.wrapT = THREE.RepeatWrapping;

  useFrame(state => {
    if (material) {
      material.uniforms.time.value += 5 * state.clock.getDelta();
      material.uniformsNeedUpdate = true;
    }
  });

  return (
    <Suspense fallback={() => {}}>
      <CelestialObject
        {...props}
      >
        <octahedronBufferGeometry attach="geometry" args={[radius, details]} />
        <shaderMaterial
          attach="material"
          ref={matRef}
          args={[StarShader]}
          uniforms-fogColor-value={new Vector3( 0, 0, 0 )}
          uniforms-fogDensity-value={15}
          uniforms-uvScale-value={new Vector2( 2.0, 1.0 )}
          uniforms-time-value={0}
          uniforms-texture1-value={disp}
          uniforms-texture2-value={map}
        />
      </CelestialObject>
    </Suspense>
  )
}

interface OwnProps {
  name: string,
  type: string,
  texture: TextureProps
}

export default Star;
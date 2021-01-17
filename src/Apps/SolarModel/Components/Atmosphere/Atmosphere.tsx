import React, {useMemo, Suspense, useRef} from "react";
import * as THREE from "three";
import Astronomy from "../../../../utils/astronomy";
import useStore from "../../../../Store/Store";
import {loadTexture} from "../../../../utils/texture";
import {Vector2, Vector3} from "three";
import {useFrame, useResource} from "react-three-fiber";
import {AtmosphereShader} from "../../shaders/AtmosphereShader";

const Atmosphere = (props: OwnProps) => {
  const [matRef, material] = useResource();
  const mesh:any = useRef();
  const {type, radius, texture: {mapUrl, bumpUrl, dispUrl}} = props;

  const {settings: {details}} = useStore();

  const [map, bump, disp] = useMemo(() => loadTexture(mapUrl, bumpUrl, dispUrl), [mapUrl, bumpUrl, dispUrl]);

  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  //disp.wrapS = disp.wrapT = THREE.RepeatWrapping;

  useFrame(state => {
    if (material) {
      material.uniforms.time.value += 5 * state.clock.getDelta();
      material.uniformsNeedUpdate = true;
    }
  });

  return (
    <Suspense fallback={() => {}}>
      <mesh
        {...props}
        ref={mesh}
        // visible={keepVisible || visible}
      >
        <octahedronBufferGeometry attach="geometry" args={[radius+1, details]} />
        {/*<meshBasicMaterial attach="material">*/}
        {/*  <primitive attach="map" object={map} />*/}
        {/*</meshBasicMaterial>*/}
        <shaderMaterial
          attach="material"
          ref={matRef}
          args={[AtmosphereShader]}
          uniforms-fogColor-value={new Vector3( 0, 0, 0 )}
          uniforms-fogDensity-value={5}
          uniforms-uvScale-value={new Vector2( 1.0, 1.0 )}
          uniforms-time-value={0}
          uniforms-texture1-value={map}
          uniforms-texture2-value={map}
        />
      </mesh>
    </Suspense>
  )
}

interface OwnProps {
  type: string,
  radius: number,
  texture: TextureProps
}

export default Atmosphere;
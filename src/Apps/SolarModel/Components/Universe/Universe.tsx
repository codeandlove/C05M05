import React, {useRef, Suspense, useMemo} from "react";
import {BackSide} from "three";
import {loadTexture} from "../../../../utils/texture";

const Universe = (props: OwnProps) => {

  const mesh:any = useRef();
  const {radius} = props;

  const mapUrl = './assets/textures/galaxy/texture.jpg';

  const [map] = useMemo(() => loadTexture(mapUrl), [mapUrl]);

  const DomLoading = (props:any) => {
    return <p>loading...</p>
  }

  return (
    <Suspense fallback={DomLoading}>
      <mesh
        {...props}
        ref={mesh}
        //rotation={[1.5, 0, .5]}
      >
        <octahedronBufferGeometry attach="geometry" args={[radius, 2]} />
        <meshBasicMaterial attach="material" side={BackSide}>
          <primitive attach="map" object={map} />
        </meshBasicMaterial>
      </mesh>
    </Suspense>
  )
}

interface OwnProps {
  radius: number
}

export default Universe;
import React, {useEffect, useMemo, useRef} from 'react';
import * as THREE from 'three';
import {Lensflare as LensFlareThree, LensflareElement} from 'three/examples/jsm/objects/Lensflare';
import {loadLensTexture} from "../../../../utils/texture";

const LensFlare = (props:OwnProps) => {
  const {position, hsl} = props;
  const lightRef:any = useRef();
  let lensFlare:any = null;

  const lensUrl0 = './assets/textures/lensflare/lens_00.png';
  const lensUrl1 = './assets/textures/lensflare/lens_01.png';
  const lensUrl2 = './assets/textures/lensflare/lens_02.png';
  const lensUrl3 = './assets/textures/lensflare/lens_03.png';
  const lensUrl4 = './assets/textures/lensflare/lens_04.png';
  const lensUrl5 = './assets/textures/lensflare/lens_05.png';
  const lensUrl6 = './assets/textures/lensflare/lens_06.png';

  const [
    lens_texture_0,
    lens_texture_1,
    lens_texture_2,
    lens_texture_3,
    lens_texture_4,
    lens_texture_5,
    lens_texture_6
  ] = useMemo(() => loadLensTexture(
    lensUrl0,
    lensUrl1,
    lensUrl2,
    lensUrl3,
    lensUrl4,
    lensUrl5,
    lensUrl6
  ), [lensUrl0, lensUrl1, lensUrl2, lensUrl3, lensUrl4, lensUrl5, lensUrl6]);

  useEffect(() => {
    if(lightRef.current) {
      lightRef.current.color.setHSL(hsl[0], hsl[1], hsl[2]);
      lensFlare = new LensFlareThree();

      const flareColor = new THREE.Color( 0xfff7d8 );

      lensFlare.addElement(new LensflareElement(lens_texture_0, 128, 0, flareColor));
      lensFlare.addElement(new LensflareElement(lens_texture_1, 512, .25, flareColor));
      lensFlare.addElement(new LensflareElement(lens_texture_2, 1024, .30, flareColor));
      lensFlare.addElement(new LensflareElement(lens_texture_3, 1024, 1.4, flareColor));
      lensFlare.addElement(new LensflareElement(lens_texture_4, 128, 1.7, flareColor));
      lensFlare.addElement(new LensflareElement(lens_texture_5, 512, 1.8, flareColor));
      lensFlare.addElement(new LensflareElement(lens_texture_6, 256, 1.3, flareColor));

      lightRef.current.add(lensFlare);
    }
  }, [])

  return (
    <pointLight ref={lightRef} position={position}/>
  );
};

interface OwnProps {
  hsl: [number, number, number],
  position: [number, number, number]
}

export default LensFlare;
import React, {useRef} from 'react';
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { GodRays } from 'react-postprocessing';
import {useThree} from "react-three-fiber";

// @ts-ignore
import { BlendFunction, Resizer, KernelSize } from 'postprocessing';

const EffectsBoost = () => {
  return (
    <EffectComposer>
      {/*<GodRays*/}
      {/*  sun={null}*/}
      {/*  blendFunction={BlendFunction.Screen} // The blend function of this effect.*/}
      {/*  samples={60} // The number of samples per pixel.*/}
      {/*  density={0.96} // The density of the light rays.*/}
      {/*  decay={0.9} // An illumination decay factor.*/}
      {/*  weight={0.4} // A light ray weight factor.*/}
      {/*  exposure={0.6} // A constant attenuation coefficient.*/}
      {/*  clampMax={1} // An upper bound for the saturation of the overall effect.*/}
      {/*  width={Resizer.AUTO_SIZE} // Render width.*/}
      {/*  height={Resizer.AUTO_SIZE} // Render height.*/}
      {/*  kernelSize={KernelSize.SMALL} // The blur kernel size. Has no effect if blur is disabled.*/}
      {/*  blur={2} // Whether the god rays should be blurred to reduce artifacts.*/}
      {/*/>*/}
    </EffectComposer>
  )
}

export default EffectsBoost;
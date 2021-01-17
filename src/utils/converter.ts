// @ts-ignore
import {base} from 'astronomia';

export const lonLatToXYZ = (lon: number, lat:number, range:number) => {
  const s = lon + Math.PI;
  const β = -lat;

  const sincos3 = base.sincos(s),
        ss = sincos3[0],
        cs = sincos3[1];

  const  sincos4 = base.sincos(β),
        sβ = sincos4[0],
        cβ = sincos4[1];

  const  x = range * cβ * cs;
  const  y = range * cβ * ss;
  const  z = range * sβ;
  return {
    x: x,
    y: y,
    z: z
  };
}
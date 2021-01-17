// @ts-ignore
import * as astro from 'astronomia';
import {Vector3} from "three";
import {lonLatToXYZ} from "./converter";
import constants from "./constants";

class Astronomy {

  getJDETime = (time?:Date) => {
    return astro.julian.DateToJDE(time || new Date());
  }

  // Celestial objects radius
  getRadius = (type: string, name:string):number => {
    // @ts-ignore
    return constants.radius[type][name] * constants.scale;
  }

  // Celestial objects xyz
  getCurrentXYZ = (type:string, name:string, time:number):Vector3 => {
    let vector:Vector3 = new Vector3(0,0,0);

    switch(type) {
      case 'star':
        vector = this.getStarXYZ();
        break;
      case 'planet':
        vector = this.getPlanetXYZ(name, time);
        break;
      case 'dwarf':
        vector = this.getDwarfXYZ(name, time);
        break;
      case 'moon':
        vector = this.getMoonXYZ(name, time);
        break;
    }

    return vector.multiplyScalar(constants.scale);

  }

  /* Get Star XYZ Vector */
  /* return Vector3 */
  getStarXYZ = ():Vector3 => {
    return new Vector3(0,0,0);
  }

  /* Get Planet XYZ Vector */
  /* name, time */
  /* return Vector3 */
  getPlanetXYZ = (name:string, time:number):Vector3 => {
    if(!astro.data[name]) return new Vector3(0,0,0);

    const planet = new astro.planetposition.Planet(astro.data[name]);
    const xyz = astro.solarxyz.xyz(planet, time);

    return new Vector3(xyz.x, xyz.y, xyz.z).applyAxisAngle(new Vector3(-1, 0, 0), Math.PI / 2).multiplyScalar(constants.distance.factor);
  }

  /* Get Dwarf planet XYZ Vector */
  /* name, time */
  /* return Vector3 */
  getDwarfXYZ = (name:string, time:number):Vector3 => {
    let data = null;

    if(name === 'pluto') {
      data = astro.pluto.heliocentric(time);
    }
    if(!data) return new Vector3(0,0,0);

    const xyz = lonLatToXYZ(data.lon, data.lat, data.range);

    return new Vector3(xyz.x, xyz.y, xyz.z).applyAxisAngle(new Vector3(-1, 0, 0), Math.PI / 2).multiplyScalar(constants.distance.factor);
  }

  /* Get Moon XYZ Vector */
  /* name, time */
  /* return Vector3 */
  getMoonXYZ = (name:string, time:number):Vector3 => {
    if(name === 'moon') {
      const earthPosition = this.getPlanetXYZ('earth', time);
      const moonPosition = astro.moonposition.position(time);
      const xyz = lonLatToXYZ(moonPosition.lon, moonPosition.lat, moonPosition.ra);

      return new Vector3(earthPosition.x, earthPosition.y, earthPosition.z).add(new Vector3(xyz.x, xyz.y, xyz.z)).addScalar(50);
    }

    return new Vector3(0,0,0);
  }

  // Celestial objects rotation
  getRotation = (type:string, name:string, time:number):Vector3 => {
    if(type==='planet') {
      return this.getPlanetRotation(name, time);
    }

    if(type === 'star') {
      return this.getStarRotation(name, time);
    }

    return new Vector3(0,0,0);
  }

  getPlanetRotation = (name:string, time:number):Vector3 => {
    return new Vector3(0,time/60,0);
  }

  getStarRotation = (name:string, time:number):Vector3 => {
    return new Vector3(0,time/60,0);
  }

  // Celestial object orbit points
  getOrbitPoints = (type: string, name: string, detail: number):any => {
    const d = detail > 1 ? 1 : detail;
    const f = 1.2;
    // @ts-ignore
    const oneYear:number = Math.round(constants.periods[type][name]);
    const divide = Math.round(oneYear * d / f) - 1;
    const factor = oneYear/divide;

    const pointsArray = Array(divide)
      .fill(factor, 0, divide)
      .map((_, idx) => idx * factor);
    pointsArray.push(oneYear - (1/oneYear * 100))
    pointsArray.push(0);

    const calculateOrbit = () => {
      return [...pointsArray].map((day) => {
        const time = this.getJDETime() + day;
        const pos = this.getPlanetXYZ(name, time);
        return [pos.x, pos.y, pos.z];
      })
    }

    const calculateDwarf = () => {
      return [...pointsArray].map((day) => {
        const time = this.getJDETime() + day;
        const pos = this.getDwarfXYZ(name, time);
        return [pos.x, pos.y, pos.z];
      })
    }

    const calculateMoon = () => {
      return [...pointsArray].map((day) => {
        const time = this.getJDETime() + day;
        const pos = this.getMoonXYZ(name, time);
        return [pos.x, pos.y, pos.z];
      })
    }

    switch(type) {
      case 'planet':
        return calculateOrbit();
      case 'dwarf':
        return calculateDwarf();
      case 'moon':
        return calculateMoon();
      default:
        return [0, 0, 0]
    }
  }
}

export default new Astronomy();
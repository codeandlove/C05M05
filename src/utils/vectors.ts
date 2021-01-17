import {Vector3} from "three";

export const getPointInBetweenByLength = (pointA:Vector3, pointB:Vector3, length:number) => {
  const dir = pointB.clone().sub(pointA).normalize().multiplyScalar(length);
  return pointA.clone().add(dir);
}

export const getPointInBetweenByPercent = (pointA:Vector3, pointB:Vector3, percentage:number) => {
  let dir = pointB.clone().sub(pointA);
  const len = dir.length();
  dir = dir.normalize().multiplyScalar(len*percentage);
  return pointA.clone().add(dir);
}
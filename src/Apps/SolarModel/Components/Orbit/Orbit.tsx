import React, {useMemo, useRef} from "react";
import {Line} from "drei";

const Orbit = (props:OwnProps) => {
  const {orbitColor, orbitPoints} = props;
  const line:any = useRef();
  const orbitPointsData = useMemo(() => orbitPoints, [orbitPoints]);

  return (
    <Line
      ref={line}
      points={[...orbitPointsData]}
      position={[0, 0, 0]}
      color={orbitColor || 'white'}
      dashed={false}
    />
  )
}

interface OwnProps {
  orbitPoints: [],
  orbitColor?: string
}

export default Orbit;
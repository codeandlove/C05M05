import React from "react";
import useStore from "../../../../Store/Store";
import Planet from "../Planet/Planet";
import Moon from "../Moon/Moon";
import Star from "../Star/Star";
import Dwarf from "../Dwarf/Dwarf";

const SolarSystem = (props: OwnProps) => {

  const {celestialObjects} = useStore();

  return (
    <>
      {
        celestialObjects.map((objProps, index) => {
          const {type, name} = objProps;

          switch (type) {
            case 'planet':
              return <Planet
                key={`CelestialObject-${name}`}
                {...objProps}
              />
            case 'dwarf':
              return <Dwarf
                key={`CelestialObject-${name}`}
                {...objProps}
              />
            case 'star':
              return <Star
                key={`CelestialObject-${name}`}
                {...objProps}
              />
            case 'moon':
              return <Moon
                key={`CelestialObject-${name}`}
                {...objProps}
              />
            default:
              return null;
          }
        })
      };
    </>
  )
}

interface OwnProps {}

export default SolarSystem;
import React, {useEffect, useState} from 'react';
import {useThree} from "react-three-fiber";
import {Mesh, Camera, PerspectiveCamera, CameraHelper, AxesHelper, GridHelper} from "three";
import useStore from "../../../../Store/Store";

const Helpers = (props: OwnProps) => {
  const {scene} = useThree();
  const size = 1000000;
  const divisions = 10;
  const {settings: {godMode}} = useStore();
  const [helpers, setHelper] = useState<any[]>([]);

  const createHelpers = () => {
    const allHelpers = [];

    //GridHelper
    const gridHelper = new GridHelper( size, divisions );
    scene.add( gridHelper );
    allHelpers.push(gridHelper);

    scene.children.filter(child => child instanceof Mesh).map(mesh => {
      //AxisHelpers
      const axesHelper = new AxesHelper( 5000 );
      mesh.add(axesHelper);

      allHelpers.push(axesHelper);
    });

    scene.children.filter(child => child instanceof PerspectiveCamera).map(camera => {
      //AxisHelpers
      if (camera instanceof Camera) {
        const cameraHelper = new CameraHelper(camera);
        scene.add(cameraHelper);

        allHelpers.push(cameraHelper);
      }
    });

    setHelper(allHelpers);
  }

  const removeHelpers = () => {
    helpers.map(helper => {
      scene.remove(helper);

      scene.children.map(mesh => {
        mesh.remove(helper);
      });
    });

    setHelper([]);
  }

  useEffect(() => {
    godMode ? createHelpers() : removeHelpers();
  }, [godMode]);

  return <></>
};

interface OwnProps {}

export default Helpers;
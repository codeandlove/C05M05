import React, {useCallback} from 'react';
import useStore from "../../Store/Store";
import {Button} from "../../UI";

const Time = () => {
  const {timeFactor, setTimeFactor} = useStore();
  const [time, setTime] = React.useState(0)

  const requestRef:any = React.useRef();
  const previousTimeRef:any = React.useRef();

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;

      setTime(prevTime => (prevTime + deltaTime * 0.01 ) % 100);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  return (
    <>
      <Button onClick={() => setTimeFactor(timeFactor - 1)}>Slower</Button>
      {/*{time}*/}
      <Button onClick={() => setTimeFactor(timeFactor + 1)}>Faster</Button>
    </>
  );
};

export default Time;
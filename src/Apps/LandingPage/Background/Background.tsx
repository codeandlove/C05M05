import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const Background = () => {
  let ref:any = useRef();

  useEffect(() => {
    let canvas:HTMLCanvasElement = ref.current;
    let frameCount = 0;
    let animationFrameId:any;

    if(canvas){
      let G:any = canvas.getContext('2d');

      // Canvas size
      let width:number = window.innerWidth;
      let height:number = window.innerHeight;

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // End of Canvas size

      //Environment settings
      G.globalAlpha = .75;

      //Aliases
      let Rnd = Math.random,
          Floor = Math.floor;

      //Units
      let warpZ = 8,
        units = 1000,
        stars:[] = [],
        cycle = 0,
        Z = .025 + (1/25 * 2);

      // function to reset a star object
      const resetStar = (a:any) => {
        a.x = (Rnd() * width - (width * .5)) * warpZ;
        a.y = (Rnd() * height - (height * .5)) * warpZ;
        a.z = warpZ;
        a.px = 0;
        a.py = 0;
      }

      // initial star setup
      for (let i = 0, n:any; i < units; i++){
        n = {};
        resetStar(n);
        // @ts-ignore
        stars.push(n);
      }

      const draw = (G:any, frameCount:number) => {
        // clear background
        G.fillStyle = "#000000";
        G.fillRect(0, 0, window.innerWidth, window.innerHeight);

        // mouse position to head towards
        let cx = (width / 2),
            cy = (height / 2);

        // update all stars
        let sat = Floor(Z * 500); // Z range 0.01 -> 0.5

        if (sat > 100) sat = 100;

        for (let i = 0; i < units; i++)	{
          let n:any = stars[i], // the star
            xx = n.x / n.z, // star position
            yy = n.y / n.z,
            e = (1 / n.z + 1) * .5; // size i.e. z

          if (n.px !== 0){
            // hsl colour from a sine wave
            G.strokeStyle = "hsl(" + ((cycle * i) % 360) + "," + sat + "%,90%)";
            G.lineWidth = e;
            G.beginPath();
            G.moveTo(xx + cx, yy + cy);
            G.lineTo(n.px + cx, n.py + cy);
            G.stroke();
          }
          // update star position values with new settings
          n.px = xx;
          n.py = yy;
          n.z -= Z;
          // reset when star is out of the view field
          if (n.z < Z || n.px > width || n.py > height){
            // reset star
            resetStar(n);
          }
        }
        // colour cycle sinewave rotation
        cycle += 0.01;
      }

      //Our draw came here
      const render = () => {
        frameCount++;
        draw(G, frameCount);
        animationFrameId = window.requestAnimationFrame(render);
      }

      render();
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }

  }, );

  return (
    <canvas
      ref={ref}
      style={{ width: '100px', height: '100px' }}
    />
  );
};

export default Background;
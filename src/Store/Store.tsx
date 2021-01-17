import create from "zustand";
import {Mesh, Vector3} from "three";
import Astronomy from './../utils/astronomy';

type SingleCelestialObject = {
  name: string,
  type: string,
  texture: TextureProps,
  keepVisible?: boolean,
  orbitPoints?: [],
  objectColor?: string
}

type State = {
  app: AppType,
  drawer: boolean,
  timeFactor: number,
  settings: {
    details: number,
    godMode: boolean,
    flyMode: boolean,
    showOrbits: boolean,
    showLabels: boolean
  },
  controls: {
    enabled: boolean,
    target: Mesh | null,
    startPos: Vector3
  },
  celestialObjects: Array<SingleCelestialObject>,
  setApp: (app:AppType) => void,
  setTimeFactor: (time:number) => void,
  setDrawer: (app:boolean) => void,
  setTarget: (target:Mesh) => void,
  setSettings: (settings:object) => void,
  toggleControls: (val?:boolean) => void
}

const useStore = create<State>(set => ({
  app: 'solar',
  drawer: false,
  timeFactor: 1,
  settings: {
    details: 4,
    godMode: false,
    flyMode: false,
    showOrbits: false,
    showLabels: false
  },
  controls: {
    enabled: false,
    target: null,
    startPos: (Astronomy.getPlanetXYZ('earth', Astronomy.getJDETime()))
  },
  celestialObjects: [
    {
      name: 'sun',
      type: 'star',
      texture: {
        mapUrl: './assets/textures/sun/lavatile.jpg',
        dispUrl: './assets/textures/sun/cloud.png'
      },
      keepVisible: false
    },
    {
      name: 'mercury',
      type: 'planet',
      texture: {
        mapUrl: './assets/textures/mercury/texture.jpg',
        bumpUrl: './assets/textures/mercury/texture.jpg',
        dispUrl: './assets/textures/mercury/texture.jpg'
      },
      orbitPoints: Astronomy.getOrbitPoints('planet', 'mercury', 1),
      objectColor: '#bcb49b'
    },
    {
      name: 'venus',
      type: 'planet',
      texture: {
        mapUrl: './assets/textures/venus/texture.jpg',
        bumpUrl: './assets/textures/venus/texture.jpg',
        dispUrl: './assets/textures/venus/texture.jpg',
      },
      orbitPoints: Astronomy.getOrbitPoints('planet', 'venus', .75),
      objectColor: '#a2825d'
    },
    {
      name: 'earth',
      type: 'planet',
      texture: {
        mapUrl: './assets/textures/earth/texture.jpg',
        bumpUrl: './assets/textures/earth/texture.jpg',
        dispUrl: './assets/textures/earth/texture.jpg'
      },
      orbitPoints: Astronomy.getOrbitPoints('planet', 'earth', .5),
      objectColor: '#61748c'
    },
    {
      name: 'mars',
      type: 'planet',
      texture: {
        mapUrl: './assets/textures/mars/texture.jpg',
        bumpUrl: './assets/textures/mars/texture.jpg',
        dispUrl: './assets/textures/mars/texture.jpg'
      },
      orbitPoints: Astronomy.getOrbitPoints('planet', 'mars', .25),
      objectColor: '#b83c19'
    },
    {
      name: 'jupiter',
      type: 'planet',
      texture: {
        mapUrl: './assets/textures/jupiter/texture.jpg',
        bumpUrl: './assets/textures/jupiter/texture.jpg',
        dispUrl: './assets/textures/jupiter/texture.jpg'
      },
      orbitPoints: Astronomy.getOrbitPoints('planet', 'jupiter', .25),
      objectColor: '#6633ae'
    },
    {
      name: 'saturn',
      type: 'planet',
      texture: {
        mapUrl: './assets/textures/saturn/texture.jpg',
        bumpUrl: './assets/textures/saturn/texture.jpg',
        dispUrl: './assets/textures/saturn/texture.jpg'
      },
      orbitPoints: Astronomy.getOrbitPoints('planet', 'saturn', .15),
      objectColor: '#11e388'
    },
    {
      name: 'uranus',
      type: 'planet',
      texture: {
        mapUrl: './assets/textures/uranus/texture.jpg',
        bumpUrl: './assets/textures/uranus/texture.jpg',
        dispUrl: './assets/textures/uranus/texture.jpg'
      },
      orbitPoints: Astronomy.getOrbitPoints('planet', 'uranus', .15),
      objectColor: '#5d9166'
    },
    {
      name: 'neptune',
      type: 'planet',
      texture: {
        mapUrl: './assets/textures/neptune/texture.jpg',
        bumpUrl: './assets/textures/neptune/texture.jpg',
        dispUrl: './assets/textures/neptune/texture.jpg'
      },
      orbitPoints: Astronomy.getOrbitPoints('planet', 'neptune', .15),
      objectColor: '#19d2a7'
    },
    {
      name: 'pluto',
      type: 'dwarf',
      texture: {
        mapUrl: './assets/textures/pluto/texture.jpg',
        bumpUrl: './assets/textures/pluto/texture.jpg',
        dispUrl: './assets/textures/pluto/texture.jpg'
      },
      orbitPoints: Astronomy.getOrbitPoints('dwarf', 'pluto', .15),
      objectColor: '#196cd2'
    },
    {
      name: 'moon',
      type: 'moon',
      texture: {
        mapUrl: './assets/textures/moon/texture.jpg',
        bumpUrl: './assets/textures/moon/texture.jpg',
        dispUrl: './assets/textures/moon/texture.jpg'
      },
      orbitPoints: Astronomy.getOrbitPoints('moon', 'moon', .1),
      objectColor: '#443d4c'
    }
  ],
  setApp: (app:AppType) => set(state => ({
    app: app
  })),
  setTimeFactor: (timeFactor:number) => set(state => ({
    timeFactor: state.timeFactor + timeFactor
  })),
  setDrawer: (drawer:boolean) => set(state => ({
    drawer: drawer
  })),
  setTarget: (target) => set(state => (state.controls.enabled ? {
    controls: {
      ...state.controls,
      target: target
    }
  }: state )),
  setSettings: (settings: object) => set(state => ({
    settings: {
      ...state.settings,
      ...settings
    }
  })),
  toggleControls: (val) => set(state => ({
    controls: {
      ...state.controls,
      ...{
        enabled: val || !state.controls.enabled
      }
    }
  }))
}))

export default useStore;

//Astronomic Unit
export const AU = 100000;

//Earth Radius
export const ER = 10;

//Earth Year
export const EY = 365.242199;

const constants = {
  scale: 1,
  distance: {
    factor: (109.2983 * ER) + .44 * AU
  },
  radius: {
    star: {
      sun: 109.2983 * ER
    },
    planet: {
      mercury: .38294 * ER,
      venus: .9499 * ER,
      earth: 1 * ER,
      mars: .53202 * ER,
      jupiter: 10.97332 * ER,
      saturn: 9.14017 * ER,
      uranus: 3.98085 * ER,
      neptune: 3.8647 * ER
    },
    dwarf: {
      pluto: .18631 * ER
    },
    moon: {
      moon: .27266 * ER
    }
  },
  periods: {
    planet: {
      mercury: 87.97,
      venus: 224.70096,
      earth: 1 * EY,
      mars: 686.980,
      jupiter: 4332.589,
      saturn: 10759.22,
      uranus: 84.0205 * EY,
      neptune: 164.8905 * EY
    },
    dwarf: {
      pluto: 247.68 * 365.242199
    },
    moon: {
      moon: 365.242199
    }
  }
}

export default constants;
export interface ArrangementProp {
  name: string,
  type?: number,
  pos: [number, number, number],
  scale?: number,
  rotation?: number,
  color?: {
    r: number,
    g: number,
    b: number
  }
}

export interface Arrangement {
  fish: {
    [key: string]: number
  },
  props: Array<ArrangementProp>
}

export const defaultArrangement: Arrangement = {
  fish: {
    guppy: 10,
    angelfish: 3,
    goldfish: 6,
  },
  props: [
    { name: "plant", type: 0, pos: [ 2, -8, 2 ], scale: 1, rotation: Math.PI / 4 },
    { name: "plant", type: 0, pos: [ -3, -9, -5 ], scale: 2, rotation: Math.PI / 4 },
    { name: "plant", type: 0, pos: [ 3, -9, 6 ], scale: 0.6, rotation: 2 * Math.PI / 3 },
    { name: "plant", type: 1, pos: [ 2, -9, 5 ], scale: 2, rotation: Math.PI / 3 },
    { name: "plant", type: 1, pos: [ 7, -9, 1 ], scale: 3, rotation: 2 * Math.PI / 3 },
    { name: "plant", type: 1, pos: [ -5, -9, 5 ], scale: 2.5, rotation: 0 },
    { name: "plant", type: 1, pos: [ -4, -9, -6 ], scale: 4, rotation: Math.PI / 2 },
    { name: "rock", type: 0, pos: [ -2, -9, 1 ], scale: 5, rotation: 0 },
    { name: "rock", type: 1, pos: [ 5, -9, 3 ], scale: 3, rotation: Math.PI / 6 },
    { name: "rock", type: 2, pos: [ 3, -9, -4 ], scale: 3, rotation: Math.PI / 4 },
  ],
}

export const emptyArrangement: Arrangement = {
  fish: {
    guppy: 0,
    angelfish: 0,
    goldfish: 0,
  },
  props: []
}

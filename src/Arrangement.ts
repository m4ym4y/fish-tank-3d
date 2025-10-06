export interface ArrangementProp {
  name: string,
  id: string,
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
    { name: "plant", id: "1996f06d-4522-4f80-9432-b23e4655d868", type: 0, pos: [ 2, -8, 2 ], scale: 1, rotation: Math.PI / 4 },
    { name: "plant", id: "c86fc71a-4123-45c0-af2c-0912b98415ef", type: 0, pos: [ -3, -9, -5 ], scale: 2, rotation: Math.PI / 4 },
    { name: "plant", id: "94b99758-b88b-4da5-8300-679549f9ee63", type: 0, pos: [ 3, -9, 6 ], scale: 0.6, rotation: 2 * Math.PI / 3 },
    { name: "plant", id: "599ce04c-95c3-41c4-ab53-af7c4c139da1", type: 1, pos: [ 2, -9, 5 ], scale: 2, rotation: Math.PI / 3 },
    { name: "plant", id: "46bc7c15-365d-4229-b4f4-8ccd01443fc2", type: 1, pos: [ 7, -9, 1 ], scale: 3, rotation: 2 * Math.PI / 3 },
    { name: "plant", id: "0fd70aee-102f-4685-a859-5047382316e4", type: 1, pos: [ -5, -9, 5 ], scale: 2.5, rotation: 0 },
    { name: "plant", id: "d4a6b409-7c45-4a24-8825-a0fdfb4e0ef4", type: 1, pos: [ -4, -9, -6 ], scale: 4, rotation: Math.PI / 2 },
    { name: "rock", id: "28e1ade7-a7fe-482b-9faf-5d9dd772c3e6", type: 0, pos: [ -2, -9, 1 ], scale: 5, rotation: 0 },
    { name: "rock", id: "8e676c3f-9fd8-4d79-a853-b75aba2eef06", type: 1, pos: [ 5, -9, 3 ], scale: 3, rotation: Math.PI / 6 },
    { name: "rock", id: "b9051543-ae7f-4cdd-9823-1e2438db8f31", type: 2, pos: [ 3, -9, -4 ], scale: 3, rotation: Math.PI / 4 },
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

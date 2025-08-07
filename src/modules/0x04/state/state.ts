import { Vector3 } from "three";

import type { State } from "../types/State.js";

export const state: State = {
  ambientLight: {
    color: 0xffffff,
    intensity: 1,
    on: false,
  },

  groundPlane: {
    color: 0x303030,
    cracks: true,
    height: 150,
    width: 150,
  },

  logicLoop: {
    fixedTimeStep: 1 / 60,
    maximumNumberOfSubsteps: 5,
    time: {
      accumulator: 0,
      lastUpdateTime: 0,
    },
  },

  orbitControls: {
    on: false,
  },

  orthographicCamera: {
    edgeSize: 8,
    far: 1000,
    lookAt: new Vector3(0, 0, 0),
    near: 1,
    position: new Vector3(10, 200, -5),
    renderer: undefined,
  },

  prey: {
    body: { color: "whitesmoke", depth: 0.5, height: 1, width: 0.5 },
    pointer: true,
    position: { x: 0, y: 0, z: 0 },
    rotateTime: 0.3,
    rotating: false,
    rotation: { current: { y: 0 }, target: { y: 0 } },
    //   speed: 4.0,
    //   velocity: { x: 0, y: 0, z: 0 },
  },
};

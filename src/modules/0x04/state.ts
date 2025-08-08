import { Vector3 } from "three";

import type { State } from "./types/State.js";

export const state: State = {
  ambientLightSettings: {
    color: 0xffffff,
    intensity: 1,
    on: false,
  },

  groundPlaneSettings: {
    color: 0x303030,
    cracks: true,
    height: 150,
    width: 150,
  },

  logicLoopSettings: {
    fixedTimeStep: 1 / 60,
    maximumNumberOfSubsteps: 5,
    time: {
      accumulator: 0,
      lastUpdateTime: 0,
    },
  },

  orbitControlsSettings: {
    on: false,
  },

  orthographicCameraSettings: {
    edgeSize: 8,
    far: 1000,
    lookAt: new Vector3(0, 0, 0),
    near: 1,
    position: new Vector3(10, 200, -5),
  },

  prey: {
    body: { color: "whitesmoke", depth: 0.5, height: 1, width: 0.5 },
    pointer: true,
    position: { x: 0, y: 0, z: 0 },
    rotateTime: 0.9,
    rotationTimeAccumulator: 0,
    rotating: false,
    rotation: { current: { y: 0 }, target: { y: 0 } },
    speed: 0.75,
    velocity: { x: 0, y: 0, z: 0 },
  },

  wallsSettings: {
    height: 8,
    material: {
      color: 0x38393f,
      flatShading: true,
      opacity: 0.9,
      shininess: 0,
      specular: 0x000000,
      transparent: true,
      wireframe: false,
    },
  },
};

import type { Settings } from "./types/Settings.js";

export const settings: Settings = {
  ambientLightSettings: {
    color: 0xffffff,
    intensity: 1,
    on: false,
  },

  bruteSettings: {
    body: { color: "firebrick", depth: 0.99, height: 2, width: 0.99 },
    position: {
      current: { x: -1, y: 0, z: -1 },
      previous: { x: -1, y: 0, z: -1 },
    },
    speed: 2,
  },

  groundPlaneSettings: {
    color: 0x303030,
    depth: 7,
    width: 7,
  },

  logicLoopSettings: {
    fixedTimeStep: 1 / 60,
    maximumNumberOfSubsteps: 5,
    time: { accumulator: 0 },
  },

  perspectiveCameraSettings: {
    fov: 75,
    near: 0.1,
    far: 1000,
  },

  preySettings: {
    body: { color: "whitesmoke", depth: 0.5, height: 1, width: 0.5 },
    position: {
      current: { x: 1, y: 0, z: 1 },
      previous: { x: 1, y: 0, z: 1 },
    },
    rotateTime: 0.25,
    speed: 3,
  },

  wallsSettings: {
    height: 8,
    material: {
      alphaTest: 0.1,
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

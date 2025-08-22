import type { Settings } from "./types/Settings.js";

export const settings: Settings = {
  ambientLightSettings: {
    color: 0xffffff,
    intensity: 2,
    on: true,
  },

  groundPlaneSettings: {
    color: 0x303030,
    depth: 101,
    width: 101,
  },

  logicLoopSettings: {
    fixedTimeStep: 1 / 60,
    maximumNumberOfSubsteps: 5,
    time: { accumulator: 0 },
  },

  orthographicCameraSettings: {
    edgeSize: 8,
    far: 1000,
    lookAt: { x: 0, y: 0, z: 0 },
    near: 1,
    position: { x: 10, y: 100, z: -15 },
  },
};

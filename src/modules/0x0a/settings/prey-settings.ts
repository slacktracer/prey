import { Quaternion } from "three";

export const preySettings = {
  characterController: {
    forward: ["x", 1] as const,

    on: true,

    rotating: false,

    rotation: {
      current: { y: 0 },

      target: { y: 0, quaternion: new Quaternion() },

      timeElapsed: 0,

      timeToComplete: 0.5,
    },

    speed: 5,

    velocity: { x: 0, z: 0 },
  },

  physicsSettings: {
    angularDamping: 4,

    backwardForceMultiplier: 10,

    forwardForceMultiplier: 30,

    linearDamping: 2,

    torque: 6,
  },

  position: {
    current: { x: 1, y: 0, z: 1 },

    previous: { x: 1, y: 0, z: 1 },
  },

  renderingSettings: {
    candle: {
      color: 0xffffff,

      decay: 2,

      distance: 8,

      intensity: 40,

      yOffset: 2,
    },

    color: 0x030303,

    depth: 1,

    height: 2,

    width: 1,
  },
};

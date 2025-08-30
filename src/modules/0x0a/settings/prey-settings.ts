export const preySettings = {
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

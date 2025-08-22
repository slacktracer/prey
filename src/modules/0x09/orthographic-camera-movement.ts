import type { OrthographicCameraMovement } from "./types/OrthographicCameraMovement.js";

export const orthographicCameraMovement: OrthographicCameraMovement = {
  getOrthographicCameraPositionDelta(
    { deltaTime, movingThing, orthographicCameraGroupPosition },
  ) {
    const easeOutSpeed = 1 -
      Math.pow(1 - this.speed * deltaTime, 3);

    orthographicCameraMovement.target.x = movingThing.rendering.position.x;

    orthographicCameraMovement.target.z = movingThing.rendering.position.z;

    return {
      x: (movingThing.rendering.position.x -
        orthographicCameraGroupPosition.x) * easeOutSpeed,

      z: (movingThing.rendering.position.z -
        orthographicCameraGroupPosition.z) * easeOutSpeed,
    };
  },

  speed: 0.5,

  target: { x: 0, z: 0 },
};

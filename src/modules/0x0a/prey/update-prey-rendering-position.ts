import { getInterpolatedPosition } from "../common/get-interpolated-position.js";
import type { UpdatePreyRenderingPosition } from "./types/UpdatePreyRenderingPosition.js";

export const updatePreyRenderingPosition: UpdatePreyRenderingPosition = (
  { interpolationFactor, prey },
) => {
  const preyRenderingPosition = getInterpolatedPosition({
    interpolationFactor,

    position: prey.position,
  });

  prey.rendering.position.x = preyRenderingPosition.x;

  prey.rendering.position.z = preyRenderingPosition.z;

  if (prey.characterController.on === false) {
    prey.rendering.quaternion.copy(prey.physics.rigidBody.rotation());
  }
};

import { MathUtils } from "three";

import type { MakeRunAnimationLoop } from "../types/MakeRunAnimationLoop.js";

export const makeRunAnimationLoop: MakeRunAnimationLoop = ({
  brute,
  perspectiveCamera,
  prey,
  renderer,
  scene,
}) =>
({ interpolationFactor }) => {
  const preyPosition = prey.physics.rigidBody.translation();
  // do we need these?
  prey.rendering.position.copy(preyPosition);

  prey.rendering.position.x = MathUtils.lerp(
    prey.position.previous.x,
    prey.position.current.x,
    interpolationFactor,
  );

  prey.rendering.position.z = MathUtils.lerp(
    prey.position.previous.z,
    prey.position.current.z,
    interpolationFactor,
  );

  const brutePosition = brute.physics.rigidBody.translation();
  // do we need these?
  brute.rendering.position.copy(brutePosition);

  brute.rendering.position.x = MathUtils.lerp(
    brute.position.previous.x,
    brute.position.current.x,
    interpolationFactor,
  );

  brute.rendering.position.z = MathUtils.lerp(
    brute.position.previous.z,
    brute.position.current.z,
    interpolationFactor,
  );

  // Attach perspective camera to prey position with an offset
  perspectiveCamera.position.x = prey.rendering.position.x;
  perspectiveCamera.position.y = prey.rendering.position.y + 1.5; // Above prey
  perspectiveCamera.position.z = prey.rendering.position.z;

  // Use smooth rendering rotation with correct coordinate system mapping
  // Prey: rotation.y = 0 → +X, π/2 → -Z, π → -X, 3π/2 → +Z
  const lookAtX = prey.rendering.position.x +
    Math.cos(prey.rendering.rotation.y) * 5;
  const lookAtZ = prey.rendering.position.z +
    (-Math.sin(prey.rendering.rotation.y)) * 5;
  perspectiveCamera.lookAt(lookAtX, prey.rendering.position.y, lookAtZ);

  renderer.render(scene, perspectiveCamera);
};

import { MathUtils } from "three";

import type { MakeRunAnimationLoop } from "../types/MakeRunAnimationLoop.js";

export const makeRunAnimationLoop: MakeRunAnimationLoop = ({
  brute,
  orthographicCamera,
  orthographicCameraGroup,
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

  orthographicCameraGroup.position.x = MathUtils.lerp(
    orthographicCameraGroup.position.x,
    prey.rendering.position.x,
    0.1,
  );

  orthographicCameraGroup.position.z = MathUtils.lerp(
    orthographicCameraGroup.position.z,
    prey.rendering.position.z,
    0.1,
  );

  renderer.render(scene, orthographicCamera);
};

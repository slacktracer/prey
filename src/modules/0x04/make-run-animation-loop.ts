import { MathUtils } from "three";

import type { MakeRunAnimationLoop } from "./types/MakeRunAnimationLoop.js";

export const makeRunAnimationLoop: MakeRunAnimationLoop = ({
  clock,
  controls,
  orthographicCamera,
  orthographicCameraGroup,
  prey,
  renderer,
  scene,
}) =>
() => {
  const blend = 1 - Math.pow(0.5, 5 * clock.getDelta());

  orthographicCameraGroup.position.x = MathUtils.lerp(
    orthographicCameraGroup.position.x,
    prey.rendering.position.x,
    blend,
  );

  orthographicCameraGroup.position.z = MathUtils.lerp(
    orthographicCameraGroup.position.z,
    prey.rendering.position.z,
    blend,
  );

  renderer.render(scene, orthographicCamera);

  if (controls) {
    controls.update();
  }
};

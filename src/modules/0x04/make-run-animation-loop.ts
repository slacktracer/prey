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
  const lagFactor = 3; // extract to state, not sure where yet

  const blend = 1 - Math.pow(0.5, lagFactor * clock.getDelta());

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

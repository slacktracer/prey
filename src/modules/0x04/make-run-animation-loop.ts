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

  const [axis, direction] = prey.forward;

  // extract to state, not sure where yet
  const forwardOffset = 3;

  // There is a way to simplify all this via iterating
  // ["x", "z"] and getting the final offset and
  // updating the camera. I'm sure there is...
  const targetX = prey.rendering.position.x +
    (axis === "x" ? direction * forwardOffset : 0);

  const targetZ = prey.rendering.position.z +
    (axis === "z" ? direction * forwardOffset : 0);

  orthographicCameraGroup.position.x = MathUtils.lerp(
    orthographicCameraGroup.position.x,
    targetX,
    blend,
  );

  orthographicCameraGroup.position.z = MathUtils.lerp(
    orthographicCameraGroup.position.z,
    targetZ,
    blend,
  );

  renderer.render(scene, orthographicCamera);

  if (controls) {
    controls.update();
  }
};

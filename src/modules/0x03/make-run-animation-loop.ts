import { Clock, MathUtils } from "three";

import { getForward } from "../common/get-forward.js";

const clock = new Clock();

export const makeRunAnimationLoop = ({
  cameraSettings,
  controls,
  orthographicCamera,
  orthographicCameraGroup,
  renderer,
  scene,
}) =>
({ prey }) => {
  const deltaTime = clock.getDelta();

  const blend = 1 - Math.pow(0.5, cameraSettings.lag.factor * deltaTime);

  const [axis, direction] = getForward({
    rotation: prey.rendering.rotation.y,
  });

  const targetX = cameraSettings.lag.lookAhead.on
    ? (prey.rendering.position.x +
      (axis === "x" ? direction * cameraSettings.lag.lookAhead.distance : 0))
    : prey.rendering.position.x;

  orthographicCameraGroup.position.x = MathUtils.lerp(
    orthographicCameraGroup.position.x,
    targetX,
    blend,
  );

  const targetZ = cameraSettings.lag.lookAhead.on
    ? (prey.rendering.position.z +
      (axis === "z" ? direction * cameraSettings.lag.lookAhead.distance : 0))
    : prey.rendering.position.z;

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

import { MathUtils } from "three";

import { getForward } from "../common/get-forward";

export const makeRunAnimationLoop = ({
  cameraSettings,
  controls,
  orthographicCamera,
  orthographicCameraGroup,
  renderer,
  scene,
}) =>
({ prey }) => {
  if (cameraSettings.lag.on === true) {
    const [axis, direction] = getForward({
      rotation: prey.rendering.rotation.y,
    });

    orthographicCameraGroup.position.x = MathUtils.lerp(
      orthographicCameraGroup.position.x,
      prey.rendering.position.x + (axis === "x" ? direction * 2 : 0),
      cameraSettings.lag.value,
    );

    orthographicCameraGroup.position.z = MathUtils.lerp(
      orthographicCameraGroup.position.z,
      prey.rendering.position.z + (axis === "z" ? direction * 2 : 0),
      cameraSettings.lag.value,
    );
  } else {
    orthographicCameraGroup.position.x = prey.rendering.position.x;

    orthographicCameraGroup.position.z = prey.rendering.position.z;
  }

  renderer.render(scene, orthographicCamera);

  if (controls) {
    controls.update();
  }
};

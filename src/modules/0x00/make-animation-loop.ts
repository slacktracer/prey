import { MathUtils } from "three";

export const makeAnimationLoop = ({
  controls,
  hopper,
  orthographicCamera,
  orthographicCameraGroup,
  renderer,
  scene,
}) =>
() => {
  orthographicCameraGroup.position.x = MathUtils.lerp(
    orthographicCameraGroup.position.x,
    hopper.rendering.position.x,
    hopper.position.cameraLagFactor,
  );

  orthographicCameraGroup.position.y = MathUtils.lerp(
    orthographicCameraGroup.position.y,
    hopper.rendering.position.y,
    hopper.position.cameraLagFactor,
  );

  orthographicCameraGroup.rotation.z = MathUtils.lerp(
    orthographicCameraGroup.rotation.z,
    hopper.rendering.rotation.z,
    hopper.rotation.cameraLagFactor,
  );

  renderer.render(scene, orthographicCamera);

  if (controls) {
    controls.update();
  }
};

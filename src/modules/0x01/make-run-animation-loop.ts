export const makeRunAnimationLoop = ({
  controls,
  orthographicCamera,
  orthographicCameraGroup,
  renderer,
  scene,
}) =>
({ prey }) => {
  orthographicCameraGroup.position.x = prey.rendering.position.x;

  orthographicCameraGroup.position.z = prey.rendering.position.z;

  renderer.render(scene, orthographicCamera);

  if (controls) {
    controls.update();
  }
};

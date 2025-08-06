export const makeRunAnimationLoop = ({
  controls,
  orthographicCamera,
  renderer,
  scene,
}) =>
() => {
  renderer.render(scene, orthographicCamera);

  if (controls) {
    controls.update();
  }
};

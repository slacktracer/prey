export const makeRunAnimationLoop = ({
  orthographicCamera,
  renderer,
  scene,
}) =>
() => {
  renderer.render(scene, orthographicCamera);
};

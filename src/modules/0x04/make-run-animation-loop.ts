import type { MakeRunAnimationLoop } from "./types/MakeRunAnimationLoop.js";

export const makeRunAnimationLoop: MakeRunAnimationLoop = ({
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

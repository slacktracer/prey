import type { MakeRunAnimationLoop } from "../types/MakeRunAnimationLoop.js";

export const makeRunAnimationLoop: MakeRunAnimationLoop = ({
  orthographicCamera,
  renderer,
  scene,
}) =>
() => {
  renderer.render(scene, orthographicCamera);
};

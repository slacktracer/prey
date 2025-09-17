import { updateOrthographicCameraGroupPosition } from "./camera/update-orthographic-camera-group-position.js";
import { updatePreyRenderingPosition } from "./prey/update-prey-rendering-position.js";
import type { MakeRunAnimationLoop } from "./types/MakeRunAnimationLoop.js";

export const makeRunAnimationLoop: MakeRunAnimationLoop = ({
  orthographicCamera,
  orthographicCameraGroup,
  other,
  prey,
  renderer,
  scene,
}) =>
({ interpolationFactor }) => {
  if (prey) {
    updatePreyRenderingPosition({ interpolationFactor, prey });
  }

  if (other) {
    updatePreyRenderingPosition({ interpolationFactor, prey: other });
  }

  if (prey) {
    updateOrthographicCameraGroupPosition({
      following: prey,
      interpolationFactor: 0.1,
      orthographicCameraGroup,
    });
  }

  renderer.render(scene, orthographicCamera);
};

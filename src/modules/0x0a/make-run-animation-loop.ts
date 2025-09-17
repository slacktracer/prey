import { updateOrthographicCameraGroupPosition } from "./camera/update-orthographic-camera-group-position.js";
import { updatePreyRenderingPosition } from "./prey/update-prey-rendering-position.js";
import type { MakeRunAnimationLoop } from "./types/MakeRunAnimationLoop.js";

export const makeRunAnimationLoop: MakeRunAnimationLoop = ({
  channel,
  isOther,
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

    if (!isOther) {
      channel.emit("chat message", {
        type: "prey-move",
        position: {
          x: prey.rendering.position.x,
          y: prey.rendering.position.y,
          z: prey.rendering.position.z,
        },
      });
    }
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

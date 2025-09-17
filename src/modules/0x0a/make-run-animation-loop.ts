import { updateOrthographicCameraGroupPosition } from "./camera/update-orthographic-camera-group-position.js";
import { updatePreyRenderingPosition } from "./prey/update-prey-rendering-position.js";
import type { MakeRunAnimationLoop } from "./types/MakeRunAnimationLoop.js";

export const makeRunAnimationLoop: MakeRunAnimationLoop = ({
  channel,
  isOther,
  orthographicCamera,
  orthographicCameraGroup,
  other,
  renderer,
  scene,
}) => {
  // let frameCount = 0;

  return ({ interpolationFactor, prey }) => {
    if (prey) {
      updatePreyRenderingPosition({ interpolationFactor, prey: prey });

      if (!isOther) {
        // frameCount++;
        // if (frameCount % 10 === 0) {
        const position = {
          x: prey.rendering.position.x,
          y: prey.rendering.position.y,
          z: prey.rendering.position.z,
        };
        // console.log("Sending prey-move:", position);
        channel.emit("chat message", {
          type: "prey-move",
          position,
        });
        // }
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
};

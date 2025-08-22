import type { MakeRunAnimationLoop } from "../types/MakeRunAnimationLoop.js";

export const makeRunAnimationLoop: MakeRunAnimationLoop = ({
  orthographicCamera,
  orthographicCameraGroup,
  orthographicCameraMovement,
  renderer,
  scene,
}) =>
({ movingThing, deltaTime }) => {
  const { x, z } = orthographicCameraMovement
    .getOrthographicCameraPositionDelta({
      deltaTime,
      movingThing,
      orthographicCameraGroupPosition: orthographicCameraGroup.position,
    });

  orthographicCameraGroup.position.x += x;

  orthographicCameraGroup.position.z += z;

  renderer.render(scene, orthographicCamera);
};

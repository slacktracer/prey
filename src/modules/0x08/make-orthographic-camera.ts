import { Group, OrthographicCamera } from "three";

import { getBottomLeftRightTop } from "../common/get-bottom-left-right-top.js";
import { makeOrthographicCameraResizeHandler } from "../common/make-ortographic-camera-resize-handler.js";
import type { MakeOrthographicCamera } from "./types/MakeOrthographicCamera.js";

export const makeOrthographicCamera: MakeOrthographicCamera = ({
  edgeSize,
  far,
  lookAt,
  near,
  position,
  renderer,
}) => {
  const aspect = window.innerWidth / window.innerHeight;

  const height = edgeSize;

  const width = height * aspect;

  const { bottom, left, right, top } = getBottomLeftRightTop({ height, width });

  const orthographicCamera = new OrthographicCamera(
    left,
    right,
    top,
    bottom,
    near,
    far,
  );

  orthographicCamera.position.set(position.x, position.y, position.z);

  orthographicCamera.lookAt(lookAt.x, lookAt.y, lookAt.z);

  orthographicCamera.updateProjectionMatrix();

  const orthographicCameraGroup = new Group();

  orthographicCameraGroup.add(orthographicCamera);

  window.addEventListener(
    "resize",
    makeOrthographicCameraResizeHandler({
      edgeSize,
      orthographicCamera,
      renderer,
    }),
  );

  return { orthographicCamera, orthographicCameraGroup };
};

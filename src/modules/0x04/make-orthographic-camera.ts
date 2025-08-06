import { OrthographicCamera } from "three";

import type { MakeOrthographicCamera } from "./types/MakeOrthographicCamera.js";

export const makeOrthographicCamera: MakeOrthographicCamera = ({
  edgeSize,
  far,
  getBottomLeftRightTop,
  lookAt,
  makeOrthographicCameraResizeHandler,
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

  orthographicCamera.position.set(...position);

  orthographicCamera.lookAt(lookAt);

  orthographicCamera.updateProjectionMatrix();

  window.addEventListener(
    "resize",
    makeOrthographicCameraResizeHandler({
      edgeSize,
      orthographicCamera,
      renderer,
    }),
  );

  return orthographicCamera;
};

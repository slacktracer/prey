import type { Vector3 } from "three";
import { OrthographicCamera } from "three";

import { getBottomLeftRightTop } from "../common/get-bottom-left-right-top.js";
import { makeOrthographicCameraResizeHandler } from "../common/make-ortographic-camera-resize-handler.js";

export const makeOrthographicCamera = (
  { edgeSize, far, lookAt, near, position, renderer }: {
    edgeSize: number;
    far: number;
    lookAt: Vector3;
    near: number;
    position: Vector3;
    renderer: unknown;
  },
) => {
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

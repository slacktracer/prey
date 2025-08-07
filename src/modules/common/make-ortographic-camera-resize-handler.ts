import { getBottomLeftRightTop } from "./get-bottom-left-right-top.js";
import type { MakeOrthographicCameraResizeHandler } from "./types/MakeOrthographicCameraResizeHandler.js";

export const makeOrthographicCameraResizeHandler:
  MakeOrthographicCameraResizeHandler =
    ({ edgeSize, orthographicCamera, renderer }) => () => {
      const aspect = window.innerWidth / window.innerHeight;

      const height = edgeSize;

      const width = height * aspect;

      const { bottom, left, right, top } = getBottomLeftRightTop({
        height,
        width,
      });

      orthographicCamera.left = left;
      orthographicCamera.right = right;
      orthographicCamera.top = top;
      orthographicCamera.bottom = bottom;

      orthographicCamera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

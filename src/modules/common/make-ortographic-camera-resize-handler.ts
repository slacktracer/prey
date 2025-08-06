import { getBottomLeftRightTop } from "./get-bottom-left-right-top.js";
import type { MakeOrthographicCameraResizeHandler } from "./types/MakeOrthographicCameraResizeHandler.js";

export const makeOrthographicCameraResizeHandler:
  MakeOrthographicCameraResizeHandler =
    ({ edgeSize, orthographicCamera, renderer }) => () => {
      const aspect = window.innerWidth / window.innerHeight;

      const height = edgeSize;

      const width = height * aspect;

      Object.entries(getBottomLeftRightTop({ height, width })).map(
        ([key, value]) => (orthographicCamera[key] = value),
      );

      orthographicCamera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

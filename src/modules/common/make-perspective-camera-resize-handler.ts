import type { MakePerspectiveCameraResizeHandler } from "./types/MakePerspectiveCameraResizeHandler.js";

export const makePerspectiveCameraResizeHandler:
  MakePerspectiveCameraResizeHandler =
    ({ perspectiveCamera, renderer }) => () => {
      perspectiveCamera.aspect = window.innerWidth / window.innerHeight;

      perspectiveCamera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

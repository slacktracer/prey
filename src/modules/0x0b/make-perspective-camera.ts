import { PerspectiveCamera } from "three";

import { makePerspectiveCameraResizeHandler } from "../common/make-perspective-camera-resize-handler.js";
import type { MakePerspectiveCamera } from "./types/MakePerspectiveCamera.js";

export const makePerspectiveCamera: MakePerspectiveCamera = ({
  fov,
  near,
  far,
  renderer,
}) => {
  const aspect = window.innerWidth / window.innerHeight;

  const perspectiveCamera = new PerspectiveCamera(fov, aspect, near, far);

  window.addEventListener(
    "resize",
    makePerspectiveCameraResizeHandler({
      perspectiveCamera,
      renderer,
    }),
  );

  return { perspectiveCamera };
};

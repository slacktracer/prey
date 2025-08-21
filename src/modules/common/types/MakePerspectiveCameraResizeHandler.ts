import type { PerspectiveCamera, WebGLRenderer } from "three";

export type MakePerspectiveCameraResizeHandler = (input: {
  perspectiveCamera: PerspectiveCamera;
  renderer: WebGLRenderer;
}) => () => void;

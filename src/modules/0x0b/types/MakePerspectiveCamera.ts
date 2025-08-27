import type { PerspectiveCamera, WebGLRenderer } from "three";

export type MakePerspectiveCamera = (args: {
  fov: number;
  near: number;
  far: number;
  renderer: WebGLRenderer;
}) => {
  perspectiveCamera: PerspectiveCamera;
};

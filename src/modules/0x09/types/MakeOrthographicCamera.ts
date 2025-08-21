import type { Group, OrthographicCamera, WebGLRenderer } from "three";

export type MakeOrthographicCamera = (input: {
  edgeSize: number;
  far: number;
  lookAt: { x: number; y: number; z: number };
  near: number;
  position: { x: number; y: number; z: number };
  renderer: WebGLRenderer;
}) => {
  orthographicCamera: OrthographicCamera;
  orthographicCameraGroup: Group;
};

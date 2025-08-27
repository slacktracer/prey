import type { Group, OrthographicCamera, Scene, WebGLRenderer } from "three";

export type MakeRunAnimationLoop = (input: {
  orthographicCamera: OrthographicCamera;
  orthographicCameraGroup: Group;
  renderer: WebGLRenderer;
  scene: Scene;
}) => (input: { interpolationFactor: number }) => void;

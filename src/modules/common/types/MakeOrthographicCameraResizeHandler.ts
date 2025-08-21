import type { OrthographicCamera, WebGLRenderer } from "three";

export type MakeOrthographicCameraResizeHandler = (input: {
  edgeSize: number;
  orthographicCamera: OrthographicCamera;
  renderer: WebGLRenderer;
}) => () => void;

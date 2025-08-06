import type { OrthographicCamera } from "three";

export type MakeOrthographicCameraResizeHandler = (input: {
  edgeSize: number;
  orthographicCamera: OrthographicCamera;
  renderer: unknown;
}) => () => void;

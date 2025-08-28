import type { Group, OrthographicCamera, Scene, WebGLRenderer } from "three";

import type { Prey } from "../prey/types/Prey.js";

export type MakeRunAnimationLoop = (input: {
  orthographicCamera: OrthographicCamera;
  orthographicCameraGroup: Group;
  prey: Prey;
  renderer: WebGLRenderer;
  scene: Scene;
}) => (input: { interpolationFactor: number }) => void;

import type { Group, OrthographicCamera, Scene, WebGLRenderer } from "three";

import type { Brute } from "./Brute.js";
import type { Prey } from "./Prey.js";

export type MakeRunAnimationLoop = (input: {
  brute: Brute;
  orthographicCamera: OrthographicCamera;
  orthographicCameraGroup: Group;
  prey: Prey;
  renderer: WebGLRenderer;
  scene: Scene;
}) => (input: { interpolationFactor: number }) => void;

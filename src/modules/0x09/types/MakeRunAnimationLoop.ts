import type { Group, OrthographicCamera, Scene, WebGLRenderer } from "three";

import type { MovingThing } from "../moving-thing/MovingThing.js";
import type { OrthographicCameraMovement } from "./OrthographicCameraMovement.js";

export type MakeRunAnimationLoop = (input: {
  orthographicCamera: OrthographicCamera;
  orthographicCameraGroup: Group;
  orthographicCameraMovement: OrthographicCameraMovement;
  renderer: WebGLRenderer;
  scene: Scene;
}) => (input: { movingThing: MovingThing; deltaTime: number }) => void;

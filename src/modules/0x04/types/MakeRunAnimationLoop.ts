import type {
  Clock,
  Group,
  OrthographicCamera,
  Scene,
  WebGLRenderer,
} from "three";
import type { OrbitControls } from "three/addons/controls/OrbitControls.js";

import type { Prey } from "./Prey";

export type MakeRunAnimationLoop = (input: {
  clock: Clock;
  controls?: OrbitControls;
  orthographicCamera: OrthographicCamera;
  orthographicCameraGroup: Group;
  prey: Prey & { rendering: Group };
  renderer: WebGLRenderer;
  scene: Scene;
}) => () => void;

import type { OrthographicCamera, Scene, WebGLRenderer } from "three";
import type { OrbitControls } from "three/addons/controls/OrbitControls.js";

export type MakeRunAnimationLoop = (input: {
  controls?: OrbitControls;
  orthographicCamera: OrthographicCamera;
  renderer: WebGLRenderer;
  scene: Scene;
}) => () => void;

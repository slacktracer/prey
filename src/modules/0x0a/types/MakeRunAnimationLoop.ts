import type { ClientChannel } from "@geckos.io/client";
import type { Group, OrthographicCamera, Scene, WebGLRenderer } from "three";

import type { Prey } from "../prey/types/Prey.js";

export type MakeRunAnimationLoop = (input: {
  channel: ClientChannel;
  isOther: boolean;
  orthographicCamera: OrthographicCamera;
  orthographicCameraGroup: Group;
  other?: Prey;
  prey?: Prey;
  renderer: WebGLRenderer;
  scene: Scene;
}) => (input: { interpolationFactor: number }) => void;

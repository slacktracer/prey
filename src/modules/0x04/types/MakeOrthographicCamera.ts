import type { OrthographicCamera, Vector3 } from "three";

import type { GetBottomLeftRightTop } from "../../common/types/GetBottomLeftRightTop.js";
import type { MakeOrthographicCameraResizeHandler } from "../../common/types/MakeOrthographicCameraResizeHandler.js";

export type MakeOrthographicCamera = (input: {
  edgeSize: number;
  far: number;
  getBottomLeftRightTop: GetBottomLeftRightTop;
  lookAt: Vector3;
  makeOrthographicCameraResizeHandler: MakeOrthographicCameraResizeHandler;
  near: number;
  position: Vector3;
  renderer: unknown;
}) => OrthographicCamera;

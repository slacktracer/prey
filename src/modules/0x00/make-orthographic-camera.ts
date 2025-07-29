import { OrthographicCamera } from "three";

import { getBottomLeftRightTop } from "../common/get-bottom-left-right-top.js";

export const makeOrthographicCamera = ({ edgeSize }) => {
  const aspect = window.innerWidth / window.innerHeight;

  const height = edgeSize;

  const width = height * aspect;

  const [far, near] = [1000, 1];

  const { bottom, left, right, top } = getBottomLeftRightTop({ height, width });

  const camera = new OrthographicCamera(left, right, top, bottom, near, far);

  camera.position.set(10, -5, 200);
  // camera.position.set(-10, -40, 100);

  camera.up.set(0, 0, 1);

  camera.lookAt(0, 0, 0);

  camera.updateProjectionMatrix();

  return camera;
};

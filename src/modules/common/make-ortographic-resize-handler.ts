import { getBottomLeftRightTop } from "./get-bottom-left-right-top.js";

export const makeOrthographicResizeHandler =
  ({ camera, renderer, edgeSize }) => () => {
    const aspect = window.innerWidth / window.innerHeight;

    const height = edgeSize;

    const width = height * aspect;

    Object.entries(getBottomLeftRightTop({ height, width })).map(
      ([key, value]) => (camera[key] = value),
    );

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };

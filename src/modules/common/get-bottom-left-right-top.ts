import type { GetBottomLeftRightTop } from "./types/GetBottomLeftRightTop.js";

export const getBottomLeftRightTop: GetBottomLeftRightTop = (
  { height, width },
) => ({
  bottom: height / -2,
  left: width / -2,
  right: width / 2,
  top: height / 2,
});

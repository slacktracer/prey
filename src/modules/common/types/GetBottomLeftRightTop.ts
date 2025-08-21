export type GetBottomLeftRightTop = (input: {
  height: number;
  width: number;
}) => {
  bottom: number;
  left: number;
  right: number;
  top: number;
};

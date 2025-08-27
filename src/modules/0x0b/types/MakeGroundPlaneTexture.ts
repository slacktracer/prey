import type { CanvasTexture } from "three";

export type MakeGroundPlaneTexture = ({
  color,
  depth,
  width,
}: {
  color: number;
  depth: number;
  width: number;
}) => CanvasTexture;

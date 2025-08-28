import type { CanvasTexture } from "three";

export type MakeGroundPlaneTexture = (input: {
  color: number;
  depth: number;
  graininess: number;
  tileSide: number;
  width: number;
}) => CanvasTexture;

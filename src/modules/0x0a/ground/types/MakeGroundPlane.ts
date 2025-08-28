import type { Mesh } from "three";

export type MakeGroundPlane = (input: {
  color: number;
  depth: number;
  graininess: number;
  tileSide: number;
  width: number;
}) => Mesh;

import type { Mesh } from "three";

export type MakeGroundPlane = (input: {
  color: number;
  depth: number;
  width: number;
}) => Mesh;

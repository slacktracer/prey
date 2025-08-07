import type { Mesh } from "three";

export type MakePointer = ({
  color,
  depth,
  height,
  width,
}: {
  color: number | string;
  depth: number;
  height: number;
  width: number;
}) => Mesh;

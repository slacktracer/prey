import type { Mesh } from "three";

export type MakeFin = ({
  depth,
  height,
}: {
  depth: number;
  height: number;
}) => Mesh;

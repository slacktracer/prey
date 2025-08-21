import type { Group } from "three";

export type MakeBruteRendering = (params: {
  body: {
    color: number | string;
    depth: number;
    height: number;
    width: number;
  };
}) => Group;

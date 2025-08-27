import type { Group } from "three";

export type MakePreyRendering = (params: {
  body: {
    color: number | string;
    depth: number;
    height: number;
    width: number;
  };
}) => Group;

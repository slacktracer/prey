import type { World } from "@dimforge/rapier3d";
import type { Scene } from "three";

export type AddWallsToScene = (input: {
  height: number;
  map: number[][];
  material: {
    color: number;
    flatShading: boolean;
    shininess: number;
    specular: number;
  };
  scene: Scene;
  world: World;
}) => void;

import type { World } from "@dimforge/rapier3d";
import type { Scene } from "three";

export type AddWallsToScene = (input: {
  height: number;
  map: number[][];
  material: {
    color: number;
    flatShading: boolean;
    opacity: number;
    shininess: number;
    specular: number;
    transparent: boolean;
    wireframe: boolean;
  };
  scene: Scene;
  world: World;
}) => void;

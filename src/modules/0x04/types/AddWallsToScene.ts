import type { Scene } from "three";

export type AddWallsToScene = (input: {
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
  wallHeight: number;
}) => void;

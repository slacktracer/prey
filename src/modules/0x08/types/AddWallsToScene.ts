import type { World } from "@dimforge/rapier3d";
import type { Scene } from "three";

import type { ColliderDescriptorStaticMethods } from "./ColliderDescriptorStaticMethods.js";
import type { RigidBodyDescriptorStaticMethods } from "./RigidBodyDescriptorStaticMethods.js";

export type AddWallsToScene = (input: {
  ColliderDesc: ColliderDescriptorStaticMethods;
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
  RigidBodyDesc: RigidBodyDescriptorStaticMethods;
  scene: Scene;
  world: World;
}) => void;

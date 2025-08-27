import type {
  Collider,
  KinematicCharacterController,
  RigidBody,
  World,
} from "@dimforge/rapier3d";

import type { ColliderDescriptorStaticMethods } from "./ColliderDescriptorStaticMethods.js";
import type { RigidBodyDescriptorStaticMethods } from "./RigidBodyDescriptorStaticMethods.js";

export type MakePreyPhysics = (input: {
  body: {
    width: number;
    height: number;
    depth: number;
  };
  ColliderDesc: ColliderDescriptorStaticMethods;
  position: {
    current: { x: number; y: number; z: number };
  };
  RigidBodyDesc: RigidBodyDescriptorStaticMethods;
  world: World;
}) => {
  characterController: KinematicCharacterController;
  collider: Collider;
  rigidBody: RigidBody;
};

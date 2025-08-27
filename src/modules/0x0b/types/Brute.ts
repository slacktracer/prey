import type {
  Collider,
  KinematicCharacterController,
  RigidBody,
} from "@dimforge/rapier3d";
import type { Group } from "three";

export type Brute = {
  body: {
    color: number | string;
    depth: number;
    height: number;
    width: number;
  };

  physics: {
    characterController: KinematicCharacterController;
    collider: Collider;
    rigidBody: RigidBody;
  };

  position: {
    current: { x: number; y: number; z: number };
    previous: { x: number; y: number; z: number };
  };

  rendering: Group;

  speed: number;
};

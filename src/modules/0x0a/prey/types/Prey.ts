import type {
  Collider,
  KinematicCharacterController,
  RigidBody,
} from "@dimforge/rapier3d";
import type { Group } from "three";

export type Prey = {
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
};

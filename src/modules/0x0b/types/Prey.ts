import type {
  Collider,
  KinematicCharacterController,
  RigidBody,
} from "@dimforge/rapier3d";
import type { Group } from "three";

export type Prey = {
  body: {
    color: number | string;
    depth: number;
    height: number;
    width: number;
  };

  forward: readonly ["x" | "z", -1 | 1];

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

  rotateTime: number;

  rotating: boolean;

  rotationTimeAccumulator: number;

  rotation: {
    current: { y: number };
    target: { y: number };
  };

  speed: number;

  velocity: { x: number; z: number };
};

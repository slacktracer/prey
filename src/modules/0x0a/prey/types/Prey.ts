import type {
  Collider,
  KinematicCharacterController,
  RigidBody,
} from "@dimforge/rapier3d";
import type { Group } from "three";

import type { preyCommands } from "../prey-commands.js";

export type Prey = {
  characterController: {
    forward: readonly ["x" | "z", -1 | 1];
    on: boolean;
    rotating: boolean;
    rotation: {
      current: { y: number };
      target: { y: number };
      timeElapsed: number;
      timeToComplete: number;
    };
    speed: number;
    velocity: { x: number; z: number };
  };
  commands: typeof preyCommands;
  physics: {
    characterController: KinematicCharacterController;
    collider: Collider;
    rigidBody: RigidBody;
  };
  physicsSettings: {
    angularDamping: number;
    backwardForceMultiplier: number;
    forwardForceMultiplier: number;
    linearDamping: number;
    torque: number;
  };
  position: {
    current: { x: number; y: number; z: number };
    previous: { x: number; y: number; z: number };
  };
  rendering: Group;
};

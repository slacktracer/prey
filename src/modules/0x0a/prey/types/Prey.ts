import type {
  Collider,
  KinematicCharacterController,
  RigidBody,
} from "@dimforge/rapier3d";
import type { Group } from "three";

import type { preyCommands } from "../prey-commands.js";

export type Prey = {
  commands: typeof preyCommands;
  physics: {
    characterController: KinematicCharacterController;
    collider: Collider;
    rigidBody: RigidBody;
  };
  physicsSettings: {
    angularDamping: number;
    forceMultiplier: number;
    linearDamping: number;
    torque: number;
  };
  position: {
    current: { x: number; y: number; z: number };
    previous: { x: number; y: number; z: number };
  };
  rendering: Group;
};

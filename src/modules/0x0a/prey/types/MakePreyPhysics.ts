import type {
  Collider,
  KinematicCharacterController,
  RigidBody,
  World,
} from "@dimforge/rapier3d";

import type { Prey } from "./Prey.js";

export type MakePreyPhysics = (
  input: Pick<Prey, "physicsSettings" | "position"> & {
    renderingSettings: {
      depth: number;
      height: number;
      width: number;
    };
    world: World;
  },
) => Promise<{
  characterController: KinematicCharacterController;
  collider: Collider;
  rigidBody: RigidBody;
}>;

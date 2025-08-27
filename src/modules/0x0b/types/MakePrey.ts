import type { World } from "@dimforge/rapier3d";

import type { ColliderDescriptorStaticMethods } from "./ColliderDescriptorStaticMethods.js";
import type { Prey } from "./Prey.js";
import type { PreySettings } from "./PreySettings.js";
import type { RigidBodyDescriptorStaticMethods } from "./RigidBodyDescriptorStaticMethods.js";

export type MakePrey = (
  input: PreySettings & {
    ColliderDesc: ColliderDescriptorStaticMethods;
    RigidBodyDesc: RigidBodyDescriptorStaticMethods;
    world: World;
  },
) => Prey;

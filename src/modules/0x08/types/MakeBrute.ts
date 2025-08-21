import type { World } from "@dimforge/rapier3d";

import type { Brute } from "./Brute.js";
import type { BruteSettings } from "./BruteSettings.js";
import type { ColliderDescriptorStaticMethods } from "./ColliderDescriptorStaticMethods.js";
import type { RigidBodyDescriptorStaticMethods } from "./RigidBodyDescriptorStaticMethods.js";

export type MakeBrute = (
  input: BruteSettings & {
    ColliderDesc: ColliderDescriptorStaticMethods;
    RigidBodyDesc: RigidBodyDescriptorStaticMethods;
    world: World;
  },
) => Brute;

import type { ColliderDesc } from "@dimforge/rapier3d";

export type ColliderDescriptorStaticMethods = {
  cuboid: (hx: number, hy: number, hz: number) => ColliderDesc;
};

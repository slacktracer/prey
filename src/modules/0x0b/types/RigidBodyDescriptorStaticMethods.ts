import type { RigidBodyDesc } from "@dimforge/rapier3d";

export type RigidBodyDescriptorStaticMethods = {
  dynamic: () => RigidBodyDesc & {
    setCanSleep: (canSleep: boolean) => RigidBodyDesc;
    setLinearDamping: (damping: number) => RigidBodyDesc;
    setTranslation: (x: number, y: number, z: number) => RigidBodyDesc;
  };
  fixed: () => RigidBodyDesc & {
    setTranslation: (x: number, y: number, z: number) => RigidBodyDesc;
  };
  kinematicPositionBased: () => RigidBodyDesc & {
    setCanSleep: (canSleep: boolean) => RigidBodyDesc;
    setLinearDamping: (damping: number) => RigidBodyDesc;
    setTranslation: (x: number, y: number, z: number) => RigidBodyDesc;
  };
};

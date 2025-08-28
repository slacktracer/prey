import type {
  Collider,
  KinematicCharacterController,
  RigidBody,
  World,
} from "@dimforge/rapier3d";

export type MakePreyPhysics = (input: {
  position: {
    current: {
      x: number;
      y: number;
      z: number;
    };
  };
  renderingSettings: {
    depth: number;
    height: number;
    width: number;
  };
  world: World;
}) => Promise<{
  characterController: KinematicCharacterController;
  collider: Collider;
  rigidBody: RigidBody;
}>;

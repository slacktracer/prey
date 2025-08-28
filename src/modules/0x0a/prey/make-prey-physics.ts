import type { MakePreyPhysics } from "./types/MakePreyPhysics.js";

export const makePreyPhysics: MakePreyPhysics = async ({
  physicsSettings,
  position,
  renderingSettings,
  world,
}) => {
  const characterController = world.createCharacterController(0.01);

  const {
    ColliderDesc,
    RigidBodyDesc,
  } = await import(
    "@dimforge/rapier3d"
  );

  const rigidBodyDescriptor = RigidBodyDesc.dynamic()
    .enabledRotations(false, true, false)
    .enabledTranslations(true, false, true)
    .setAngularDamping(physicsSettings.angularDamping)
    .setLinearDamping(physicsSettings.linearDamping)
    .setTranslation(position.current.x, position.current.y, position.current.z);

  const rigidBody = world.createRigidBody(rigidBodyDescriptor);

  const colliderDesc = ColliderDesc.cuboid(
    renderingSettings.width / 2,
    renderingSettings.height / 2,
    renderingSettings.depth / 2,
  );

  const collider = world.createCollider(colliderDesc, rigidBody);

  return { characterController, collider, rigidBody };
};

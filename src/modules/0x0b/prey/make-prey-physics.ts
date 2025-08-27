import type { MakePreyPhysics } from "../types/MakePreyPhysics.js";

export const makePreyPhysics: MakePreyPhysics = ({
  body,
  ColliderDesc,
  position,
  RigidBodyDesc,
  world,
}) => {
  const characterController = world.createCharacterController(0.01);

  const rigidBodyDescriptor = RigidBodyDesc.dynamic()
    .setTranslation(position.current.x, position.current.y, position.current.z);

  const rigidBody = world.createRigidBody(rigidBodyDescriptor);

  const colliderDesc = ColliderDesc.cuboid(
    body.width / 2,
    body.height / 2,
    body.depth / 2,
  );

  const collider = world.createCollider(colliderDesc, rigidBody);

  return { characterController, collider, rigidBody };
};

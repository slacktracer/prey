import type { UpdatePreyPhysics } from "../../types/UpdatePreyPhysics.js";

export const updatePreyPhysics: UpdatePreyPhysics = (
  { commands, deltaTime, prey },
) => {
  const [axis, direction] = prey.characterController.forward;

  const forward = {
    x: axis === "x" ? direction : 0,
    z: axis === "z" ? direction : 0,
  };

  if (commands.includes(prey.commands.forward)) {
    prey.characterController.velocity.x = forward.x *
      prey.characterController.speed;
    prey.characterController.velocity.z = forward.z *
      prey.characterController.speed;
  } else {
    prey.characterController.velocity.x = 0;
    prey.characterController.velocity.z = 0;
  }

  const desiredTranslationDelta = {
    x: prey.characterController.velocity.x * deltaTime,
    y: 0,
    z: prey.characterController.velocity.z * deltaTime,
  };

  prey.physics.characterController.computeColliderMovement(
    prey.physics.collider,
    desiredTranslationDelta,
  );

  const computedMovement = prey.physics.characterController.computedMovement();

  const translation = prey.physics.rigidBody.translation();

  prey.physics.rigidBody.setTranslation({
    x: translation.x + computedMovement.x,
    y: translation.y + computedMovement.y,
    z: translation.z + computedMovement.z,
  }, true);
};

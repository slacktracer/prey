import { MathUtils } from "three";

import { getForward } from "../../../../common/get-forward.js";
import type { UpdatePreyPhysics } from "../../types/UpdatePreyPhysics.js";

export const updatePreyPhysics: UpdatePreyPhysics = (
  { commands, deltaTime, prey },
) => {
  if (prey.characterController.rotating === false) {
    if (commands.includes(prey.commands.backward)) {
      prey.characterController.rotating = true;

      prey.characterController.rotation.timeElapsed = 0;

      const rotationQuaternion = prey.physics.rigidBody.rotation();

      const yRotation = Math.atan2(
        2 * (rotationQuaternion.w * rotationQuaternion.y),
        1 - 2 * (rotationQuaternion.y * rotationQuaternion.y),
      );

      prey.characterController.rotation.target.y = yRotation + Math.PI;
    }

    if (commands.includes(prey.commands.left)) {
      prey.characterController.rotating = true;

      prey.characterController.rotation.timeElapsed = 0;

      const rotationQuaternion = prey.physics.rigidBody.rotation();

      const yRotation = Math.atan2(
        2 * (rotationQuaternion.w * rotationQuaternion.y),
        1 - 2 * (rotationQuaternion.y * rotationQuaternion.y),
      );

      prey.characterController.rotation.target.y = yRotation + Math.PI / 2;
    }

    if (commands.includes(prey.commands.right)) {
      prey.characterController.rotating = true;

      prey.characterController.rotation.timeElapsed = 0;

      const rotationQuaternion = prey.physics.rigidBody.rotation();

      const yRotation = Math.atan2(
        2 * (rotationQuaternion.w * rotationQuaternion.y),
        1 - 2 * (rotationQuaternion.y * rotationQuaternion.y),
      );

      prey.characterController.rotation.target.y = yRotation - Math.PI / 2;
    }
  }

  if (prey.characterController.rotating) {
    prey.characterController.rotation.timeElapsed += deltaTime;

    const rotatingProgress = Math.min(
      1,
      prey.characterController.rotation.timeElapsed /
        prey.characterController.rotation.timeToComplete,
    );

    const interpolatedRotation = MathUtils.lerp(
      prey.characterController.rotation.current.y,
      prey.characterController.rotation.target.y,
      rotatingProgress,
    );

    // because quaternion
    const halfYRotation = interpolatedRotation * 0.5;

    prey.physics.rigidBody.setRotation({
      x: 0,
      y: Math.sin(halfYRotation),
      z: 0,
      w: Math.cos(halfYRotation),
    }, true);

    if (rotatingProgress >= 1) {
      prey.characterController.rotating = false;

      prey.characterController.rotation.current.y =
        prey.characterController.rotation.target.y;

      prey.characterController.forward = getForward({
        rotation: prey.characterController.rotation.current.y,
      });
    }
  }

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

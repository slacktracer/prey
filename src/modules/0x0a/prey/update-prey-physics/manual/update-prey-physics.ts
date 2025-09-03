import type { RigidBody } from "@dimforge/rapier3d";
import { Quaternion } from "three";

import { getForward } from "../../../../common/get-forward.js";
import type { UpdatePreyPhysics } from "../../types/UpdatePreyPhysics.js";

const getCurrentQuaternion = (rigidBody: RigidBody): Quaternion => {
  const currentRotation = rigidBody.rotation();

  return new Quaternion(
    currentRotation.x,
    currentRotation.y,
    currentRotation.z,
    currentRotation.w,
  );
};

const getRotatedQuaternion = (
  rigidBody: RigidBody,
  angleY: number,
): Quaternion => {
  const currentQuaternion = getCurrentQuaternion(rigidBody);

  return currentQuaternion.multiply(
    new Quaternion().setFromAxisAngle({ x: 0, y: 1, z: 0 }, angleY),
  );
};

export const updatePreyPhysics: UpdatePreyPhysics = (
  { commands, deltaTime, prey },
) => {
  if (prey.characterController.rotating === false) {
    if (commands.includes(prey.commands.backward)) {
      prey.characterController.rotating = true;

      prey.characterController.rotation.timeElapsed = 0;

      prey.characterController.rotation.target.quaternion =
        getRotatedQuaternion(
          prey.physics.rigidBody,
          Math.PI,
        );
    }

    if (commands.includes(prey.commands.left)) {
      prey.characterController.rotating = true;

      prey.characterController.rotation.timeElapsed = 0;

      prey.characterController.rotation.target.quaternion =
        getRotatedQuaternion(
          prey.physics.rigidBody,
          Math.PI / 2,
        );
    }

    if (commands.includes(prey.commands.right)) {
      prey.characterController.rotating = true;

      prey.characterController.rotation.timeElapsed = 0;

      prey.characterController.rotation.target.quaternion =
        getRotatedQuaternion(
          prey.physics.rigidBody,
          -Math.PI / 2,
        );
    }
  }

  if (prey.characterController.rotating === true) {
    prey.characterController.rotation.timeElapsed += deltaTime;

    const rotatingProgress = Math.min(
      1,
      prey.characterController.rotation.timeElapsed /
        prey.characterController.rotation.timeToComplete,
    );

    const currentQuaternion = getCurrentQuaternion(prey.physics.rigidBody);

    const interpolatedQuaternion = currentQuaternion.slerp(
      prey.characterController.rotation.target.quaternion,
      rotatingProgress,
    );

    prey.physics.rigidBody.setRotation({
      x: interpolatedQuaternion.x,
      y: interpolatedQuaternion.y,
      z: interpolatedQuaternion.z,
      w: interpolatedQuaternion.w,
    }, true);

    const currentYRotation = Math.atan2(
      2 * (interpolatedQuaternion.w * interpolatedQuaternion.y),
      1 - 2 * (interpolatedQuaternion.y * interpolatedQuaternion.y),
    );

    if (rotatingProgress >= 1) {
      prey.characterController.rotating = false;

      prey.characterController.rotation.current.y = currentYRotation;

      prey.characterController.forward = getForward({
        rotation: currentYRotation,
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

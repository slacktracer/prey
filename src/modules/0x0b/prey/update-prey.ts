import { MathUtils } from "three";

import { getForward } from "../../common/get-forward.js";
import type { UpdatePrey } from "../types/UpdatePrey.js";

export const updatePrey: UpdatePrey = (
  { commands, deltaTime, prey, preyCommands },
) => {
  if (prey.rotating === false) {
    if (commands.includes(preyCommands.backward)) {
      prey.rotating = true;

      prey.rotationTimeAccumulator = 0;

      prey.rotation.target.y = prey.rendering.rotation.y + Math.PI;
    }

    if (commands.includes(preyCommands.left)) {
      prey.rotating = true;

      prey.rotationTimeAccumulator = 0;

      prey.rotation.target.y = prey.rendering.rotation.y + Math.PI / 2;
    }

    if (commands.includes(preyCommands.right)) {
      prey.rotating = true;

      prey.rotationTimeAccumulator = 0;

      prey.rotation.target.y = prey.rendering.rotation.y - Math.PI / 2;
    }
  }

  if (prey.rotating) {
    prey.rotationTimeAccumulator += deltaTime;

    const rotatingProgress = Math.min(
      1,
      prey.rotationTimeAccumulator / prey.rotateTime,
    );

    prey.rendering.rotation.y = MathUtils.lerp(
      prey.rotation.current.y,
      prey.rotation.target.y,
      rotatingProgress,
    );

    if (rotatingProgress >= 1) {
      prey.rotating = false;

      prey.rotation.current.y = prey.rotation.target.y;

      prey.forward = getForward({
        rotation: prey.rotation.current.y,
      });
    }
  }

  const [axis, direction] = prey.forward;

  const forward = {
    x: axis === "x" ? direction : 0,
    z: axis === "z" ? direction : 0,
  };

  if (commands.includes(preyCommands.forward)) {
    prey.velocity.x = forward.x * prey.speed;
    prey.velocity.z = forward.z * prey.speed;
  } else {
    prey.velocity.x = 0;
    prey.velocity.z = 0;
  }

  const desiredTranslationDelta = {
    x: prey.velocity.x * deltaTime,
    y: 0,
    z: prey.velocity.z * deltaTime,
  };

  prey.physics.characterController.computeColliderMovement(
    prey.physics.collider,
    desiredTranslationDelta,
  );

  const correctedMovement = prey.physics.characterController.computedMovement();

  prey.position.previous.x = prey.position.current.x;
  prey.position.previous.z = prey.position.current.z;

  prey.position.current.x += correctedMovement.x;
  prey.position.current.z += correctedMovement.z;

  prey.physics.rigidBody.setTranslation({
    x: prey.position.current.x,
    y: prey.position.current.y,
    z: prey.position.current.z,
  }, true);
};

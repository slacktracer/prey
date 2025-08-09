import { MathUtils } from "three";

import { getForward } from "../../common/get-forward.js";
import type { UpdatePrey } from "../types/UpdatePrey.js";

export const updatePrey: UpdatePrey = (
  { commands, deltaTime, map, prey, preyCommands },
) => {
  if (prey.caught) {
    prey.rendering.children[0].material.color.setHex(0x000000);
    prey.rendering.children[0].material.needsUpdate = true;
    return;
  }

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
    }
  }

  prey.forward = getForward({
    rotation: prey.rendering.rotation.y,
  });

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

  const mapXOffset = map[0].length / 2 - 0.5;

  const mapZOffset = map.length / 2 - 0.5;

  const currentForwardVelocitySign = Math.sign(prey.velocity[axis]);

  const bodyOffset = currentForwardVelocitySign * prey.body.width / 2;

  const targetPosition = {
    x: prey.position.x + prey.velocity.x * deltaTime,
    z: prey.position.z + prey.velocity.z * deltaTime,
  };

  const mapX = Math.round(targetPosition.x + bodyOffset) + mapXOffset;
  const mapZ = Math.round(targetPosition.z + bodyOffset) + mapZOffset;

  if (map[mapZ] && map[mapZ][mapX] === 1) {
    return;
  }

  prey.position.x = targetPosition.x;
  prey.position.z = targetPosition.z;

  prey.rendering.position.x = prey.position.x;
  prey.rendering.position.y = prey.position.y;
  prey.rendering.position.z = prey.position.z;
};

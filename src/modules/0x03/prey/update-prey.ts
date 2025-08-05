import { Clock, MathUtils } from "three";

import { getForward } from "../../common/get-forward.js";
import { checkCollision } from "./check-collision.js";

let rotatingClock = new Clock(false);

export const updatePrey = (
  { commands, map, prey, preyCommands },
  deltaTime,
) => {
  const dt = deltaTime / 1000; // Convert to seconds

  // Handle rotation input (cardinal directions only)
  if (prey.rotating === false) {
    if (commands.includes(preyCommands.backward)) {
      prey.rotating = true;
      prey.rotation.target.y = prey.rendering.rotation.y + Math.PI;
      rotatingClock = new Clock();
      rotatingClock.start();
    }

    if (commands.includes(preyCommands.left)) {
      prey.rotating = true;
      prey.rotation.target.y = prey.rendering.rotation.y + Math.PI / 2;
      rotatingClock = new Clock();
      rotatingClock.start();
    }

    if (commands.includes(preyCommands.right)) {
      prey.rotating = true;
      prey.rotation.target.y = prey.rendering.rotation.y - Math.PI / 2;
      rotatingClock = new Clock();
      rotatingClock.start();
    }
  }

  // Handle movement input
  let moveInput = 0;
  if (commands.includes(preyCommands.forward)) {
    moveInput += 1;
  }
  // Note: backward only rotates, doesn't move (like original system)

  // Calculate movement direction using the same logic as the original system
  const [axis, direction] = getForward({
    rotation: prey.rendering.rotation.y,
  });

  const forward = {
    x: axis === "x" ? direction : 0,
    z: axis === "z" ? direction : 0,
  };

  // Calculate intended new position
  const newVelocity = {
    x: forward.x * moveInput * prey.speed,
    z: forward.z * moveInput * prey.speed,
  };

  const newPosition = {
    x: prey.position.x + newVelocity.x * dt,
    y: prey.position.y,
    z: prey.position.z + newVelocity.z * dt,
  };

  // Check collision and update position accordingly
  if (!checkCollision({ map, position: newPosition })) {
    // No collision, move normally
    prey.velocity.x = newVelocity.x;
    prey.velocity.z = newVelocity.z;
    prey.position.x = newPosition.x;
    prey.position.z = newPosition.z;
  } else {
    // Collision detected, try sliding along walls

    // Try moving only along X axis
    const newPositionX = {
      x: prey.position.x + newVelocity.x * dt,
      y: prey.position.y,
      z: prey.position.z,
    };

    if (!checkCollision({ map, position: newPositionX })) {
      // Can slide along X
      prey.velocity.x = newVelocity.x;
      prey.velocity.z = 0;
      prey.position.x = newPositionX.x;
    } else {
      // Try moving only along Z axis
      const newPositionZ = {
        x: prey.position.x,
        y: prey.position.y,
        z: prey.position.z + newVelocity.z * dt,
      };

      if (!checkCollision({ map, position: newPositionZ })) {
        // Can slide along Z
        prey.velocity.x = 0;
        prey.velocity.z = newVelocity.z;
        prey.position.z = newPositionZ.z;
      } else {
        // Can't move at all, stop
        prey.velocity.x = 0;
        prey.velocity.z = 0;
      }
    }
  }

  // Handle rotation interpolation
  if (prey.rotating) {
    if (!rotatingClock.running) {
      rotatingClock.start();
    }

    const rotatingProgress = Math.min(
      1,
      rotatingClock.getElapsedTime() / prey.rotateTime,
    );

    prey.rendering.rotation.y = MathUtils.lerp(
      prey.rotation.current.y,
      prey.rotation.target.y,
      rotatingProgress,
    );

    if (rotatingProgress >= 1) {
      prey.rotating = false;
      prey.rotation.current.y = prey.rotation.target.y;
      rotatingClock.stop();
      rotatingClock = new Clock(false);
    }
  }

  // Update rendering position
  prey.rendering.position.x = prey.position.x;
  prey.rendering.position.y = prey.position.y;
  prey.rendering.position.z = prey.position.z;
};

import { Clock, MathUtils } from "three";

import type { Hopper } from "../types/Hopper";
import { isStepAllowed } from "./is-step-allowed";

let animationClock = new Clock(false);

export const updateHopper = ({
  hopper,
  input,
  map,
}: {
  hopper: Hopper;
  input: { pressedKeys: Record<string, boolean> };
  map: number[][];
}) => {
  const now = performance.now() / 1000; // a time in seconds
  const keyIsPressed = Object.values(input.pressedKeys).some((v) => v);

  // Logic to start a new move
  // A move can start if a key is pressed AND enough time has passed since the last move was initiated.
  if (
    !hopper.moving && keyIsPressed &&
    (now - hopper.lastMoveInitiationTime > (hopper.stepTime + hopper.cooldown))
  ) {
    // Before starting a new move, ensure the current position is synced with the target from the last move.
    hopper.position.current.x = hopper.position.target.x;
    hopper.position.current.y = hopper.position.target.y;

    let moved = false;
    let potentialTargetX = hopper.position.current.x;
    let potentialTargetY = hopper.position.current.y;

    // Determine potential next target based on input
    switch (true) {
      case input.pressedKeys.ArrowDown:
        potentialTargetX += 1;
        break;
      case input.pressedKeys.ArrowLeft:
        potentialTargetY -= 1;
        break;
      case input.pressedKeys.ArrowRight:
        potentialTargetY += 1;
        break;
      case input.pressedKeys.ArrowUp:
        potentialTargetX -= 1;
        break;
    }

    // Temporarily set target to check if step is allowed
    hopper.position.target.x = potentialTargetX;
    hopper.position.target.y = potentialTargetY;

    if (isStepAllowed({ hopper, map })) {
      moved = true;
    } else {
      // Revert to original target if not allowed
      hopper.position.target.x = hopper.position.current.x;
      hopper.position.target.y = hopper.position.current.y;
    }

    if (moved) {
      hopper.moving = true;
      hopper.lastMoveInitiationTime = now; // Update last move initiation time
      animationClock = new Clock(true); // Start animation clock for the new move
    }
  }

  // Logic to update position during a move
  if (hopper.moving) {
    const progress = Math.min(
      1,
      animationClock.getElapsedTime() / hopper.stepTime,
    );

    hopper.rendering.position.x = MathUtils.lerp(
      hopper.position.current.x,
      hopper.position.target.x,
      progress,
    );
    hopper.rendering.position.y = MathUtils.lerp(
      hopper.position.current.y,
      hopper.position.target.y,
      progress,
    );

    if (progress >= 1) {
      hopper.moving = false;
      // Snap to target position to avoid floating point inaccuracies
      hopper.position.current.x = hopper.position.target.x;
      hopper.position.current.y = hopper.position.target.y;
      hopper.rendering.position.x = hopper.position.target.x;
      hopper.rendering.position.y = hopper.position.target.y;
      animationClock.stop();
    }
  }
};

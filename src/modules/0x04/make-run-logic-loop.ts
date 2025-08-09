import type { MakeRunLogicLoop } from "./types/MakeRunLogicLoop.js";

const updateBrute = ({ brute, map }) => {
  // Initialize brute if needed
  if (!brute.position) {
    brute.position = { x: 3, z: 3 };
  }
  if (!brute.direction) {
    const axis = Math.random() < 0.5 ? "x" : "z";
    const dir = Math.random() < 0.5 ? -1 : 1;
    brute.direction = { x: axis === "x" ? dir : 0, z: axis === "z" ? dir : 0 };
  }

  // 0.5% chance to turn 90 degrees
  if (Math.random() < 0.005) {
    if (brute.direction.x !== 0) {
      // Currently moving in x, turn to z
      const dir = Math.random() < 0.5 ? -1 : 1;
      brute.direction = { x: 0, z: dir };
    } else {
      // Currently moving in z, turn to x
      const dir = Math.random() < 0.5 ? -1 : 1;
      brute.direction = { x: dir, z: 0 };
    }
  }

  // Calculate target position
  const targetPosition = {
    x: brute.position.x + brute.direction.x * 0.01,
    z: brute.position.z + brute.direction.z * 0.01,
  };

  // Check collision
  const offsetX = map[0].length / 2 - 0.5;
  const offsetZ = map.length / 2 - 0.5;
  const mapX = Math.round(targetPosition.x) + offsetX;
  const mapZ = Math.round(targetPosition.z) + offsetZ;

  // If hitting wall, pick new direction
  if (map[mapZ] && map[mapZ][mapX] === 1) {
    const axis = Math.random() < 0.5 ? "x" : "z";
    const dir = Math.random() < 0.5 ? -1 : 1;
    brute.direction = { x: axis === "x" ? dir : 0, z: axis === "z" ? dir : 0 };
  } else {
    // Move brute
    brute.position.x = targetPosition.x;
    brute.position.z = targetPosition.z;
  }

  // Update rendering position
  brute.rendering.position.x = brute.position.x;
  brute.rendering.position.z = brute.position.z;
};

export const makeRunLogicLoop: MakeRunLogicLoop = ({
  brute,
  fixedTimeStep,
  input,
  map,
  maximumNumberOfSubsteps,
  parseInput,
  prey,
  preyCommands,
  time,
  updatePrey,
}) =>
() => {
  time.lastUpdateTime ||= performance.now();

  const currentTime = performance.now();

  const frameDeltaTimeCap = fixedTimeStep * maximumNumberOfSubsteps;

  const frameDeltaTime = Math.min(
    currentTime - time.lastUpdateTime,
    frameDeltaTimeCap,
  );

  const commands = parseInput({ input, preyCommands });

  time.lastUpdateTime = currentTime;

  time.accumulator += frameDeltaTime;

  let numberOfSubstepsTaken = 0;

  while (
    time.accumulator >= fixedTimeStep &&
    numberOfSubstepsTaken < maximumNumberOfSubsteps
  ) {
    time.accumulator -= fixedTimeStep;

    updatePrey({ commands, deltaTime: fixedTimeStep, map, prey, preyCommands });

    updateBrute({ brute, map });

    const distance = Math.sqrt(
      Math.pow(prey.position.x - brute.rendering.position.x, 2) +
        Math.pow(prey.position.z - brute.rendering.position.z, 2),
    );

    if (distance < 0.8) {
      prey.caught = true;
    }

    numberOfSubstepsTaken += 1;
  }
};

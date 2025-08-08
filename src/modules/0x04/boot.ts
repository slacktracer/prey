import { AmbientLight, Clock, Group, Scene } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { getBottomLeftRightTop } from "../common/get-bottom-left-right-top.js";
import { getRandomInteger } from "../common/get-random-integer.js";
import { makeOrthographicCameraResizeHandler } from "../common/make-ortographic-camera-resize-handler.js";
import { addCracksToTexture } from "./floor/add-cracks-to-texture.js";
import { addCracksToTextureFunctions } from "./floor/add-cracks-to-texture-functions.js";
import { makeGroundPlane } from "./floor/make-ground-plane.js";
import { makeGroundPlaneTexture } from "./floor/make-ground-plane-texture.js";
import { input } from "./input/input.js";
import { parseInput } from "./input/parse-input.js";
import { startCollectingInput } from "./input/start-collecting-input.js";
import { makeOrthographicCamera } from "./make-orthographic-camera.js";
import { makeRenderer } from "./make-renderer.js";
import { makeRunAnimationLoop } from "./make-run-animation-loop.js";
import { makeRunLogicLoop } from "./make-run-logic-loop.js";
import { isMapValid } from "./maps/is-map-valid.js";
import { makeFin } from "./prey/make-fin.js";
import { makePrey } from "./prey/make-prey.js";
import { preyCommands } from "./prey/prey-commands.js";
import { updatePrey } from "./prey/update-prey.js";
import { state } from "./state.js";
import { addWallsToScene } from "./walls/add-walls-to-scene.js";

// TODO
// decide on moving camera following settings to state
// review and refactor makeFin
// reconsider the camera follow position offset,
// maybe not when rotating?
// finally get to collision and safe max distance to move
export const boot = async ({ container }: { container: HTMLDivElement }) => {
  const clock = new Clock();

  const renderer = makeRenderer({ container });

  const scene = new Scene();

  const orthographicCamera = makeOrthographicCamera({
    ...state.orthographicCameraSettings,
    getBottomLeftRightTop,
    makeOrthographicCameraResizeHandler,
    renderer,
  });

  scene.add(orthographicCamera);

  const orthographicCameraGroup = new Group();

  orthographicCameraGroup.add(orthographicCamera);

  scene.add(orthographicCameraGroup);

  const groundPlane = makeGroundPlane({
    ...state.groundPlaneSettings,
    addCracksToTexture,
    addCracksToTextureFunctions,
    getRandomInteger,
    makeGroundPlaneTexture,
  });

  scene.add(groundPlane);

  const { map } = await import("./maps/map-with-exits.js");

  const mapIsValid = isMapValid({ map });

  if (mapIsValid === false) {
    throw new Error("Invalid map");
  }

  addWallsToScene({
    ...state.wallsSettings,
    map,
    scene,
  });

  const prey = makePrey({
    ...state.prey,
    makeFin,
  });

  scene.add(prey.rendering);

  if (state.ambientLightSettings.on) {
    const ambientLight = new AmbientLight(
      state.ambientLightSettings.color,
      state.ambientLightSettings.intensity,
    );

    scene.add(ambientLight);
  }

  let controls;

  if (state.orbitControlsSettings.on) {
    controls = new OrbitControls(orthographicCamera, renderer.domElement);
  }

  const runAnimationLoop = makeRunAnimationLoop({
    clock,
    controls,
    orthographicCamera,
    orthographicCameraGroup,
    prey,
    renderer,
    scene,
  });

  const runLogicLoop = makeRunLogicLoop({
    ...state.logicLoopSettings,
    input,
    parseInput,
    prey,
    preyCommands,
    updatePrey,
  });

  renderer.setAnimationLoop(() => {
    runLogicLoop();

    runAnimationLoop();
  });

  startCollectingInput({ input });
};

/*
// https://claude.ai/chat/a0714dd0-0c6c-4212-bb1a-4af02e1fc04c
import { Clock, MathUtils } from "three";
import { getForward } from "../../common/get-forward.js";
// Note: checkCollision is now defined inline below for clarity

let rotatingClock = new Clock(false);

// Inline checkCollision function for clarity
const checkCollision = ({ map, position }) => {
  // Convert world position to map coordinates
  // Assuming map center is at world position (0,0)
  const mapWidth = map[0].length;
  const mapHeight = map.length;
  const mapCenterX = Math.floor(mapWidth / 2);
  const mapCenterZ = Math.floor(mapHeight / 2);

  // Convert world coordinates to map array indices
  const mapX = Math.floor(position.x) + mapCenterX;
  const mapZ = Math.floor(position.z) + mapCenterZ;

  // Check if position is outside map bounds
  if (mapX < 0 || mapZ < 0 || mapZ >= map.length || mapX >= map[mapZ].length) {
    return true; // Collision with map boundary
  }

  // Check if the map cell contains a wall (value 1)
  return map[mapZ][mapX] === 1;
};

// Helper function to find the safe position along the movement axis
const findSafePositionAlongAxis = (map, currentPos, targetPos, movementAxis) => {
  const start = currentPos[movementAxis];
  const end = targetPos[movementAxis];
  const step = Math.sign(end - start);

  if (step === 0) return targetPos; // No movement

  let testPos = { ...currentPos };

  // Step through each integer position along the movement axis
  for (let pos = Math.floor(start) + (step > 0 ? 1 : 0);
       step > 0 ? pos <= Math.ceil(end) : pos >= Math.floor(end);
       pos += step) {

    testPos[movementAxis] = pos;

    if (checkCollision({ map, position: testPos })) {
      // Hit a wall, return the last safe position
      const safePos = { ...currentPos };
      safePos[movementAxis] = step > 0 ? pos - 1 + 0.99 : pos + 1 - 0.99;
      return safePos;
    }
  }

  // Check final target position
  if (checkCollision({ map, position: targetPos })) {
    const safePos = { ...currentPos };
    safePos[movementAxis] = Math.floor(start) + (step > 0 ? 0.99 : -0.99);
    return safePos;
  }

  return targetPos;
};

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

  const targetPosition = {
    x: prey.position.x + newVelocity.x * dt,
    y: prey.position.y,
    z: prey.position.z + newVelocity.z * dt,
  };

  // Find safe position along the movement axis (we know which axis from getForward)
  const safePosition = findSafePositionAlongAxis(map, prey.position, targetPosition, axis);

  // Update position and velocity based on how far we could actually move
  const actualMovement = {
    x: safePosition.x - prey.position.x,
    z: safePosition.z - prey.position.z,
  };

  prey.position.x = safePosition.x;
  prey.position.z = safePosition.z;

  // Update velocity based on actual movement (for consistency)
  if (dt > 0) {
    prey.velocity.x = actualMovement.x / dt;
    prey.velocity.z = actualMovement.z / dt;
  } else {
    prey.velocity.x = 0;
    prey.velocity.z = 0;
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
 */

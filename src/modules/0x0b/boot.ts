import { AmbientLight, Clock, Scene } from "three";

import { makeBrute } from "./brute/make-brute.js";
import { makeGroundPlane } from "./floor/make-ground-plane.js";
import { input } from "./input/input.js";
import { parseInput } from "./input/parse-input.js";
import { startCollectingInput } from "./input/start-collecting-input.js";
import { makeRunAnimationLoop } from "./loops/make-run-animation-loop.js";
import { makeRunLogicLoop } from "./loops/make-run-logic-loop.js";
import { makePerspectiveCamera } from "./make-perspective-camera.js";
import { makeRenderer } from "./make-renderer.js";
import { isMapValid } from "./maps/is-map-valid.js";
import { makePrey } from "./prey/make-prey.js";
import { preyCommands } from "./prey/prey-commands.js";
import { settings } from "./settings.js";
import type { Boot } from "./types/Boot.js";
import { addWallsToScene } from "./walls/add-walls-to-scene.js";

const clock = new Clock();

export const boot: Boot = async ({ container }) => {
  const renderer = makeRenderer({ container });

  const scene = new Scene();

  const { perspectiveCamera } = makePerspectiveCamera({
    ...settings.perspectiveCameraSettings,
    renderer,
  });

  const { map } = await import("./maps/map-with-exits.js");

  const mapIsValid = isMapValid({ map });

  if (mapIsValid === false) {
    throw new Error("Invalid map");
  }

  settings.groundPlaneSettings.depth = map.length;

  settings.groundPlaneSettings.width = map.length;

  const groundPlane = makeGroundPlane({ ...settings.groundPlaneSettings });

  scene.add(groundPlane);

  const {
    ColliderDesc,
    RigidBodyDesc,
    World,
  } = await import(
    "@dimforge/rapier3d"
  );

  const world = new World({ x: 0, y: 0, z: 0 });

  addWallsToScene({
    ...settings.wallsSettings,
    ColliderDesc,
    map,
    RigidBodyDesc,
    scene,
    world,
  });

  const prey = makePrey({
    ...settings.preySettings,
    ColliderDesc,
    RigidBodyDesc,
    world,
  });

  scene.add(prey.rendering);

  const brute = makeBrute({
    ...settings.bruteSettings,
    ColliderDesc,
    RigidBodyDesc,
    world,
  });

  scene.add(brute.rendering);

  const runLogicLoop = makeRunLogicLoop({
    ...settings.logicLoopSettings,
    brute,
    input,
    parseInput,
    prey,
    preyCommands,
    world,
  });

  const runAnimationLoop = makeRunAnimationLoop({
    brute,
    perspectiveCamera,
    prey,
    renderer,
    scene,
  });

  renderer.setAnimationLoop(() => {
    runLogicLoop({ deltaTime: clock.getDelta() });

    const excessTime = settings.logicLoopSettings.time.accumulator;

    const { fixedTimeStep } = settings.logicLoopSettings;

    const interpolationFactor = excessTime / fixedTimeStep;

    runAnimationLoop({ interpolationFactor });
  });

  startCollectingInput({ input });

  if (settings.ambientLightSettings.on) {
    const ambientLight = new AmbientLight(
      settings.ambientLightSettings.color,
      settings.ambientLightSettings.intensity,
    );

    scene.add(ambientLight);
  }
};

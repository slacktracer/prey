import { AmbientLight, Clock, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { makeOrthographicCamera } from "./camera/make-orthographic-camera.js";
import { makeGroundPlane } from "./ground/make-ground-plane.js";
import { input } from "./input/input.js";
import { startCollectingInput } from "./input/start-collecting-input.js";
import { makeRenderer } from "./make-renderer.js";
import { makeRunAnimationLoop } from "./make-run-animation-loop.js";
import { makeRunLogicLoop } from "./make-run-logic-loop.js";
import { isMapValid } from "./maps/is-map-valid.js";
import { makePrey } from "./prey/make-prey.js";
import { settings } from "./settings/settings.js";
import type { Boot } from "./types/Boot.js";
import { addWallsToScene } from "./walls/add-walls-to-scene.js";

const clock = new Clock();

export const boot: Boot = async ({ container }) => {
  const renderer = makeRenderer({ container });

  const scene = new Scene();

  const { orthographicCamera, orthographicCameraGroup } =
    makeOrthographicCamera({
      ...settings.orthographicCameraSettings,
      renderer,
    });

  scene.add(orthographicCameraGroup);

  const groundPlane = makeGroundPlane({ ...settings.groundPlaneSettings });

  scene.add(groundPlane);

  const { map } = await import("./maps/basic-map.js");

  const mapIsValid = isMapValid({ map });

  if (mapIsValid === false) {
    throw new Error("Invalid map");
  }

  const { World } = await import("@dimforge/rapier3d");

  const world = new World({ x: 0, y: 0, z: 0 });

  await addWallsToScene({
    ...settings.wallsSettings,
    map,
    scene,
    world,
  });

  const prey = await makePrey({ ...settings.preySettings, world });

  scene.add(prey.rendering);

  const runLogicLoop = makeRunLogicLoop({
    ...settings.logicLoopSettings,
    input,
    prey,
    world,
  });

  const runAnimationLoop = makeRunAnimationLoop({
    orthographicCamera,
    orthographicCameraGroup,
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

  if (settings.orbitControlsSettings.on) {
    new OrbitControls(orthographicCamera, renderer.domElement);
  }
};

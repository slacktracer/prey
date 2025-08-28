import { AmbientLight, Clock, Scene } from "three";

import { makeOrthographicCamera } from "./camera/make-orthographic-camera.js";
import { makeGroundPlane } from "./ground/make-ground-plane.js";
import { input } from "./input/input.js";
import { startCollectingInput } from "./input/start-collecting-input.js";
import { makeRenderer } from "./make-renderer.js";
import { makeRunAnimationLoop } from "./make-run-animation-loop.js";
import { makeRunLogicLoop } from "./make-run-logic-loop.js";
import { makePrey } from "./prey/make-prey.js";
import { settings } from "./settings/settings.js";
import type { Boot } from "./types/Boot.js";

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

  const {
    World,
  } = await import(
    "@dimforge/rapier3d"
  );

  const world = new World({ x: 0, y: 0, z: 0 });

  const prey = await makePrey({ ...settings.preySettings, world });

  scene.add(prey.rendering);

  const runLogicLoop = makeRunLogicLoop({
    ...settings.logicLoopSettings,
    input,
  });

  const runAnimationLoop = makeRunAnimationLoop({
    orthographicCamera,
    orthographicCameraGroup,
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

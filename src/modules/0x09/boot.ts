import { AmbientLight, Scene } from "three";

import { makeGroundPlane } from "./ground/make-ground-plane.js";
import { input } from "./input/input.js";
import { parseInput } from "./input/parse-input";
import { startCollectingInput } from "./input/start-collecting-input.js";
import { makeRunAnimationLoop } from "./loops/make-run-animation-loop.js";
import { makeOrthographicCamera } from "./make-orthographic-camera.js";
import { makeRenderer } from "./make-renderer.js";
import { makeMovingThing } from "./moving-thing";
import { settings } from "./settings.js";
import type { Boot } from "./types/Boot.js";

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

  const runAnimationLoop = makeRunAnimationLoop({
    orthographicCamera,
    orthographicCameraGroup,
    renderer,
    scene,
  });

  const movingThing = makeMovingThing();

  scene.add(movingThing.rendering);

  startCollectingInput({ input });

  renderer.setAnimationLoop(() => {
    const commandList = parseInput({ input });

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    commandList.length && console.info(commandList);

    runAnimationLoop();
  });

  if (settings.ambientLightSettings.on) {
    const ambientLight = new AmbientLight(
      settings.ambientLightSettings.color,
      settings.ambientLightSettings.intensity,
    );

    scene.add(ambientLight);
  }
};

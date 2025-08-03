import { AmbientLight, Group, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { makeGroundPlane } from "./floor/make-ground-plane.js";
import { input } from "./input/input.js";
import { parseInput } from "./input/parse-input.js";
import { startCollectingInput } from "./input/start-collecting-input.js";
import { makeOrthographicCamera } from "./make-orthographic-camera.js";
import { makeRenderer } from "./make-renderer.js";
import { makeRunAnimationLoop } from "./make-run-animation-loop.js";
import { makeRunLogicLoop } from "./make-run-logic-loop.js";
import { isMapValid } from "./maps/is-map-valid.js";
import { makePrey } from "./prey/make-prey.js";
import { preyCommands } from "./prey/prey-commands.js";
import { updatePrey } from "./prey/update-prey.js";
import { state } from "./state/state.js";
import { addWallsToScene } from "./walls/add-walls-to-scene.js";

export const boot = async ({ container }: { container: HTMLDivElement }) => {
  const renderer = makeRenderer({ container });

  state.orthographicCamera.renderer = renderer;

  const scene = new Scene();

  const orthographicCamera = makeOrthographicCamera(state.orthographicCamera);

  scene.add(orthographicCamera);

  const orthographicCameraGroup = new Group();

  orthographicCameraGroup.add(orthographicCamera);

  scene.add(orthographicCameraGroup);

  const groundPlane = makeGroundPlane(state.groundPlane);

  scene.add(groundPlane);

  const { map } = await import("./maps/map.js");

  const mapIsValid = isMapValid({ map });

  if (mapIsValid === false) {
    throw new Error("Invalid map");
  }

  addWallsToScene({
    material: state.walls.material,
    map,
    scene,
    wallHeight: state.walls.height,
  });

  const prey = makePrey(state.prey);

  scene.add(prey.rendering);

  if (state.ambientLight.on) {
    const ambientLight = new AmbientLight(
      state.ambientLight.color,
      state.ambientLight.intensity,
    );

    scene.add(ambientLight);
  }

  let controls;

  if (state.orbitControls.on) {
    controls = new OrbitControls(orthographicCamera, renderer.domElement);
  }

  const runAnimationLoop = makeRunAnimationLoop({
    cameraSettings: state.cameraSettings,
    controls,
    orthographicCamera,
    orthographicCameraGroup,
    renderer,
    scene,
  });

  const runLogicLoop = makeRunLogicLoop({
    fixedTimeStep: 1000 / 60,
    maximumNumberOfSubsteps: 5,
    time: {
      accumulator: 0,
      lastUpdateTime: performance.now(),
    },
  });

  renderer.setAnimationLoop(() => {
    runLogicLoop({ input, map, parseInput, prey, preyCommands, updatePrey });

    runAnimationLoop({ prey });
  });

  startCollectingInput({ input });
};

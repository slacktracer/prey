import { AmbientLight, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { makeGroundPlane } from "./make-ground-plane.js";
import { makeOrthographicCamera } from "./make-orthographic-camera";
import { makeRenderer } from "./make-renderer";
import { makeRunAnimationLoop } from "./make-run-animation-loop";
import { isMapValid } from "./maps/is-map-valid";
import { makePrey } from "./prey/make-prey";
import { state } from "./state/state.js";
import { addWallsToScene } from "./walls/add-walls-to-scene";

export const boot = async ({ container }: { container: HTMLDivElement }) => {
  const renderer = makeRenderer({ container });

  state.orthographicCamera.renderer = renderer;

  const scene = new Scene();

  const orthographicCamera = makeOrthographicCamera(state.orthographicCamera);

  scene.add(orthographicCamera);

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

  const { rendering: prey } = makePrey(state.prey);

  scene.add(prey);

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
    controls,
    orthographicCamera,
    renderer,
    scene,
  });

  renderer.setAnimationLoop(() => {
    runAnimationLoop();
  });
};

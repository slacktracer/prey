import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export const setUpOrbitControls = ({ camera, renderer }) => {
  const controls = new OrbitControls(camera, renderer.domElement);

  controls.target.set(0, 0, 0);

  return controls;
};

import { PCFSoftShadowMap, WebGLRenderer } from "three";

export const makeRenderer = ({ container }) => {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true });

  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.shadowMap.enabled = true;

  renderer.shadowMap.type = PCFSoftShadowMap;

  container.appendChild(renderer.domElement);

  return renderer;
};

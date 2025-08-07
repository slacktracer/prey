import { PCFSoftShadowMap, WebGLRenderer } from "three";

import type { MakeRenderer } from "./types/MakeRenderer.js";

export const makeRenderer: MakeRenderer = ({ container }) => {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true });

  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.shadowMap.enabled = true;

  renderer.shadowMap.type = PCFSoftShadowMap;

  container.appendChild(renderer.domElement);

  return renderer;
};

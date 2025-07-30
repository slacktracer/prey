import { Color, Vector3 } from "three";

import type { State } from "./State.js";

export const state: State = {
  ambientLight: {
    color: 0xffffff,
    intensity: 1,
    on: true,
  },

  groundPlane: {
    color: 0x303030,
    height: 150,
    width: 150,
  },

  orthographicCamera: {
    edgeSize: 15,
    far: 1000,
    lookAt: new Vector3(0, 0, 0),
    near: 1,
    position: new Vector3(10, 200, -5),
    renderer: undefined,
  },

  walls: {
    height: 8,
    material: {
      color: 0x38393f,
      flatShading: true,
      shininess: 0,
      specular: new Color(0x000000),
      transparent: true,
      opacity: 0.9,
      wireframe: false,
    },
  },
};

import { Color, Vector3 } from "three";

import type { State } from "./State.js";

export const state: State = {
  ambientLight: {
    color: 0xffffff,
    intensity: 1,
    on: false,
  },

  groundPlane: {
    color: 0x303030,
    height: 150,
    width: 150,
  },

  orbitControls: {
    on: false,
  },

  orthographicCamera: {
    edgeSize: 15,
    far: 1000,
    lookAt: new Vector3(0, 0, 0),
    near: 1,
    position: new Vector3(10, 200, -5),
    renderer: undefined,
  },

  prey: {
    body: {
      color: "whitesmoke",
      depth: 0.75,
      height: 2.5,
      width: 0.75,
    },
    hat: false,
    moveTime: 0.3,
    moving: false,
    pointer: true,
    position: {
      current: { x: 3, y: 0, z: 4 },
      target: { x: 3, y: 0, z: 4 },
    },
    rotateTime: 0.2,
    rotating: false,
    rotation: {
      current: { x: 0, y: 0, z: 0 },
      target: { x: 0, y: 0, z: 0 },
    },
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

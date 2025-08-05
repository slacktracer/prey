import { Color, Vector3 } from "three";

import type { State } from "./State.js";

export const state: State = {
  ambientLight: {
    color: 0xffffff,
    intensity: 1,
    on: false,
  },

  cameraSettings: {
    lag: {
      factor: 10,
      lookAhead: { distance: 3, on: false },
    },
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
    edgeSize: 8,
    far: 1000,
    lookAt: new Vector3(0, 0, 0),
    near: 1,
    position: new Vector3(10, 200, -5),
    renderer: undefined,
  },

  prey: {
    body: {
      color: "whitesmoke",
      depth: 0.5,
      height: 2.5,
      width: 0.5,
    },
    hat: false,
    pointer: true,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    velocity: {
      x: 0,
      y: 0,
      z: 0,
    },
    rotation: {
      current: { y: 0 },
      target: { y: 0 },
    },
    speed: 4.0,
    rotateTime: 0.3,
    rotating: false,
  },

  walls: {
    height: 8,
    material: {
      color: 0x38393f,
      flatShading: true,
      opacity: 0.9,
      shininess: 0,
      specular: new Color(0x000000),
      transparent: true,
      wireframe: false,
    },
  },
};

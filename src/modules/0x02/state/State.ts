import type { WebGLRenderer } from "three";
import type { Vector3 } from "three";
import type { Color } from "three";

export type State = {
  ambientLight: {
    color: number;
    intensity: number;
    on: boolean;
  };

  cameraSettings: {
    lag: {
      factor: number;
      lookAhead: { distance: number; on: boolean };
      on: boolean;
    };
  };

  groundPlane: {
    color: number;
    height: number;
    width: number;
  };

  orbitControls: {
    on: boolean;
  };

  orthographicCamera: {
    edgeSize: number;
    far: number;
    lookAt: Vector3;
    near: number;
    position: Vector3;
    renderer: undefined | WebGLRenderer;
  };

  prey: {
    body: {
      color: string | number;
      depth: number;
      height: number;
      width: number;
    };
    hat: boolean;
    moveTime: number;
    moving: boolean;
    pointer: boolean;
    position: {
      current: { x: number; y: number; z: number };
      target: { x: number; y: number; z: number };
    };
    rotateTime: number;
    rotating: boolean;
    rotation: {
      current: { x: number; y: number; z: number };
      target: { x: number; y: number; z: number };
    };
  };

  walls: {
    height: number;
    material: {
      color: number;
      flatShading: boolean;
      shininess: number;
      specular: Color;
      transparent: boolean;
      opacity: number;
      wireframe: boolean;
    };
  };
};

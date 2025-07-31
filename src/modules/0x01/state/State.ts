import type { WebGLRenderer } from "three";
import type { Vector3 } from "three";
import type { Color } from "three";

export type State = {
  ambientLight: {
    color: number;
    intensity: number;
    on: boolean;
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
      depth: number;
      height: number;
      width: number;
    };
    hat: boolean;
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

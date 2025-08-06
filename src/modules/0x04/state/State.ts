import type { WebGLRenderer } from "three";
import type { Vector3 } from "three";

export type State = {
  ambientLight: {
    color: number;
    intensity: number;
    on: boolean;
  };

  groundPlane: {
    color: number;
    cracks: boolean;
    height: number;
    width: number;
  };

  logicLoop: {
    fixedTimeStep: number;
    maximumNumberOfSubsteps: number;
    time: {
      accumulator: number;
      lastUpdateTime: number;
    };
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
      color: number | string;
      depth: number;
      height: number;
      width: number;
    };
    position: { x: number; y: number; z: number };
    //  velocity: { x: number; y: number; z: number };
    rotation: { current: { y: number }; target: { y: number } };
    //  speed: number;
    //  rotateTime: number;
    //  rotating: boolean;
  };
};

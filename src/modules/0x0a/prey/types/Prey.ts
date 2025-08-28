import type { Group } from "three";

export type Prey = {
  position: {
    current: { x: number; y: number; z: number };

    previous: { x: number; y: number; z: number };
  };

  rendering: Group;
};

import { Color } from "three";

export const state = {
  wall: {
    height: 8,
    material: {
      color: 0x38393f,
      flatShading: true,
      shininess: 0,
      specular: new Color(0x000000),
      transparent: true,
      opacity: 0.9,
    },
  },
};

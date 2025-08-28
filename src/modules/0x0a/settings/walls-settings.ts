import type { WallsSettings } from "./types/WallsSettings.js";

export const wallsSettings: WallsSettings = {
  height: 8,
  material: {
    alphaTest: 0.1,
    color: 0x38393f,
    flatShading: true,
    opacity: 0.9,
    shininess: 0,
    specular: 0x000000,
    transparent: true,
    wireframe: false,
  },
};

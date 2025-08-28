export type WallsSettings = {
  height: number;
  map?: number[][];
  material: {
    alphaTest: number;
    color: number;
    flatShading: boolean;
    opacity: number;
    shininess: number;
    specular: number;
    transparent: boolean;
    wireframe: boolean;
  };
};

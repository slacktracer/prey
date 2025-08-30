export type WallsSettings = {
  height: number;
  map?: number[][];
  material: {
    color: number;
    flatShading: boolean;
    shininess: number;
    specular: number;
  };
};

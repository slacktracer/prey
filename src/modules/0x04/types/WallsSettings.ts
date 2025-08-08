export type WallsSettings = {
  height: number;
  map?: number[][];
  material: {
    color: number;
    flatShading: boolean;
    opacity: number;
    shininess: number;
    specular: number;
    transparent: boolean;
    wireframe: boolean;
  };
};

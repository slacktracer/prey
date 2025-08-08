export type MakeWallsGeometryDataUsingCSG = (input: {
  map: number[][];
  offsetX: number;
  offsetZ: number;
  wallHeight: number;
}) => {
  transferables: ArrayBuffer[];
  wallsGeometryData: {
    normal: { array: Float32Array; itemSize: number };
    position: { array: Float32Array; itemSize: number };
  };
};

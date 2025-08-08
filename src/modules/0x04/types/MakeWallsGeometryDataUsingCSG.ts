export type MakeWallsGeometryDataUsingCSG = (input: {
  height: number;
  map: number[][];
  offsetX: number;
  offsetZ: number;
}) => {
  transferables: ArrayBuffer[];
  wallsGeometryData: {
    normal: { array: Float32Array; itemSize: number };
    position: { array: Float32Array; itemSize: number };
  };
};

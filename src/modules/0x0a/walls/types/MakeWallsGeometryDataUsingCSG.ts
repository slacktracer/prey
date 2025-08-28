export type MakeWallsGeometryDataUsingCSG = (input: {
  height: number;
  map: number[][];
  offsetX: number;
  offsetZ: number;
}) => {
  wallsGeometryData: {
    normal: { array: ArrayLike<number>; itemSize: number };
    position: { array: ArrayLike<number>; itemSize: number };
  };
  transferables: ArrayBuffer[];
};

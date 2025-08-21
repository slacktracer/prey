import type { BufferGeometry } from "three";

export type MakeWallsGeometry = (input: {
  wallsGeometryData: {
    index?: { array: ArrayLike<number>; itemSize: number };
    normal: { array: ArrayLike<number>; itemSize: number };
    position: { array: ArrayLike<number>; itemSize: number };
  };
}) => {
  wallsGeometry: BufferGeometry;
};

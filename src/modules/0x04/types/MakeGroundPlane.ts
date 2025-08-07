import type { Mesh } from "three";

import type { GetRandomInteger } from "../../common/types/GetRandomInteger.js";
import type { AddCracksToTexture } from "./AddCracksToTexture.js";
import type { MakeGroundPlaneTexture } from "./MakeGroundPlaneTexture.js";

export type MakeGroundPlane = ({
  addCracksToTexture,
  addCracksToTextureFunctions,
  color,
  cracks,
  getRandomInteger,
  height,
  makeGroundPlaneTexture,
  width,
}: {
  addCracksToTexture: AddCracksToTexture;
  addCracksToTextureFunctions: ((input: {
    context: CanvasRenderingContext2D;
  }) => void)[];
  color: number;
  cracks: boolean;
  getRandomInteger: GetRandomInteger;
  height: number;
  makeGroundPlaneTexture: MakeGroundPlaneTexture;
  width: number;
}) => Mesh;

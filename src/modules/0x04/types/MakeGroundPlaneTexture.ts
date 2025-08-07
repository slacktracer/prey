import type { CanvasTexture } from "three";

import type { GetRandomInteger } from "../../common/types/GetRandomInteger.js";
import type { AddCracksToTexture } from "./AddCracksToTexture.js";

export type MakeGroundPlaneTexture = ({
  addCracksToTexture,
  addCracksToTextureFunctions,
  color,
  cracks,
  getRandomInteger,
  height,
  width,
}: {
  addCracksToTexture: AddCracksToTexture;
  addCracksToTextureFunctions: ((
    { context: CanvasRenderingContext2D },
  ) => void)[];
  color: number;
  cracks: boolean;
  getRandomInteger: GetRandomInteger;
  height: number;
  width: number;
}) => CanvasTexture;

import type { GetRandomInteger } from "../../common/types/GetRandomInteger.js";

export type AddCracksToTexture = ({
  addCracksToTextureFunctions,
  context,
  getRandomInteger,
}: {
  addCracksToTextureFunctions: ((input: {
    context: CanvasRenderingContext2D;
  }) => void)[];
  context: CanvasRenderingContext2D;
  getRandomInteger: GetRandomInteger;
}) => void;

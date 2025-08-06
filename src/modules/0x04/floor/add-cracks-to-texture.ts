import { getRandomInteger } from "../../common/get-random-integer.js";

export const addCracksToTexture = (
  { addCracksToTextureFunctions, context }: {
    addCracksToTextureFunctions: ((
      { context: CanvasRenderingContext2D },
    ) => void)[];
    context: CanvasRenderingContext2D;
  },
) => {
  const addThisManyCrackTypes = getRandomInteger({ max: 4, min: 2 });

  Array.from({ length: addThisManyCrackTypes }).forEach(() => {
    const crackType = getRandomInteger({
      max: addCracksToTextureFunctions.length - 1,
      min: 0,
    });

    addCracksToTextureFunctions[crackType]({ context });
  });
};

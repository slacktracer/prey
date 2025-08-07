import type { AddCracksToTexture } from "../types/AddCracksToTexture.js";

export const addCracksToTexture: AddCracksToTexture = (
  { addCracksToTextureFunctions, context, getRandomInteger },
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

import type { GetRandomInteger } from "./types/GetRandomInteger.js";

export const getRandomInteger: GetRandomInteger = ({ max, min }) =>
  Math.floor(Math.random() * (max - min + 1 /* inclusive */)) + min;

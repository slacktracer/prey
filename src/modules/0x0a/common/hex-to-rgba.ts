import type { HexToRGBA } from "./types/HexToRGBA.js";

export const hexToRGBA: HexToRGBA = ({ number }) => {
  if (number > 0xffffff) {
    const r = (number >> 24) & 255;

    const g = (number >> 16) & 255;

    const b = (number >> 8) & 255;

    const a = (number & 255) / 255;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  } else {
    const r = (number >> 16) & 255;

    const g = (number >> 8) & 255;

    const b = number & 255;

    return `rgba(${r}, ${g}, ${b}, 1)`;
  }
};

import { CanvasTexture } from "three";

import { hexToRGBA } from "../common/hex-to-rgba.js";
import type { MakePreyRenderingTopTexture } from "./types/MakePreyRenderingTopTexture.js";

export const makePreyRenderingTopTexture: MakePreyRenderingTopTexture = (
  { color },
) => {
  const canvas = document.createElement("canvas");

  const context = canvas.getContext("2d")!;

  canvas.width = 128;

  canvas.height = 128;

  context.fillStyle = typeof color === "string"
    ? color
    : hexToRGBA({ number: color });

  context.fillRect(0, 0, 128, 128);

  context.fillStyle = "#111111";

  context.beginPath();

  context.moveTo(108, 64);

  context.lineTo(68, 28);

  context.lineTo(68, 48);

  context.lineTo(20, 48);

  context.lineTo(20, 80);

  context.lineTo(68, 80);

  context.lineTo(68, 100);

  context.closePath();

  context.fill();

  return new CanvasTexture(canvas);
};

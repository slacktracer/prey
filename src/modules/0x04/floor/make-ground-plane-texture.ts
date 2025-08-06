import { CanvasTexture, Color, RepeatWrapping } from "three";

import { addCracksToTexture } from "./add-cracks-to-texture.js";
import { addCracksToTextureFunctions } from "./add-cracks-to-texture-functions.js";

export const makeGroundPlaneTexture = (
  { color, cracks, height, width }: {
    color: number;
    cracks: boolean;
    height: number;
    width: number;
  },
) => {
  const canvas = document.createElement("canvas");

  canvas.height = 64;

  canvas.width = 64;

  const context = canvas.getContext("2d")!;

  const baseColor = new Color(color);

  const red = Math.floor(baseColor.r * 255);

  const green = Math.floor(baseColor.g * 255);

  const blue = Math.floor(baseColor.b * 255);

  context.fillStyle = `rgb(${red}, ${green}, ${blue})`;

  context.fillRect(0, 0, 64, 64);

  context.lineWidth = 1;

  context.strokeStyle = "rgba(150, 150, 150, 0.03)";

  context.beginPath();

  context.moveTo(0, 0);

  context.lineTo(0, 64);

  context.stroke();

  context.beginPath();

  context.moveTo(0, 0);

  context.lineTo(64, 0);

  context.stroke();

  if (cracks) {
    addCracksToTexture({ addCracksToTextureFunctions, context });
  }

  const texture = new CanvasTexture(canvas);

  texture.wrapS = RepeatWrapping;

  texture.wrapT = RepeatWrapping;

  texture.repeat.set(width, height);

  return texture;
};

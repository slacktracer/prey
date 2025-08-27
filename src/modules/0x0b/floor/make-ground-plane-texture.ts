import { CanvasTexture, Color, RepeatWrapping } from "three";

import type { MakeGroundPlaneTexture } from "../types/MakeGroundPlaneTexture.js";

export const makeGroundPlaneTexture: MakeGroundPlaneTexture = (
  { color, depth, width },
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

  context.strokeStyle = "rgba(36, 44, 133, 0.10)";

  context.beginPath();

  context.moveTo(0, 0);

  context.lineTo(0, 64);

  context.stroke();

  context.beginPath();

  context.moveTo(0, 0);

  context.lineTo(64, 0);

  context.stroke();

  context.strokeStyle = "rgba(36, 44, 133, 0.075)";

  context.lineWidth = 0.5;

  context.beginPath();

  context.arc(32, 32, 12, 0, 2 * Math.PI);

  context.stroke();

  const texture = new CanvasTexture(canvas);

  texture.wrapS = RepeatWrapping;

  texture.wrapT = RepeatWrapping;

  texture.repeat.set(width, depth);

  texture.generateMipmaps = true;

  texture.needsUpdate = true;

  return texture;
};

import { CanvasTexture, Color, RepeatWrapping } from "three";

import type { MakeGroundPlaneTexture } from "./types/MakeGroundPlaneTexture.js";

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

  const imageData = context.createImageData(64, 64);

  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 2;

    data[i] = Math.max(0, Math.min(255, red + noise)); // red

    data[i + 1] = Math.max(0, Math.min(255, green + noise)); // green

    data[i + 2] = Math.max(0, Math.min(255, blue + noise)); // blue

    data[i + 3] = 255; // alpha
  }

  context.putImageData(imageData, 0, 0);

  const texture = new CanvasTexture(canvas);

  texture.wrapS = RepeatWrapping;

  texture.wrapT = RepeatWrapping;

  texture.repeat.set(width, depth);

  texture.generateMipmaps = true;

  texture.needsUpdate = true;

  return texture;
};

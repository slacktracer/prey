import { CanvasTexture, Color, RepeatWrapping } from "three";

import type { MakeGroundPlaneTexture } from "./types/MakeGroundPlaneTexture.js";

export const makeGroundPlaneTexture: MakeGroundPlaneTexture = (
  { color, depth, graininess, tileSide, width },
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
    const noise = (Math.random() - 0.5) * graininess;

    data[i] = Math.max(0, Math.min(255, red + noise)); // red

    data[i + 1] = Math.max(0, Math.min(255, green + noise)); // green

    data[i + 2] = Math.max(0, Math.min(255, blue + noise)); // blue

    data[i + 3] = 255; // alpha
  }

  context.putImageData(imageData, 0, 0);

  if (tileSide > 0) {
    context.lineWidth = 1;

    context.strokeStyle = "rgba(0, 0, 0, 0.2)";

    for (let x = 0; x <= 64; x += tileSide) {
      context.beginPath();

      context.moveTo(x, 0);

      context.lineTo(x, 64);

      context.stroke();
    }

    for (let y = 0; y <= 64; y += tileSide) {
      context.beginPath();

      context.moveTo(0, y);

      context.lineTo(64, y);

      context.stroke();
    }
  }

  const texture = new CanvasTexture(canvas);

  texture.wrapS = RepeatWrapping;

  texture.wrapT = RepeatWrapping;

  texture.repeat.set(width, depth);

  texture.generateMipmaps = true;

  texture.needsUpdate = true;

  return texture;
};

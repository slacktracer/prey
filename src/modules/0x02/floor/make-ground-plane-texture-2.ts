import { CanvasTexture, Color, RepeatWrapping } from "three";

export const makeGroundPlaneTexture = (
  { color, height, width }: { color: number; height: number; width: number },
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

  context.strokeStyle = "rgba(255, 255, 255, 0.03)";

  context.beginPath();

  context.moveTo(0, 0);

  context.lineTo(0, 64);

  context.stroke();

  context.beginPath();

  context.moveTo(0, 0);

  context.lineTo(64, 0);

  context.stroke();

  const crackTypes = [
    () => {
      context.lineWidth = 1 + Math.random() * 0.5;

      context.strokeStyle = `rgba(0, 0, 0, ${0.25 + Math.random() * 0.15})`;

      context.beginPath();

      const startX = Math.random() * 64;

      const startY = Math.random() * 64;

      context.moveTo(startX, startY);

      let currentX = startX;

      let currentY = startY;

      const segments = 8 + Math.random() * 12;

      for (let j = 0; j < segments; j++) {
        currentX += (Math.random() - 0.5) * 18;

        currentY += (Math.random() - 0.5) * 18;

        currentX = Math.max(0, Math.min(64, currentX));

        currentY = Math.max(0, Math.min(64, currentY));

        context.lineTo(currentX, currentY);
      }

      context.stroke();
    },

    () => {
      context.lineWidth = 0.8 + Math.random() * 0.4;

      context.strokeStyle = `rgba(0, 0, 0, ${0.2 + Math.random() * 0.1})`;

      const mainX = 10 + Math.random() * 44;

      const mainY = 10 + Math.random() * 44;

      context.beginPath();

      context.moveTo(mainX, mainY);

      const endX = mainX + (Math.random() - 0.5) * 40;

      const endY = mainY + (Math.random() - 0.5) * 40;

      context.lineTo(
        Math.max(0, Math.min(64, endX)),
        Math.max(0, Math.min(64, endY)),
      );

      context.stroke();

      for (let b = 0; b < 2 + Math.random() * 3; b++) {
        context.beginPath();

        const branchX = mainX + (endX - mainX) * Math.random();

        const branchY = mainY + (endY - mainY) * Math.random();

        context.moveTo(branchX, branchY);

        const branchEndX = branchX + (Math.random() - 0.5) * 20;

        const branchEndY = branchY + (Math.random() - 0.5) * 20;

        context.lineTo(
          Math.max(0, Math.min(64, branchEndX)),
          Math.max(0, Math.min(64, branchEndY)),
        );

        context.stroke();
      }
    },

    () => {
      context.lineWidth = 0.6 + Math.random() * 0.3;

      context.strokeStyle = `rgba(0, 0, 0, ${0.15 + Math.random() * 0.1})`;

      const centerX = 15 + Math.random() * 34;

      const centerY = 15 + Math.random() * 34;

      const radius = 8 + Math.random() * 15;

      context.beginPath();

      context.arc(centerX, centerY, radius, 0, Math.PI * 2);

      context.stroke();

      for (let r = 0; r < 3 + Math.random() * 4; r++) {
        context.beginPath();

        const angle = Math.random() * Math.PI * 2;

        const startX = centerX + Math.cos(angle) * radius;

        const startY = centerY + Math.sin(angle) * radius;

        const length = 8 + Math.random() * 20;

        const endX = startX + Math.cos(angle) * length;

        const endY = startY + Math.sin(angle) * length;

        context.moveTo(startX, startY);

        context.lineTo(
          Math.max(0, Math.min(64, endX)),
          Math.max(0, Math.min(64, endY)),
        );

        context.stroke();
      }
    },
  ];

  const numCracks = 2 + Math.floor(Math.random() * 3);

  for (let i = 0; i < numCracks; i++) {
    const crackType = crackTypes[Math.floor(Math.random() * crackTypes.length)];

    crackType();
  }

  const texture = new CanvasTexture(canvas);

  texture.wrapS = RepeatWrapping;

  texture.wrapT = RepeatWrapping;

  texture.repeat.set(width, height);

  return texture;
};

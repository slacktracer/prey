import { BoxGeometry, Group, Mesh, MeshPhongMaterial, PointLight } from "three";

import { makePreyRenderingTopTexture } from "./make-prey-rendering-top-texture.js";
import type { MakePreyRendering } from "./types/MakePreyRendering.js";

export const makePreyRendering: MakePreyRendering = ({ renderingSettings }) => {
  const preyBodyGeometry = new BoxGeometry(
    renderingSettings.width,
    renderingSettings.height,
    renderingSettings.depth,
  );

  const preyRenderingTopTexture = makePreyRenderingTopTexture({
    color: renderingSettings.color,
  });

  const defaultPreyMaterial = new MeshPhongMaterial({
    color: renderingSettings.color,

    flatShading: true,
  });

  const preyTopMaterial = new MeshPhongMaterial({
    map: preyRenderingTopTexture,

    flatShading: true,
  });

  const preyBodyMaterials = [
    defaultPreyMaterial,
    defaultPreyMaterial,
    preyTopMaterial,
    defaultPreyMaterial,
    defaultPreyMaterial,
    defaultPreyMaterial,
  ];

  const preyBody = new Mesh(
    preyBodyGeometry,
    preyBodyMaterials,
  );

  preyBody.position.set(0, renderingSettings.height / 2, 0);

  const rendering = new Group();

  rendering.add(preyBody);

  const candle = new PointLight(renderingSettings.candle.color, 40, 8);

  candle.position.set(
    0,
    renderingSettings.height + renderingSettings.candle.yOffset,
    0,
  );

  candle.castShadow = true;

  rendering.add(candle);

  return rendering;
};

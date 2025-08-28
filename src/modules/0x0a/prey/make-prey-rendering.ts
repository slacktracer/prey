import { BoxGeometry, Group, Mesh, MeshPhongMaterial, PointLight } from "three";

import type { MakePreyRendering } from "./types/MakePreyRendering.js";

export const makePreyRendering: MakePreyRendering = ({ renderingSettings }) => {
  const preyBodyGeometry = new BoxGeometry(
    renderingSettings.width,
    renderingSettings.height,
    renderingSettings.depth,
  );

  const preyBodyMaterial = new MeshPhongMaterial({
    color: renderingSettings.color,

    flatShading: true,
  });

  const preyBody = new Mesh(
    preyBodyGeometry,
    preyBodyMaterial,
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

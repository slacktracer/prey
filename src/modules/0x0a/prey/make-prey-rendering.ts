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

  const finGeometry = new BoxGeometry(
    renderingSettings.height * 0.15,
    renderingSettings.height * 0.3,
    renderingSettings.depth * 0.2,
  );

  const finMaterial = new MeshPhongMaterial({
    color: 0x2266ff,

    flatShading: true,
  });

  const fin = new Mesh(finGeometry, finMaterial);

  fin.position.set(renderingSettings.depth * 0.1, renderingSettings.height, 0);

  fin.rotation.z = Math.PI / 2.25;

  rendering.add(fin);

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

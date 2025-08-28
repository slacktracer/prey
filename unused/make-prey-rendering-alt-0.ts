import {
  ConeGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshPhongMaterial,
  PointLight,
} from "three";

import type { MakePreyRendering } from "./types/MakePreyRendering.js";

export const makePreyRendering: MakePreyRendering = ({ renderingSettings }) => {
  const bottomRadius =
    Math.max(renderingSettings.width, renderingSettings.depth) / 2;
  const topRadius = bottomRadius * 0.3;

  const preyBodyGeometry = new CylinderGeometry(
    topRadius,
    bottomRadius,
    renderingSettings.height / 2,
    64,
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

  const headGeometry = new ConeGeometry(
    0.3,
    0.6,
    64,
  );

  const headMaterial = new MeshPhongMaterial({
    color: renderingSettings.color,

    flatShading: true,
  });

  const head = new Mesh(headGeometry, headMaterial);

  head.position.set(0, 1.8, 0);

  head.rotation.z = Math.PI / 2.1;

  rendering.add(head);

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

import { BoxGeometry, Group, Mesh, MeshPhongMaterial, PointLight } from "three";

import type { MovingThingRenderingSettings } from "./MovingThingRenderingSettings.js";

export const makeMovingThingRendering = (
  { renderingSettings }: { renderingSettings: MovingThingRenderingSettings },
) => {
  const renderingOffset = {
    x: 0 + renderingSettings.side / 2,
    z: 0 + renderingSettings.side / 2,
  };

  const movingThingBodyGeometry = new BoxGeometry(
    renderingSettings.side,
    renderingSettings.height,
    renderingSettings.side,
  );

  const movingThingBodyMaterial = new MeshPhongMaterial({
    color: renderingSettings.color,
    flatShading: true,
  });

  const movingThingBody = new Mesh(
    movingThingBodyGeometry,
    movingThingBodyMaterial,
  );

  movingThingBody.position.set(
    0 + renderingOffset.x,
    renderingSettings.height / 2,
    0 + renderingOffset.z,
  );

  const rendering = new Group();

  rendering.add(movingThingBody);

  const candle = new PointLight(0xf887c7, 40, 8);

  candle.position.set(
    0 + renderingOffset.x,
    renderingSettings.height + 2,
    0 + renderingOffset.z,
  );

  candle.castShadow = true;

  rendering.add(candle);

  return rendering;
};

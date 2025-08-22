import { BoxGeometry, Group, Mesh, MeshPhongMaterial } from "three";

import type { OtherMovingThingRenderingSettings } from "./OtherMovingThingRenderingSettings.js";

export const makeOtherMovingThingRendering = (
  { renderingSettings }: {
    renderingSettings: OtherMovingThingRenderingSettings;
  },
) => {
  const renderingOffset = {
    x: 0 + renderingSettings.side / 2,
    z: 0 + renderingSettings.side / 2,
  };

  const otherMovingThingBodyGeometry = new BoxGeometry(
    renderingSettings.side,
    renderingSettings.height,
    renderingSettings.side,
  );

  const otherMovingThingBodyMaterial = new MeshPhongMaterial({
    color: renderingSettings.color,
    flatShading: true,
  });

  const otherMovingThingBody = new Mesh(
    otherMovingThingBodyGeometry,
    otherMovingThingBodyMaterial,
  );

  otherMovingThingBody.position.set(
    0 + renderingOffset.x,
    renderingSettings.height / 2,
    0 + renderingOffset.z,
  );

  const rendering = new Group();

  rendering.add(otherMovingThingBody);

  return rendering;
};

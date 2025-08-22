import { BoxGeometry, Group, Mesh, MeshPhongMaterial } from "three";

import type { OtherMovingThingRenderingSettings } from "./OtherMovingThingRenderingSettings.js";

export const makeOtherMovingThingRendering = (
  {
    position: {
      x,
      y,
      z,
    },
    renderingSettings,
  }: {
    position: { x: number; y: number; z: number };
    renderingSettings: OtherMovingThingRenderingSettings;
  },
) => {
  const renderingOffset = {
    x: renderingSettings.side / 2,
    z: renderingSettings.side / 2,
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
    renderingOffset.x,
    renderingSettings.height / 2,
    renderingOffset.z,
  );

  const rendering = new Group();

  rendering.position.set(x, y, z);

  rendering.add(otherMovingThingBody);

  return rendering;
};

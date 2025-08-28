import type { CanvasTexture } from "three";

export type MakePreyRenderingTopTexture = (input: {
  color: number | string;
}) => CanvasTexture;

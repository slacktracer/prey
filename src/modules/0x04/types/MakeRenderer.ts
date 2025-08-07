import type { WebGLRenderer } from "three";

export type MakeRenderer = (input: {
  container: HTMLDivElement;
}) => WebGLRenderer;

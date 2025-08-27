import type { Prey } from "./Prey.js";

export type PreySettings = Pick<
  Prey,
  "body" | "position" | "rotateTime" | "speed"
>;

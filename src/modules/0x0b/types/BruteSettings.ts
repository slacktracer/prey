import type { Brute } from "./Brute.js";

export type BruteSettings = Pick<
  Brute,
  "body" | "position" | "speed"
>;

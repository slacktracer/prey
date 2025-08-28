import type { Prey } from "./Prey.js";

export type UpdatePrey = (input: { commands: symbol[]; prey: Prey }) => void;

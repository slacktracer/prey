export type Boot = (
  input: { container: HTMLDivElement; isOther?: boolean },
) => Promise<void>;

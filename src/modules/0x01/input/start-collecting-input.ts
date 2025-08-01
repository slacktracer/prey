export const startCollectingInput = ({ input }) => {
  window.addEventListener("keydown", (event: KeyboardEvent) => {
    input.pressedKeys[event.key] = true;
  });

  window.addEventListener("keyup", (event: KeyboardEvent) => {
    input.pressedKeys[event.key] = false;
  });
};

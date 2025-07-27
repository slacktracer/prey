export const makePerspectiveCameraResizeHandler =
  ({ perspectiveCamera, renderer }) => () => {
    perspectiveCamera.aspect = window.innerWidth / window.innerHeight;

    perspectiveCamera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };

import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";

import type { MakeFin } from "../types/MakeFin.js";

export const makeFin: MakeFin = ({ depth, height }) => {
  // Create a cube squashed in Z axis, rectangular when viewed from Z=0
  const pointerGeometry = new BoxGeometry(
    height * 0.15, // width (narrower for rectangular shape)
    height * 0.3, // height (taller for rectangular shape)
    depth * 0.2, // depth (squashed in Z)
  );

  const pointerMaterial = new MeshPhongMaterial({
    color: 0x2266ff, // Darker blue
    emissive: 0x1144aa, // Darker emissive blue
    emissiveIntensity: 1.2, // Higher intensity for more glow
    opacity: 0.9, // Slightly transparent
    transparent: true, // Enable transparency
    shininess: 100,
    flatShading: false,
  });

  const fin = new Mesh(pointerGeometry, pointerMaterial);

  // Rotate 60 degrees around Z axis (more than 45, angled back like a fin)
  fin.rotation.z = Math.PI / 3;

  // Position just above and towards front of prey (forehead area)
  fin.position.set(
    depth * 0.2, // Move slightly back from front edge
    height + (height * 0.3) / 2 + 0.05, // On top + half pointer height + small gap
    0, // Centered on z
  );

  return fin;
};

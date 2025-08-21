import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";

import type { MakeFin } from "../types/MakeFin.js";

export const makeFin: MakeFin = ({ depth, height }) => {
  const finGeometry = new BoxGeometry(
    height * 0.15,
    height * 0.3,
    depth * 0.2,
  );

  const finMaterial = new MeshPhongMaterial({
    color: 0x2266ff,
    emissive: 0x1144aa,
    emissiveIntensity: 1.2,
    flatShading: false,
    opacity: 0.9,
    shininess: 100,
    transparent: true,
  });

  const fin = new Mesh(finGeometry, finMaterial);

  fin.position.set(depth * 0.2, height + (height * 0.3) / 2 + 0.05, 0);

  fin.rotation.z = Math.PI / 3;

  return fin;
};

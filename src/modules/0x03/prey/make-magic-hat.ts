import {
  Matrix4,
  Mesh,
  MeshPhongMaterial,
  TetrahedronGeometry,
  Vector3,
} from "three";

export const makeMagicHat = ({ height }) => {
  const magicHatGeometry = new TetrahedronGeometry(0.5);

  const magicHatMaterial = new MeshPhongMaterial({
    color: 0xb35e8f,
    flatShading: true,
    transparent: true,
    opacity: 0.9,
  });

  const rotationAxis = new Vector3(1, 0, 1).normalize();

  const rotationAngle = Math.atan(Math.sqrt(2));

  const rotationMatrix = new Matrix4().makeRotationAxis(
    rotationAxis,
    -rotationAngle,
  );

  magicHatGeometry.applyMatrix4(rotationMatrix);

  const magicHat = new Mesh(magicHatGeometry, magicHatMaterial);

  magicHat.position.set(0, height + 0.55, 0);

  return magicHat;
};

/*
This is a very common problem in 3D graphics, as the default orientation of primitives like `TetrahedronGeometry` often isn't what you expect. The rotation values can feel arbitrary and are difficult to figure out by trial and error.

The best way to solve this is to use a mathematical approach rather than guessing Euler angles (`rotation.x`, `rotation.y`, `rotation.z`). The key is to align a specific vector of your tetrahedron to a target vector.

Here are two solid tips on how to do this, ranked from simplest to most robust:

### Tip 1: The "Easy" Way - Directly Rotate the Geometry

The `TetrahedronGeometry` constructor creates the geometry in a specific, often unintuitive orientation. A very effective and common approach is to apply a rotation to the **geometry itself**, not the mesh, right after it's created. This permanently changes the geometry's orientation, so all future rotations of the mesh will be from this new "upright" starting position.

The specific rotation needed to make a `TetrahedronGeometry` point with one vertex straight up (and a face parallel to the ground) is a bit of a classic Three.js puzzle. The rotation is around an axis that's a diagonal of the tetrahedron, and the angle is related to the geometry of the tetrahedron.

Here's the code for that:

```javascript
import { TetrahedronGeometry, Matrix4, Vector3 } from "three";

// Create the geometry
const tetrahedronGeometry = new TetrahedronGeometry(1); // Radius of 1

// Align the tetrahedron so one face is "up" and a vertex is "down"
// This rotation is a one-time operation on the geometry itself.
const rotationAxis = new Vector3(1, 0, -1).normalize();
const rotationAngle = Math.atan(Math.sqrt(2));
const rotationMatrix = new Matrix4().makeRotationAxis(
  rotationAxis,
  -rotationAngle // The negative angle is for "pointing down"
);
tetrahedronGeometry.applyMatrix4(rotationMatrix);

// (Optional) Move the geometry's center so the tip is at y=0
// This makes it easy to position the mesh on the ground plane
tetrahedronGeometry.translate(0, -1, 0); // Assuming a radius of 1

const tetrahedronMesh = new Mesh(tetrahedronGeometry, new MeshBasicMaterial());
// Now, the tetrahedron's local Y-axis is pointing straight up from its bottom vertex.
// You can just use mesh.position to place it where you need it.
```

**Why this works:** The default `TetrahedronGeometry` is not aligned with any of the main axes. This code calculates the specific rotation needed to align one of its faces (and the opposite vertex) with the world's y-axis. By applying this rotation to the geometry itself, you're creating a "new" tetrahedron primitive that's already in the orientation you want.

### Tip 2: The "Flexible" Way - Using Quaternions to Align Vectors

If you need more control and want to align the object based on dynamic data (e.g., an object's normal vector on a surface), you can use quaternions and the `setFromUnitVectors` method. This is a more general-purpose solution.

This approach works by figuring out the tetrahedron's "current" pointing-up direction and the "desired" pointing-up direction, and then creating a quaternion to rotate the object between them.

1.  **Define the initial "down" vector:** We need to know which vector on the default tetrahedron geometry points "down" (or away from the center, towards a vertex). Let's say it's `Vector3(0, -1, 0)`.
2.  **Define the target "down" vector:** This is your desired final direction. Since you want it to point straight down, your target vector is also `Vector3(0, -1, 0)`.
3.  **Use `setFromUnitVectors`:** This method computes a rotation to align one vector with another.

<!-- end list -->

```javascript
import { TetrahedronGeometry, Mesh, MeshBasicMaterial, Quaternion, Vector3 } from "three";

const tetrahedron = new Mesh(
  new TetrahedronGeometry(1),
  new MeshBasicMaterial({ color: 0x00ff00 })
);

// Get a vector that represents the tetrahedron's initial "down" direction
// This might require a little trial and error, or knowing the geometry's vertex data
const initialDownVector = new Vector3(0, 0.5, 0.5).normalize(); // For example, a diagonal
// This will depend on the tetrahedron geometry's specific vertex layout.
// For a default TetrahedronGeometry, it's actually not aligned with a simple axis.
// Let's assume you found a vertex that points "down" for the default geometry.
// For instance, let's say the lowest vertex is at some vector like (0, -0.816, 0.471)
// We need to know the vector that goes from the center (0,0,0) to that vertex.

// The more reliable way to find this is to get the position of the lowest vertex
const geometry = new TetrahedronGeometry(1);
const vertices = geometry.getAttribute('position').array;
// Find the vertex with the lowest Y value
let lowestY = Infinity;
let lowestVertex = new Vector3();
for (let i = 0; i < vertices.length; i += 3) {
  if (vertices[i + 1] < lowestY) {
    lowestY = vertices[i + 1];
    lowestVertex.set(vertices[i], vertices[i + 1], vertices[i + 2]);
  }
}
const initialUpVector = lowestVertex.clone().negate().normalize();

// Define the target "down" vector (pointing straight down in world space)
const targetDownVector = new Vector3(0, -1, 0);

// Create a quaternion to rotate from the initial up vector to the target down vector
const quaternion = new Quaternion();
quaternion.setFromUnitVectors(initialUpVector, targetDownVector);

// Apply the quaternion to the mesh
tetrahedron.quaternion.copy(quaternion);
```

**Why this works:** This method is much more robust because it's based on vectors, not on hard-coded angles. `setFromUnitVectors(v1, v2)` automatically calculates the rotation needed to point the object's local vector `v1` in the direction of the world vector `v2`. This is especially useful if your object's orientation is more complex or you're aligning it to a surface normal.

For your specific case, where you want a static, "pointing down" orientation from the start, **Tip 1 is the most direct and efficient solution**. It's a one-time operation on the geometry and avoids the need for complex vector calculations in your main code.
 */

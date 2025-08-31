import type { Group, Material, Scene } from "three";
import { Light, Mesh, MeshPhongMaterial } from "three";

import { makePreyRendering } from "./make-prey-rendering.js";
import type { MakePreyGhostTrail } from "./types/MakePreyGhostTrail.js";

/**
 * PREY GHOST TRAIL SYSTEM
 *
 * Creates a visual trail effect by spawning translucent "ghost" copies of the prey
 * as it moves through the world. Each ghost copy fades away over time.
 *
 * PERFORMANCE IMPLICATIONS:
 * - NEW RENDERINGS: Yes, each ghost creates a COMPLETE new prey rendering
 *   (geometry + materials + textures). This is expensive but gives perfect fidelity.
 * - NO POOLING: Ghost copies are created/destroyed dynamically. No object reuse.
 * - MEMORY: Each ghost holds references to geometries and materials until disposed.
 * - CPU: Every frame we traverse all ghost children to update opacity/scale.
 * - RENDERING: Each ghost adds draw calls to the GPU (instanced meshes would be better).
 */
export const makePreyGhostTrail: MakePreyGhostTrail = (
  { renderingSettings },
) => {
  const enableGhostGlow = false; // Set to false to disable yellow glow on ghosts
  // GHOST STORAGE: Array holding all active ghost copies with their metadata
  // PERFORMANCE NOTE: Linear array search on every update - O(n) complexity
  const ghostCopies: Array<{
    rendering: Group; // Complete Three.js Group with all prey meshes
    creationTime: number; // Timestamp for age-based fading calculations
    initialOpacity: number; // Base opacity value (0.3) for fade calculations
  }> = [];

  // DISTANCE TRACKING: Stores last position where we created a ghost
  // Used to calculate when prey has moved far enough to spawn new ghost
  let lastGhostPosition = { x: 0, y: 0, z: 0 };

  /**
   * GHOST CREATION FUNCTION
   *
   * PERFORMANCE WARNING: This is the most expensive operation!
   * - Calls makePreyRendering() which creates NEW geometry, materials, textures
   * - Duplicates ALL prey components (body mesh, materials, canvas texture)
   * - NO geometry/material sharing - each ghost is completely independent
   *
   * ALTERNATIVE APPROACHES (not implemented):
   * - Geometry instancing: Share geometry, instance materials
   * - Object pooling: Reuse ghost objects instead of creating new ones
   * - Simplified ghosts: Use basic shapes instead of full prey rendering
   */
  const createGhostCopy = (
    position: { x: number; y: number; z: number },
    rotation: { x: number; y: number; z: number },
  ) => {
    // EXPENSIVE: Creates complete new prey rendering with all geometry/materials/textures
    const ghostRendering = makePreyRendering({ renderingSettings });

    // Set ghost position and rotation to match current prey state
    ghostRendering.position.set(position.x, position.y, position.z);
    ghostRendering.rotation.set(rotation.x, rotation.y, rotation.z);

    // MATERIAL MODIFICATION: Traverse all children to make them ghostly
    // PERFORMANCE NOTE: This traverses the entire object hierarchy
    ghostRendering.traverse((child) => {
      // LIGHT REMOVAL: Remove candle lights from ghost copies
      // Prevents ghosts from casting light and affecting scene lighting
      if (child instanceof Light) {
        child.parent?.remove(child);
        return;
      }

      // MATERIAL GHOSTIFICATION: Make all materials transparent and glowy
      if (child instanceof Mesh && child.material) {
        if (Array.isArray(child.material)) {
          // Handle multi-material meshes (like prey body with different face materials)
          child.material.forEach((mat: Material) => {
            mat.transparent = true;
            mat.opacity = 0.3;
            if (enableGhostGlow && mat instanceof MeshPhongMaterial) {
              mat.emissive.setHex(0x444400); // Yellow-ish glow
            }
          });
        } else {
          // Handle single material meshes
          child.material.transparent = true;
          child.material.opacity = 0.3;
          if (enableGhostGlow && child.material instanceof MeshPhongMaterial) {
            child.material.emissive.setHex(0x444400); // Yellow-ish glow
          }
        }
      }
    });

    // GHOST REGISTRATION: Store ghost data for lifecycle management
    const ghostData = {
      rendering: ghostRendering,
      creationTime: Date.now(), // For age-based fading calculations
      initialOpacity: 0.3, // Base opacity for fade calculations
    };

    ghostCopies.push(ghostData);

    // MEMORY MANAGEMENT: Prevent unbounded growth by removing oldest ghosts
    // PERFORMANCE NOTE: shift() is O(n) operation on arrays
    if (ghostCopies.length > 20) {
      const oldest = ghostCopies.shift();
      if (oldest) {
        // CLEANUP: Remove from scene and let GC handle memory cleanup
        oldest.rendering.parent?.remove(oldest.rendering);
      }
    }

    return ghostRendering;
  };

  /**
   * GHOST LIFECYCLE MANAGEMENT
   *
   * Called every frame to update all active ghosts. Handles fading and cleanup.
   *
   * PERFORMANCE IMPLICATIONS:
   * - CPU INTENSIVE: Traverses ALL ghosts and their children every frame
   * - MATERIAL UPDATES: Changes opacity on every material, triggers GPU state changes
   * - SCALE UPDATES: Modifies transform matrices, triggers GPU uniform updates
   * - GARBAGE COLLECTION: Creates temporary objects during traversal
   *
   * OPTIMIZATION OPPORTUNITIES:
   * - Cache material references instead of traversing each frame
   * - Use object pools to avoid GC pressure
   * - Batch material updates
   * - Use shaders for fading instead of material property changes
   */
  const updateGhostCopies = () => {
    const currentTime = Date.now();
    const copyLifetime = 30000; // 30 seconds until complete fade

    // BACKWARDS ITERATION: Safe removal while iterating
    // PERFORMANCE NOTE: This is O(n) where n = number of active ghosts
    for (let i = ghostCopies.length - 1; i >= 0; i--) {
      const ghost = ghostCopies[i];
      const age = currentTime - ghost.creationTime;

      // FADE CALCULATION: Linear fade from 1.0 to 0.0 over lifetime
      const fadeAmount = Math.max(0, 1 - (age / copyLifetime));

      if (fadeAmount <= 0) {
        // GHOST CLEANUP: Remove completely faded ghosts
        ghost.rendering.parent?.remove(ghost.rendering);
        ghostCopies.splice(i, 1); // PERFORMANCE NOTE: splice() is O(n)
      } else {
        // VISUAL UPDATES: Fade opacity and shrink scale over time
        const opacity = ghost.initialOpacity * fadeAmount;
        const scale = 0.7 + (fadeAmount * 0.3); // Scale from 70% to 100%

        // MATERIAL TRAVERSAL: Update opacity on all materials
        // PERFORMANCE WARNING: This traverses entire ghost hierarchy every frame
        ghost.rendering.traverse((child) => {
          if (child instanceof Mesh && child.material) {
            if (Array.isArray(child.material)) {
              // Multi-material meshes (prey body with face materials)
              child.material.forEach((mat: Material) => {
                mat.opacity = opacity; // GPU state change per material
              });
            } else {
              // Single material meshes
              child.material.opacity = opacity; // GPU state change
            }
          }
        });

        // SCALE UPDATE: Shrink ghost as it fades (visual polish)
        ghost.rendering.scale.setScalar(scale); // GPU uniform update
      }
    }
  };

  /**
   * GHOST SPAWN TRIGGER
   *
   * Called every frame to check if prey has moved far enough to spawn new ghost.
   * Uses distance-based spawning to create evenly spaced trail.
   *
   * PERFORMANCE IMPLICATIONS:
   * - DISTANCE CALCULATION: Square root operation every frame (could use squared distance)
   * - GHOST CREATION: Triggers expensive createGhostCopy() when threshold met
   * - SCENE MODIFICATION: Adds new object to scene graph
   *
   * CURRENT SETTINGS:
   * - Trail distance: 7.5 units (set in animation loop)
   * - Creates sparse trail due to large distance requirement
   */
  const checkAndCreateGhost = (
    currentPosition: { x: number; y: number; z: number },
    currentRotation: { x: number; y: number; z: number },
    scene: Scene,
    trailDistance: number = 1.5,
  ) => {
    // DISTANCE CALCULATION: 3D euclidean distance from last ghost position
    const dx = currentPosition.x - lastGhostPosition.x;
    const dy = currentPosition.y - lastGhostPosition.y;
    const dz = currentPosition.z - lastGhostPosition.z;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

    // SPAWN CHECK: Only create ghost if prey moved far enough
    if (distance >= trailDistance) {
      // EXPENSIVE OPERATION: Create complete new ghost rendering
      const ghostRendering = createGhostCopy(currentPosition, currentRotation);

      // SCENE INTEGRATION: Add ghost to scene graph for rendering
      scene.add(ghostRendering);

      // STATE UPDATE: Remember this position for next distance calculation
      lastGhostPosition = { ...currentPosition };
    }
  };

  return {
    checkAndCreateGhost,
    updateGhostCopies,
  };
};

export const checkCollision = ({ map, position, size = 0.4 }) => {
  // Use the same coordinate system as the original isMovementAllowed
  const xAxisLength = map[0].length;
  const xAxisOffset = xAxisLength % 2 === 0
    ? (xAxisLength - 2) / 2
    : (xAxisLength - 1) / 2;

  const zAxisLength = map.length;
  const zAxisOffset = zAxisLength % 2 === 0
    ? (zAxisLength - 2) / 2
    : (zAxisLength - 1) / 2;

  // Check collision around the prey position
  const minX = Math.floor(position.x - size);
  const maxX = Math.ceil(position.x + size);
  const minZ = Math.floor(position.z - size);
  const maxZ = Math.ceil(position.z + size);

  for (let z = minZ; z <= maxZ; z++) {
    for (let x = minX; x <= maxX; x++) {
      // Convert to map coordinates using offsets
      const mapZ = z + zAxisOffset;
      const mapX = x + xAxisOffset;

      // Check if this grid position exists in the map and is a wall
      if (map[mapZ] && map[mapZ][mapX] === 1) {
        // Check if the prey's bounding circle intersects with this wall cell
        const wallCenterX = x;
        const wallCenterZ = z;

        const distanceX = Math.abs(position.x - wallCenterX);
        const distanceZ = Math.abs(position.z - wallCenterZ);

        // If prey is within collision distance of wall
        if (distanceX < (0.5 + size) && distanceZ < (0.5 + size)) {
          return true; // Collision detected
        }
      }
    }
  }

  return false; // No collision
};

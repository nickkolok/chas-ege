function project3DTo2D(point3D, camera) {
    // Precompute cosines and sines of rotation angles
    const cosX = Math.cos(camera.rotationX),
        sinX = Math.sin(camera.rotationX),
        cosY = Math.cos(camera.rotationY),
        sinY = Math.sin(camera.rotationY),
        cosZ = Math.cos(camera.rotationZ),
        sinZ = Math.sin(camera.rotationZ);

    // Translate the point relative to the camera position
    let dx = point3D.x - camera.x,
        dy = point3D.y - camera.y,
        dz = point3D.z - camera.z;

    // Combine the Z rotation with Y rotation
    const dx_rotZ = dx * cosZ - dy * sinZ,
        dy_rotZ = dx * sinZ + dy * cosZ,
        dx_rotZY = dx_rotZ * cosY - dz * sinY,
        dz_rotZY = dx_rotZ * sinY + dz * cosY;

    // Final combine X rotation and calculate the 2D projection
    const x2D = dx_rotZY * camera.scale;
    const y2D = (dy_rotZ * cosX + dz_rotZY * sinX) * camera.scale;

    return {
        x: x2D,
        y: y2D
    };
}

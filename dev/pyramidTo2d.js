//Писал gptchat
function project3DTo2D(point3D, camera) {
    // Precompute cosines and sines of rotation angles
    const cosY = Math.cos(camera.rotationY),
        sinY = Math.sin(camera.rotationY),
        cosX = Math.cos(camera.rotationX),
        sinX = Math.sin(camera.rotationX),
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

function convertToObjects(coordsArray, keys) {
    return coordsArray.map(coord => {
        let obj = {};
        coord.forEach((value, index) => {
            obj[keys[index]] = value;
        });
        return obj;
    });
}

(function () {
    retryWhileError(function () {
        //однонаправленная матрица соединений сторон
        let matrix = [
            [1],
            [0, 1],
            [1, 0, 1],
            [1, 1, 1, 1],
        ];

        let x = sl(1, 5);
        let y = sl(1, 10);
        let z = sl(1, 5);
        let point3D = [
            [0, 0, 0],
            [x, 0, 0],
            [x, y, 0],
            [0, y, 0],
            [x / 2, y / 2, z],

        ];


        point3D = convertToObjects(point3D, ['x', 'y', 'z']);

        let camera = {
            x: 2,
            y: 3,
            z: 0,
            scale: 40,

            rotationX: Math.PI / 3,
            rotationY: Math.PI,
            rotationZ: Math.PI / 3,
        }; // No rotation for simplicity
        let point2D = point3D.map((coord3D) => project3DTo2D(coord3D, camera));

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;
            ctx.drawCoordinatePlane(w, h, {
                hor: 1,
                ver: 1
            }, {
                x1: '1',
                y1: '1',
                sh1: 16,
            }, 20);

            ctx.fillStyle = "blue";
            ctx.lineWidth = 2;

            matrix.forEach((row, i) => {
                row.forEach((col, j) => {
                    if (col == 1) {
                        ctx.drawLine(point2D[i + 1].x, point2D[i + 1].y, point2D[j].x, point2D[j].y);
                    }
                });
            });

            ctx.fillStyle = "red";
            point2D.forEach((coord) => ctx.drawFilledCircle(coord.x, coord.y, 3));

        };

        NAinfo.requireApiVersion(0, 2);
        NAtask.setTask({
            text: '',
            answers: 0,
            analys: '',
        });
        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    });
})();

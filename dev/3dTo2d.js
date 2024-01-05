//Писал gptchat
function project3DTo2D(point3D, camera) {
    // Precompute cosines and sines of rotation angles
    const cosY = Math.cos(camera.rotationY), sinY = Math.sin(camera.rotationY);
    const cosX = Math.cos(camera.rotationX), sinX = Math.sin(camera.rotationX);
  
    // Directly compute 2D projections in return statement
    return {
      x: ((point3D.x - camera.x) * cosY - (point3D.z - camera.z) * sinY) * camera.scale,
      y: ((point3D.y - camera.y) * cosX + ((point3D.x - camera.x) * sinY + (point3D.z - camera.z) * cosY) * sinX) * camera.scale
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
  
      (function() {
          retryWhileError(function() {
              //однонаправленная матрица соединений сторон
              let matrix = [
                  [1],
                  [0, 1],
                  [1, 0, 1],
                  [1],
                  [0, 1, 0, 0, 1],
                  [0, 0, 1, 0, 0, 1],
                  [0, 0, 0, 1, 1, 0, 1]
              ];
  
              let x = sl(1, 5);
              let y = sl(1, 10);
              let z = sl(1, 10);
              let point3D = [
                  [0, 0, 0],
                  [x, 0, 0],
                  [x, y, 0],
                  [0, y, 0],
  
                  [0, 0, z],
                  [x, 0, z],
                  [x, y, z],
                  [0, y, z],
  
              ];
  
  
              point3D = convertToObjects(point3D, ['x', 'y', 'z']);
  
              let camera = {
                  x: 2,
                  y: 4,
                  z: 0,
                  scale: 40,
  
                  rotationX: Math.PI / 10,
                  rotationY: Math.PI / 10,
              }; // No rotation for simplicity
              let point2D = point3D.map((coord3D) => project3DTo2D(coord3D, camera));
  
              let paint1 = function(ctx) {
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
  
'use strict';
function splineFunc(xArray,yArray,xMin,xMax){
    const Spline = require('cubic-spline');
    let array=[];
    const spline = new Spline(xArray, yArray);
    for (let i = xMin; i <= xMax; i+=0.1) {
        array.push([i,spline.at(i)]);
    }
    return array;
}

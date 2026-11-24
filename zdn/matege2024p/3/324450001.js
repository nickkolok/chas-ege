(function() {
	retryWhileError(function() {

		let a = sl(2, 20);
		let v = a.pow(3) / (24 * (2).sqrt());
		let s = a.pow(2) * (3).sqrt() / 4;
		let h = 0.5 * a / (2).sqrt();

		let question = [
			['объём', v],
			['площадь боковой поверхности', s],
			['высоту', h]
		].iz();

		let paint1 = function(ctx) {
            let pyramid = new RegularPyramid({height: 1 / Math.sqrt(2), baseSide: 1, numberSide: 4});
            let vertices = pyramid.verticesOfFigure;
            let apex = vertices[pyramid.numberSide];
            let cutVertices = vertices.map(vertex => coordinatesMiddleOfSegment3D(vertex, apex));
            let camera = {x:0,y:0,z:0,scale:1,rotationX:-Math.PI/2+Math.PI/9,rotationY:0,rotationZ:Math.PI/5};
            let points = autoScale(vertices, camera, [], {startX:-150,finishX:150,startY:-150,finishY:150,maxScale:200,shrink:true});
            let cutPoints = cutVertices.map(vertex => project3DTo2D(vertex,camera));
            let faces = [[0,1,2,3],[0,1,4],[1,2,4],[2,3,4],[3,0,4]];
            ctx.translateToCenter();
            ctx.lineWidth=2;
            ctx.strokeStyle=om.secondaryBrandColors.iz();
            ctx.drawFigure(points,dashHiddenEdges(pyramid.connectionMatrix,faces,facesVisibility(vertices,points,faces),[5,4]));
            ctx.strokeStyle=om.primaryBrandColors.iz();
            ctx.drawFigure(cutPoints,dashHiddenEdges(pyramid.connectionMatrix,faces,facesVisibility(cutVertices,cutPoints,faces),[5,4]));
        };

		NAtask.setTask({
			text: 'В правильной четырёхугольной пирамиде все рёбра равны $' + a + '$. ' +
				'Найдите ' + question[0] + ' пирамиды, отсечённой плоскостью, проходящей через середины боковых рёбер.',
			answers: question[1],
			author: ['Суматохина Александра'],
		});
		NAtask.modifiers.multiplyAnswerBySqrt(13);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
//324450001

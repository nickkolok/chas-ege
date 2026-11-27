(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letters = ['A', 'B', 'C'];
		let letterWithIndex = letters.map((elem) => elem + '₁');
		let allLet = letters.concat(letterWithIndex);

		let hight = letters.iz();
		hight += hight + '_1';
		let diagonal = letters.iz(2).join('_1');

		let a = sl(1, 20);

		let paint1 = function(ctx) {
			let figure = new RegularPrism({height:1,baseSide:1,numberSide:3});
			let vertices = figure.verticesOfFigure;
			let camera = {x:0,y:0,z:0,scale:1,rotationX:-Math.PI/2+Math.PI/9,rotationY:0,rotationZ:Math.PI/5};
			let points = autoScale(vertices,camera,[],{startX:-150,finishX:150,startY:-150,finishY:150,maxScale:200,shrink:true,center:true});
			let faces = [[0,1,2],[3,4,5],[0,1,4,3],[1,2,5,4],[2,0,3,5]];
			ctx.translateToCenter();
			ctx.lineWidth=2;
			ctx.strokeStyle=om.secondaryBrandColors.iz();
			ctx.drawFigure(points,dashHiddenEdges(figure.connectionMatrix,faces,facesVisibility(vertices,points,faces),[5,4]));
			ctx.font = '20px liberation_sans';
			points.forEach((point,i) => {let label=labelPositionAwayFrom(point,{x:0,y:0},18);ctx.fillText(allLet[i],label.x,label.y);});
		};


		NAtask.setTask({
			text: 'В правильной треугольной призме $ABCA_1B_1C_1$, все рёбра которой равны $' + a +
				'$, найдите угол между прямыми $' + hight + '$ и $' + diagonal + '$.',
			answers: 45,
			analys: '',
		});
		NAtask.modifiers.variativeABC(allLet);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
//956

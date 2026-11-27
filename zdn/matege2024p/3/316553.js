(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = ['A', 'B', 'C', 'D', 'E', 'F'];
		let letterWithIndex = letters.map((elem) => elem + '₁');
		let allLet = letters.concat(letterWithIndex);

		let letterQ = letters.slice().permuteCyclic(sl(0, letters.length - 1));
		letterQ = [letterQ.slice(0, 2).shuffleJoin(), [letterQ[2] + '_1', letterQ[3] + '_1'].shuffleJoin()];

		let edge = [sl(1, 10), sl(1, 20).texfracpi(sl(2, 30)), '|\\arc' + ['sin', 'cos', 'tg', 'ctg'].iz() + '(' + sl(1, 9).texfrac(sl(10, 30)) + ')'+'|', sl(1, 20).texsqrtfrac(sl(2, 30))
		].iz();

		let paint1 = function(ctx) {
			let figure = new RegularPrism({height:1,baseSide:1,numberSide:6});
			let vertices = figure.verticesOfFigure;
			let camera = {x:0,y:0,z:0,scale:1,rotationX:-Math.PI/2+Math.PI/9,rotationY:0,rotationZ:Math.PI/5};
			let points = autoScale(vertices,camera,[],{startX:-150,finishX:150,startY:-150,finishY:150,maxScale:200,shrink:true,center:true});
			let faces = [[0,1,2,3,4,5],[6,7,8,9,10,11],[0,1,7,6],[1,2,8,7],[2,3,9,8],[3,4,10,9],[4,5,11,10],[5,0,6,11]];
			ctx.translateToCenter();
			ctx.lineWidth=2;
			ctx.strokeStyle=om.secondaryBrandColors.iz();
			ctx.drawFigure(points,dashHiddenEdges(figure.connectionMatrix,faces,facesVisibility(vertices,points,faces),[5,4]));
			ctx.font = '20px liberation_sans';
			points.forEach((point,i) => {let label=labelPositionAwayFrom(point,{x:0,y:0},18);ctx.fillText(allLet[i],label.x,label.y);});
		};
		NAtask.setTask({
			text: 'В правильной шестиугольной призме $ABCDEFA_1B_1C_1D_1E_1F_1$, все рёбра которой ' +
				'равны $' + edge + '$, найдите угол между прямыми $' + letterQ[0] + '$ и $' + letterQ[1] +
				'$. Ответ дайте в градусах.',
			answers: 60,
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
//316553 503245 316659 316661 316663 316665 316667 316669 316671 316673 316675 316677 316679 316681 316683 316685 316687 316689 316691 316693 316695 316697 316699 316701 316703 316705 316707 316709 316711 316713 316715 316717 316719 316721 316723 316725 316727 316729 316731 316733 316735 316737 316739 316741 316743 316745 316747 316749

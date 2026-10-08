(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		
		let vertices = latbukv.slice(0, 4);
		let rand = sl1();

		let rhombus = new Rhombus({ 
            length: sl(1,50), 
            angles: { 
                angle: { angleA: slKrome(90, 30, 150) },
                angleInDegree: true,
            },
        });
        
        rhombus.connectVerticesInConnectionMatrix([
			[[0, 2], [1, 3]][rand],
		]);
        
        let angleQ = [[[`A`,`C`].shuffleJoin()+[ `B`, `D`,].iz(), rhombus.angleAInDegrees/2],[[ `B`, `D`,].shuffleJoin() + [ `A`, `C`,].iz(), rhombus.angleBInDegrees/2]][rand];
        angleQ[0]=sl1()?angleQ[0]:angleQ[0].split(``).reverse().join(``);
		
		let points = autoScale(rhombus.rotate(rhombus.angleAInRadians / 2).vertices);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);
			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;
			ctx.lineWidth = 2;
			ctx.drawFigure(points, rhombus.connectionMatrix);
			
			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(vertices[i], elem.x, -elem.y + ((i < 2) ? 25 : -5)));
			
		};
        
		NAtask.setTask({
			text: `В ромбе $ABCD$ угол $${[vertices.slice(0,3), vertices.slice(0,3).permuteCyclic(1)][rand].randomReverse().join('')}$ равен $${[rhombus.angleBInDegrees, rhombus.angleAInDegrees][rand]}^\\circ$. Найдите угол $${angleQ[0]}$. Ответ дайте в градусах.`,
			answers: angleQ[1],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//3353


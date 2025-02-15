(function() {
	retryWhileError(function() {

		let a = sl(2,20);
		
		let paint1 = function(ctx) {
			ctx.translate(0, 500);
			ctx.scale(10, 10);
			ctx.lineWidth = 2 / 15;
			ctx.drawRightPyramid4({
				edge: 21,
				angle: Math.PI / 4,
				height: -23,
				scale: 10,
			}, [0, 2, 5], [1, 0.7]);
			
			ctx.translate(9, -20.54);
			ctx.lineWidth = 3 / 15;
			ctx.drawRightPyramid4({
				edge: 21/2,
				angle: Math.PI / 4,
				height: -23/2,
				scale: 10,
				strokeStyle: om.primaryBrandColors.iz(),
			}, [0, 2, 5], [1, 0.7]);
		};

		NAtask.setTask({
			text: 'В правильной четырёхугольной пирамиде все рёбра равны $'+a+'$. '+
			'Найдите площадь сечения пирамиды плоскостью, проходящей через середины боковых рёбер.',
			answers: a*a/4,
			author: ['Суматохина Александра'],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
//324450 524045 524067 624073 624107 325125 325127 325129 325131 325133 325135 325137 325139 325141 325143 325145 325147 325149 325151 325153 325155 325157 325159 325161 325163 325165 325167 325169 325171 325173 325175 325177 325179 325181 325183 325185 325187 325189 325191 325193 325195 325197 325199 325201 325203

(function() {
	retryWhileError(function() {

		let edge = sl(2, 50);

		let pyr1 = new RegularPyramid({
			height: (0.5).sqrt() * edge,
			baseSide: edge,
			numberSide: 4
		});

		let pyr2 = new RegularPyramid({
			height: 2 * pyr1.height,
			baseSide: 2 * pyr1.baseSide,
			numberSide: 4
		});

		let vertex1 = pyr1.verticesOfFigure.slice();

		vertex1 = vertex1.map((elem) => shiftCoordinate3D(elem,{x:0,y:0,z:(pyr2.verticesOfFigure[0].z - vertex1[0].z)}));

		let strok = [5, 4];

		let matrixPyr1 = [
			[1],
			[0, strok],
			[1, 0, strok],
			[0, 0, 0, 0, ],
		];

		let matrixPyr2 = [
			[1],
			[0, strok],
			[1, 0, strok],
			[1, 1, strok, 1, ],
		];

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 5,

			rotationX: -Math.PI / 2 + Math.PI / 14,
			rotationY: 0,
			rotationZ: [1, 2].iz() * Math.PI / 3,
		};


		let point2DPyr2 = pyr2.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		autoScale(pyr2.verticesOfFigure, camera, point2DPyr2, {
			startX: -180,
			finishX: 160,
			startY: -160,
			finishY: 160,
			maxScale: 50,
		});

		point2DPyr2 = pyr2.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));
		let point2DPyr1 = vertex1.map((coord3D) => project3DTo2D(coord3D, camera));


		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;
			ctx.translate(h / 2, w / 2);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors;
			ctx.drawFigure(point2DPyr1, matrixPyr1);
			ctx.drawFigure(point2DPyr2, matrixPyr2);

		};

		NAtask.setTask({
			text: 'В правильной четырёхугольной пирамиде все рёбра равны $' + pyr2.baseSide + '$. ' +
				'Найдите площадь сечения пирамиды плоскостью, проходящей через середины боковых рёбер.',
			answers: pyr1.baseArea,
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

(function() {
	retryWhileError(function() {

		let v1 = 1;
		let v2 = 0;

		let prism = new RegularPrism({
			height: sl(10, 100),
			baseSide: sl(10, 100)*(3).sqrt(),
			numberSide: 3
		});

		let pyr = new Pyramid({
			height: 0.5*prism.baseSide*(3).sqrt(),
			baseArea: prism.baseSide*prism.height,
		});

		let letter = ['A', 'B', 'C', 'C₁', 'A₁', 'B₁', ];
		let strok = [5, 4];

		let matrixPrism = [
			[1],
			[strok, strok],
			[0,	0, strok],
			[1, 0, 0, 1],
			[0, 1, 0, 1, 1]
		];

		let vert = [
			['A', 'B', 'C',],
			['A_1', 'B_1', 'C_1']
		];
		vert = (v1) ? vert.reverse() : vert;
		vert = vert[0].concat(vert[1].iz(2));

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 5,

			rotationX: -Math.PI / 2 + Math.PI / 14,
			rotationY: 0,
			rotationZ: Math.PI / 4,
		};

		let point2DPar = prism.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		autoScale(prism, camera, point2DPar, {
			startX: -180,
			finishX: 160,
			startY: -160,
			finishY: 160,
			maxScale: 50,
		});

		point2DPar = prism.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;
			ctx.translate(h / 2, w / 2);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.primaryBrandColors[0];
			ctx.strokeStyle = om.secondaryBrandColors;
			ctx.drawFigure(point2DPar, matrixPrism);
			ctx.font = "25px liberation_sans";

			point2DPar.forEach((elem, i) => ctx.fillText(letter[i], elem.x, elem.y + ((i < point2DPar.length / 2) ? 15 : -10)));
		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: ['Найдите ', 'Дана пирамида $' + vert.shuffleJoin('') + '$, площадь основания которой равна $' +
				pyr.baseArea + '$, а высота, проведённая к этому основанию, равна $' + (pyr.height.pow(2)).texsqrt(1) + '$. Найдите '
			][v2],
			questions: [{
				text: 'объём',
				answers: [pyr.volume, prism.volume][v2],
			}, ],
			postquestion: [' многогранника, ' +
				'вершинами которого являются вершины $' + vert.shuffleJoin(', ') +
				'$ правильной треугольной призмы ' +
				'$ABCA_1B_1C_1$, площадь основания которой равна $' + (prism.baseArea.pow(2)).texsqrt(1) + '$, а боковое ребро равно $' + prism.height +
				'$', ' прямой призмы с вершинами $' + ['A', 'B', 'C', 'A_1', 'B_1', 'C_1'].shuffleJoin(', ') + '$'
			][v2] + '.',
			author: ['Суматохина Александра']
		});
		NAtask.modifiers.multiplyAnswerBySqrt(12);
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.assertSaneDecimals();
		NAtask.modifiers.variativeABC(letter);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 100000);
})();
/*
Решу ЕГЭ
245341 266747 266749 266751 266753 266755 266757 266759 266761 266763 266765 266767 266769 266771 266773 266775 266777 266779 266781 266783 266785 266787 266789 266791 266793 266795 266797 266799 266801 266803 266805 266807 266809 266811 266813 266815 266817 266819 266821 266823 266825 266827 266829 266831 266833 266835 266837 266839 266841 266843 266845 266847 266849 266851 266853 266855 266857 266859 266861 266863 266865 266867 266869 266871 266873 266875 266877 266879 266881 266883 266885 266887 266889 266891 266893 266895 266897 266899 266901 266903 266905 266907 266909 266911 266913 266915 266917 266919 266921 266923 266925 266927 266929 266931 266933 266935 266937 266939 266941 266943 266945 266947 266949 266951 266953 266955 266957 266959 266961 266963 266965 266967 266969 266971 266973 266975 266977 266979
*/

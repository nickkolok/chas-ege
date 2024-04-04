(function() {
	retryWhileError(function() {

		let height = sl(10, 50),
			depth = sl(20, 50),
			width = sl(20, 50);

		let par = new Parallelepiped({
			depth: depth,
			height: height,
			width: width
		});
		let pyr = new RectangularPyramidWithRectangleAtBase({
			height: height,
			sideA: width,
			sideB: depth
		});

		let letter = ['A', 'B', 'C', 'D', 'D₁', 'A₁', 'B₁', 'C₁', ];
		let strok = [5, 4];
		let matrixPyr = [
			[0],
			[0, 0],
			[0, 0, 0],
			[0, strok, strok, strok],
		];

		let matrixPar = [
			[strok],
			[0, 1],
			[strok, 0, 1],
			[0, 0, 0, 1],
			[strok, 0, 0, 0, 1],
			[0, 1, 0, 0, 0, 1],
			[0, 0, 1, 0, 1, 0, 1],
		];

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 5,

			rotationX: -Math.PI / 2 + Math.PI / 14,
			rotationY: 0,
			rotationZ: 2 * Math.PI / 3,
		};

		let point2DPar = par.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		autoScale(par, camera, point2DPar, {
			startX: -180,
			finishX: 160,
			startY: -160,
			finishY: 160,
			maxScale: 50,
		});

		point2DPar = par.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		let point2DPyr = pyr.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;
			ctx.translate(h / 2, w / 2);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.primaryBrandColors[0];
			ctx.drawFigure(point2DPyr, matrixPyr);
			ctx.strokeStyle = om.secondaryBrandColors;
			ctx.drawFigure(point2DPar, matrixPar);
			ctx.font = "25px liberation_sans";

			point2DPar.forEach((elem, i) => ctx.fillText(letter[i], elem.x, elem.y + ((i < point2DPar.length / 2) ? 15 : -10)))
		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: 'Найдите ',
			questions: [{
				text: 'объём',
				answers: pyr.volume
			}],
			postquestion: ' многогранника, вершинами которого являются вершины $' + 
			['A', 'B', 'C', 'D', 'A_1'].shuffleJoin(', ') +
				'$ прямоугольного параллелепипеда $ABCDA_1B_1C_1D_1$, у которого ' + 
			['$AB=' + depth + '$', ' $BC=' + width + '$', ' $BB_1=' + height + '$'].shuffleJoin(', ') + '.',
			analys: '$BA_1=' + (pyr.sideEdgeA.pow(2)).texsqrt(1) + '$<br>' + '$DA_1=' + (pyr.sideEdgeB.pow(2)).texsqrt(1) +
				'$' + '<br>' + '$CA_1=' + (pyr.sideEdgeC.pow(2)).texsqrt(1) + '$',
			author: ['Суматохина Александра']
		});
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
245338 264513 265513 525112 525133 548378 265515 265517 265519 265521 265523 
265525 265527 265529 265531 265533 265535 265537 265539 265541 265543 265545 
265547 265549 265551 265553 265555 265557 265559 265561 265563 265565 265567 
265569 265571 265573 265575 265577 265579 265581 265583 265585 265587 265589 
265591 265593 265595 265597 265599 265601 265603 265605 265607 265609 265611 
265613 265615 265617 265619 265621 265623 265625 265627 265629 265631 265633 
265635 265637 265639 265641 265643 265645 265647 265649 265651 265653 265655 
265657 265659 265661 265663 265665 265667 265669 265671 265673 265675 265677 
265679 265681 265683 265685 265687 265689 265691 265693 265695 265697 265699 
265701 265703 265705 265707 265709 265711 265713 265715 265717 265719 265721 
265723 265725 265727 265729 265731 265733 265735 265737 265739 265741 265743 
265745 265747 265749 265751 265753 265755 265757 265759 265761 265763 265765 
265767 265769 265771 265773 265775 265777 265779 265781 265783 265785 265787 
265789 265791 265793 265795 265797 265799 265801 265803 265805 265807 265809 
265811 265813 265815 265817 265819 265821 265823 265825 265827 265829 265831 
265833 265835 265837 265839 265841 265843 265845 265847 265849 265851 265853 
265855 265857 265859 265861 265863 265865 265867 265869 265871 265873 265875 
265877 265879 265881 265883 265885 265887 265889 265891 265893 265895 265897 
265899 265901 265903 265905 265907 265909 265911 265913 265915 265917 265919 
265921 265923 265925 265927 265929 265931 265933 265935 265937 265939 265941 
265943 265945 265947 265949 265951 265953 265955 265957 265959 265961 265963 
265965 265967 265969 265971 265973 265975 265977 265979 265981 265983 265985 
265987 265989 265991 265993 265995 265997 265999 266001 266003 266005 266007 266009 266011
*/

(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		// Прямые призмы с ортогональным сечением: геометрия, подписи и ответ
		// строятся из одного списка вершин. Размеры вырезов строго положительны.
		let preference = ['surface_area', 'volume'];
		let volume = getSelectedPreferenceFromList('7206191', preference) === 1;
		let a = sl(1, 3), b = sl(1, 3), c = sl(1, 3);
		let depth = sl(1, 6), width = a + b + c;
		let low = sl(1, 3), middle = sl(1, 3), high = sl(1, 3);
		let height = low + middle + high;
		// C-образное сечение; ступень; основание с верхним выступом;
		// основание с прямоугольным вырезом в плане; боковой выступ.
		let profiles = [
			[[0,0],[width,0],[width,height],[0,height],[0,low+middle],[a,low+middle],[a,low],[0,low]],
			[[0,0],[width,0],[width,low],[a,low],[a,height],[0,height]],
			[[0,0],[width,0],[width,low],[a+b,low],[a+b,low+middle],[a,low+middle],[a,low],[0,low]],
			[[0,0],[a,0],[a,middle],[a+b,middle],[a+b,0],[width,0],[width,height],[0,height]],
			[[0,0],[a,0],[a,low],[a+b,low],[a+b,low+middle],[a,low+middle],[a,height],[0,height]],
		];
		let preferenceShape = ['c_shaped_section', 'stepped_section', 'top_protrusion', 'rectangular_notch', 'side_protrusion'];
		let selected = getSelectedPreferenceFromList('7206191', preferenceShape);
		let profile = profiles[selected];
		let twiceArea = 0, perimeter = 0;
		profile.forEach(function (p, i) {
			let q = profile[(i + 1) % profile.length];
			twiceArea += p[0] * q[1] - q[0] * p[1];
			perimeter += Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]);
		});
		let area = Math.abs(twiceArea) / 2;
		let answer = volume ? area * depth : 2 * area + perimeter * depth;
		NAtask.setTask({
			text: 'Деталь имеет форму изображённого на рисунке многогранника (все двугранные углы прямые). ' +
				'Числа на рисунке обозначают длины рёбер в сантиметрах. Найдите ' +
				(volume ? 'объём' : 'площадь поверхности') + ' этой детали. Ответ дайте в ' +
				(volume ? 'кубических' : 'квадратных') + ' сантиметрах.',
			answers: answer,
			preference: [preference, preferenceShape],
			analys: 'Деталь — прямая призма. Площадь её сечения $S=' + area + '$, периметр сечения $P=' +
				perimeter + '$, длина перпендикулярного сечению ребра $d=' + depth + '$. ' +
				(volume ? '$V=Sd=' : '$S_{\\text{пов}}=2S+Pd=') + answer + '$.',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 540, height: 480,
			paint: function (ct) {
				let maxZ = Math.max(...profile.map(p => p[1]));
				let scale = Math.min(360 / width, 310 / maxZ);
				let offset = [65, -55];
				let project = p => [65 + p[0] * scale, 395 - p[1] * scale];
				let front = profile.map(project);
				let back = front.map(p => [p[0] + offset[0], p[1] + offset[1]]);
				let visible = profile.map(function (p, i) {
					let q = profile[(i + 1) % profile.length];
					return q[1] - p[1] - (q[0] - p[0]) > 0;
				});
				ct.strokeStyle = om.secondaryBrandColors.iz();
				ct.fillStyle = ct.strokeStyle;
				ct.lineWidth = 2;
				ct.font = '18px serif';
				let line = function (p, q, solid) {
					ct.setLineDash(solid ? [] : [5,4]);
					ct.drawLine(p[0],p[1],q[0],q[1]);
				};
				front.forEach(function (p, i) {
					let j = (i + 1) % front.length;
					line(back[i],back[j],visible[i]);
					line(p,back[i],visible[i] || visible[(i+front.length-1)%front.length]);
				});
				front.forEach(function (p, i) {
					let j = (i+1)%front.length, q = front[j];
					line(p,q,true);
					let length = Math.abs(profile[j][0]-profile[i][0])+Math.abs(profile[j][1]-profile[i][1]);
					let dx = q[0]-p[0], dy = q[1]-p[1], norm = Math.abs(dx)+Math.abs(dy);
					ct.fillText(String(length),(p[0]+q[0])/2-dy/norm*14-5,(p[1]+q[1])/2+dx/norm*14+5);
				});
				ct.setLineDash([]);
				// Верхняя правая вершина: подпись глубины вне сечения.
				let k = profile.findIndex(p => p[0] === Math.max(...profile.map(q=>q[0])) &&
					p[1] === Math.max(...profile.filter(q=>q[0]===p[0]).map(q=>q[1])));
				ct.fillText(String(depth),front[k][0]+35,front[k][1]-33);
			},
		});
	}, 1000);
})();
// 40EDBF, EE651B, 02985D, DA70C8, 1B4F93, 0F67EF, 2D7A61, 450281, E6B40B, C15157, 86869F, 6DF52F, 6E952C, 2422CC, 4FA3F3, D9E5CF, 77C1DF, 3AEB5C, 620DBA, 491685, FA53EE

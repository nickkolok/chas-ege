(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 9, 1);
		let b = slKrome(a, 2, 9, 1);
		let c = sl(2, 9, 1);
		let V = a * b * c;
		let S = 2 * (a * b + b * c + a * c);

		let paint1 = function (ct) {
			// Масштабируем размеры для лучшего отображения
			let scale = 25;
			let width = a * scale;
			let height = c * scale;
			let depth = b * scale * 0.6;
			
			// Угол для 3D эффекта
			let angle = 30 * Math.PI / 180;
			let depthX = depth * Math.cos(angle);
			let depthY = depth * Math.sin(angle);
			
			// Центрируем фигуру
			let offsetX = 200 - (width + depthX) / 2;
			let offsetY = 200 - (height + depthY) / 2;
			
			// Вершины параллелепипеда
			let vertices = [
				[offsetX, offsetY + height],                    // 0: нижний левый ближний
				[offsetX + width, offsetY + height],            // 1: нижний правый ближний
				[offsetX + width + depthX, offsetY + height - depthY],  // 2: нижний правый дальний
				[offsetX + depthX, offsetY + height - depthY],  // 3: нижний левый дальний
				[offsetX, offsetY],                              // 4: верхний левый ближний
				[offsetX + width, offsetY],                      // 5: верхний правый ближний
				[offsetX + width + depthX, offsetY - depthY],   // 6: верхний правый дальний
				[offsetX + depthX, offsetY - depthY]             // 7: верхний левый дальний
			];
			
			// Рёбра (соединения между вершинами)
			let edges = [
				[0, 1], [1, 2], [2, 3], [3, 0],  // нижняя грань
				[4, 5], [5, 6], [6, 7], [7, 4],  // верхняя грань
				[0, 4], [1, 5], [2, 6], [3, 7]   // боковые рёбра
			];
			
			// Скрытые рёбра (пунктиром)
			let hiddenEdges = [0, 3, 7];
			
			ct.strokeStyle = om.secondaryBrandColors.iz();
			ct.lineWidth = 2;
			
			// Рисуем все рёбра
			edges.forEach((edge, index) => {
				let [start, end] = edge;
				ct.beginPath();
				ct.moveTo(vertices[start][0], vertices[start][1]);
				ct.lineTo(vertices[end][0], vertices[end][1]);
				
				if (hiddenEdges.includes(index)) {
					ct.setLineDash([5, 3]);
				} else {
					ct.setLineDash([]);
				}
				
				ct.stroke();
			});
			
			ct.setLineDash([]);
		};

		NAtask.setTask({
			text: 'Два ребра прямоугольного параллелепипеда равны $' + a + '$ и $' + b + '$, а объём параллелепипеда равен $' + V + '$. Найдите площадь поверхности этого параллелепипеда.',
			answers: S,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=515838

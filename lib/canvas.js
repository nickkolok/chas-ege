'use strict';

CanvasRenderingContext2D.prototype.drawLine=function(x1,y1,x2,y2){
	this.beginPath();
	this.moveTo(x1,y1);
	this.lineTo(x2,y2);
	this.stroke();
	this.closePath();
}

/**
 * Рисует ломаную через последовательные точки (xs[i], ys[i])
 * в текущей системе координат контекста.
 * Соседние точки соединяются отрезками; стиль — текущие strokeStyle и lineWidth.
 * Если задан dotRadius, в каждой вершине рисуется закрашенная точка
 * (точка i, затем отрезок к i+1 — как в шаблонах графиков задания 7).
 * Если массивы разной длины или среди координат есть не конечные числа (NaN, undefined…),
 * в консоль выводится предупреждение, а рисование идёт как обычно.
 * @param {number[]} xs - абсциссы точек
 * @param {number[]} ys - ординаты точек (массив той же длины, что и xs)
 * @param {number} [dotRadius] - радиус точек в вершинах в текущих координатах; без него точек нет
 * @example
 * ctx.drawPolyline(time, value);//график по массивам времён и значений
 * ctx.drawPolyline(time, value, 3 / cell);//то же с точками в вершинах
 */
CanvasRenderingContext2D.prototype.drawPolyline = function (xs, ys, dotRadius) {
	if (xs.length !== ys.length || !xs.concat(ys).every(Number.isFinite)) {
		console.warn('drawPolyline: ожидаются массивы конечных чисел одной длины, получены', xs, ys);
	}
	for (let i = 0; i < xs.length; i++) {
		if (dotRadius !== undefined) {
			this.drawFilledCircle(xs[i], ys[i], dotRadius);
		}
		if (i < xs.length - 1) {
			this.drawLine(xs[i], ys[i], xs[i + 1], ys[i + 1]);
		}
	}
};

/**
 * Переносит начало координат в центр холста.
 * Размеры берутся из самого холста (`this.canvas.width`/`this.canvas.height`),
 * поэтому в `paint` не нужно дублировать `width`/`height` из `addCanvasIllustration`.
 * @example
 * ctx.translateToCenter();//начало координат — в центре холста
 */
CanvasRenderingContext2D.prototype.translateToCenter = function() {
	this.translate(this.canvas.width / 2, this.canvas.height / 2);
};
CanvasRenderingContext2D.prototype.regularGrid=
CanvasRenderingContext2D.prototype.setka=function(squareSide,squaresQuantity){
	for(var i=-squaresQuantity;i<=squaresQuantity;i++){
		this.drawLine(-squareSide*squaresQuantity,squareSide*i,squareSide*squaresQuantity,squareSide*i);
		this.drawLine(squareSide*i,-squareSide*squaresQuantity,squareSide*i,squareSide*squaresQuantity);
	}
}

/**
 * Готовит «клетчатую бумагу»: белый фон, серая сетка, начало координат
 * в центре холста, затем масштабирование в единицы клетки (ось Y вверх).
 * После вызова координаты фигур задаются в клетках, а не в пикселях;
 * толщину линий фигуры задавайте как lineWidth / cell.
 * @param {number} cell - сторона клетки в пикселях.
 * @param {number} cells - сколько клеток рисовать от центра в каждую сторону.
 * @example
 * ctx.gridPaper(30, 6);//клетка 30 px, сетка ±6 клеток
 * ctx.strokeStyle = om.secondaryBrandColors[0];
 * ctx.lineWidth = 4 / 30;
 * ctx.drawFigure(figure.vertices, figure.connectionMatrix);
 */
CanvasRenderingContext2D.prototype.gridPaper = function(cell, cells) {
	this.fillStyle = '#fff';
	this.fillRect(0, 0, this.canvas.width, this.canvas.height);
	this.strokeStyle = '#888';
	this.lineWidth = 1;
	this.translateToCenter();
	this.regularGrid(cell, cells);
	this.scale(cell, -cell);
};

CanvasRenderingContext2D.prototype.setkaXY=function(s,n1,n2,n3,n4){
	for(var i=n1;i<=n2;i++){
		this.drawLine(s*i,s*n3,s*i,s*n4);
	}
	for(i=n3;i<=n4;i++){
		this.drawLine(s*n1,s*i,s*n2,s*i);
	}
}
CanvasRenderingContext2D.prototype.drawFilledCircle=
CanvasRenderingContext2D.prototype.fillKrug=function(x,y,radius){
	this.beginPath();
	this.arc(x,y, radius, 0, 2*Math.PI, false);
	this.fill();
}

/**
 * Закрашивает кольцо между двумя концентрическими окружностями.
 * Внутренний круг остаётся незакрашенным (правило evenodd).
 * Цвет заливки — текущий this.fillStyle.
 * @param {number} x - координата центра по X.
 * @param {number} y - координата центра по Y.
 * @param {number} outerRadius - радиус внешней окружности.
 * @param {number} innerRadius - радиус внутренней окружности.
 * @example
 * ctx.fillStyle = '#b0b0b0';
 * ctx.fillRing(0, 0, 130, 52);//кольцо с центром в (0, 0)
 */
CanvasRenderingContext2D.prototype.fillRing = function(x, y, outerRadius, innerRadius) {
	this.beginPath();
	this.arc(x, y, outerRadius, 0, 2 * Math.PI);
	this.moveTo(x + innerRadius, y);
	this.arc(x, y, innerRadius, 0, 2 * Math.PI);
	this.fill('evenodd');
};

/**
 * Рисует окружность.
 * @param {number} x - координата центра окружности по оси X. Если передан только один аргумент, считается радиусом, а центр — в точке (0, 0).
 * @param {number} [y] - координата центра окружности по оси Y.
 * @param {number} [radius] - радиус окружности. Обязателен, если передано три аргумента.
 * @example
 * ctx.drawCircle(50);//рисует окружность радиуса 50 с центром в (0, 0)
 * ctx.drawCircle(100, 100, 50);//рисует окружность радиуса 50 с центром в (100, 100)
 */
CanvasRenderingContext2D.prototype.drawCircle = function(x, y, radius) {
		if (arguments.length === 1) {
			radius = x;
			x = 0;
			y = 0;
		}
		this.beginPath();
		this.arc(x, y, radius, 0, 2 * Math.PI);
		this.stroke();
		this.closePath();
	};

CanvasRenderingContext2D.prototype.drawArc = function(x, y, radius, startAngle, endAngle, anticlockwise) {
	anticlockwise = !!anticlockwise;
	this.beginPath();
	this.arc(x, y, radius, startAngle, endAngle, anticlockwise);
	this.stroke();
	this.closePath();
};

CanvasRenderingContext2D.prototype.drawEllipse = function (
	x,
	y,
	radiusX,
	radiusY,
	rotation = 0,
	startAngle = 0,
	endAngle = 2 * Math.PI,
	anticlockwise = false
) {
	anticlockwise = !!anticlockwise;
	this.beginPath();
	this.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
	this.stroke();
	this.closePath();
};

CanvasRenderingContext2D.prototype.arcBetweenSegments = function(coordinates, radius, drawRightAngle) {
	radius = radius || 20;
	drawRightAngle = drawRightAngle || false;

	let XY = [];
	for (let i = 0; i < coordinates.length; i += 2) {
		XY.push({
			x: coordinates[i],
			y: coordinates[i + 1]
		});
	}
	let x, y, angle1;
	switch (XY.length) {
	case 3:
		angle1 = XY.slice(0, 2).reverse().mt_arctgUnakl();
		x = coordinates[2];
		y = coordinates[3];
		break;
	case 4:
		angle1 = XY.slice(0, XY.length / 2).mt_arctgUnakl();
		let result = XY.mt_coordinatesOfIntersectionOfTwoSegments();
		x = result.x;
		y = result.y;
	}
	
	let angle2 = XY.slice(XY.length / 2, XY.length).mt_arctgUnakl();

	// Угол между сторонами (от 0 до π). Разность модулей направлений
	// |angle1| - |angle2| для этого не годится: при сторонах, не параллельных осям,
	// она принимала тупой угол за прямой, а прямой — за острый
	let between = Math.atan2(Math.sin(angle1 - angle2), Math.cos(angle1 - angle2)).abs();
	let diffangle = (angle1 - angle2).abs();

	if (drawRightAngle || (between - Math.PI / 2).abs() < 0.05) {
		this.drawLineAtAngle(x + angle1.cos() * radius,y + angle1.sin() * radius, angle2, radius);
		this.drawLineAtAngle(x + angle2.cos() * radius,y + angle2.sin() * radius, angle1, radius);
	} else {
		const startAngle = (diffangle > Math.PI) ? Math.max(angle1, angle2) : Math.min(angle1, angle2);
		const endAngle = (diffangle > Math.PI) ? Math.min(angle1, angle2) : Math.max(angle1, angle2);
		this.drawArc(x, y, radius, startAngle, endAngle);
	}
};

CanvasRenderingContext2D.prototype.arcBetweenSegmentsCount = function(coordinates, radius, number, step) {
	step = step || 5;
	for (let i = 0; i < number; i++)
		this.arcBetweenSegments(coordinates, radius + i * step);
};

/**
 * Рисует внешний угол при вершине фигуры: продлевает сторону previous→vertex
 * за вершину на rayLength и рисует дугу между продлением и стороной vertex→next.
 * Вызывать в том же положении контекста, что и ctx.drawFigure (ось Y отражена).
 * Продление рисуется текущим strokeStyle, дуга — arcStrokeStyle, если он задан.
 * @param {Object} previous - точка, из которой приходит сторона (например, points[0])
 * @param {Object} vertex - вершина, при которой отмечен внешний угол (например, points[1])
 * @param {Object} next - точка, куда идёт вторая сторона угла (например, points[2])
 * @param {Object} [options] - radius: радиус дуги (по умолчанию 20),
 * rayLength: длина продления стороны (по умолчанию 40), arcStrokeStyle: цвет дуги
 * @returns {Object} конец продления стороны — например, чтобы подписать точку
 * @example
 * ctx.drawExternalAngle(points[0], points[1], points[2], {radius: 15, rayLength: 40});
 */
CanvasRenderingContext2D.prototype.drawExternalAngle = function(previous, vertex, next, {radius = 20, rayLength = 40, arcStrokeStyle} = {}) {
	const ray = this.drawLineAtAngle(vertex.x, vertex.y, [previous, vertex].mt_arctgUnakl(), rayLength);
	const strokeStyle = this.strokeStyle;
	if (arcStrokeStyle !== undefined)
		this.strokeStyle = arcStrokeStyle;
	this.arcBetweenSegments([next.x, next.y, vertex.x, vertex.y, ray.x, ray.y], radius);
	this.strokeStyle = strokeStyle;
	return ray;
};

CanvasRenderingContext2D.prototype.drawLineSpec=function(x1,y1,x2,y2){
	var m = (x1-x2);
	var n = (y1-y2);
	var k = (n/m);

	if(x1==x2){
		for(var iy = Math.min(y1,y2); iy < Math.max(y1,y2); iy += 14){
			this.drawLine(x1,iy,x1,iy+7);
		}
	}

	if(y1==y2){
		for(var ix = Math.min(x1,x2); ix < Math.max(x1,x2); ix += 14){
			this.drawLine(ix, y1, ix+7, y1);
		}
	}

	if((x2>x1)&(y2>y1)){
		for (var ix=x1+7; ix<x2; ix+=14){
			this.drawLine(ix, y1+ix-x1, ix+7, y1+ix-x1+7);
		}
	}

	if((x2>x1)&(y2<y1)){
		for (var ix=x1+7; ix<x2; ix+=14){
			this.drawLine(ix, y1-ix-x1, ix+7, y1-ix-x1-7);
		}
	}

	if((x2<x1)&(y2<y1)){
		for (var ix=x2+7; ix<x1; ix+=14){
			this.drawLine(ix, y2+ix-x2, ix+7, y2+ix-x2+7);
		}
	}

	if((x2<x1)&(y2>y1)){
		for (var ix=x2+7; ix<x1; ix+=14){
			this.drawLine(ix, y2-ix+x2, ix+7, y2-ix+x2-7);
		}
	}
}

CanvasRenderingContext2D.prototype.drawArrow=function(x1, y1, x2, y2, arrowType) {
	var startA = 10;
	var startB = 3.75;
	var startC = Math.sqrt(Math.pow(startA, 2) + Math.pow(startB, 2));
	var change_arrow_radians = Math.atan2(startB, startA);
	//Calculate the change of the arrow head (i.e. horizontal, vertical or diagonal)
	var change_x_main = Math.abs(x1 - x2); //Adjacent
	var change_y_main = Math.abs(y1 - y2); //Opposite
	var change_angle_radians = Math.atan2(change_y_main, change_x_main);
	var change_angle_degrees = change_angle_radians * ( 180 / Math.PI);
	var change_x_0_arrowhead = Math.cos(change_angle_radians + change_arrow_radians) * startC;
	var change_y_0_arrowhead = Math.sin(change_angle_radians + change_arrow_radians) * startC;
	var change_x_1_arrowhead = Math.cos(change_angle_radians - change_arrow_radians) * startC;
	var change_y_1_arrowhead = Math.sin(change_angle_radians - change_arrow_radians) * startC;
	this.beginPath();

	/*Determines type of arrow*/
	if (arrowType == true) {
		if (((x1 < x2) && (y1 > y2)) || ((x1 == x2) && (y1 > y2))) {
			this.moveTo(x1, y1);
			this.lineTo(x2, y2);
			this.moveTo(x1 + change_x_0_arrowhead, y1 - change_y_0_arrowhead);
			this.lineTo(x1, y1);
			this.lineTo(x1 + change_x_1_arrowhead, y1 - change_y_1_arrowhead);
		} else if ((x1 > x2) && (y1 > y2)) {
			this.moveTo(x1, y1);
			this.lineTo(x2, y2);
			this.moveTo(x1 - change_x_0_arrowhead, y1 - change_y_0_arrowhead);
			this.lineTo(x1, y1);
			this.lineTo(x1 - change_x_1_arrowhead, y1 - change_y_1_arrowhead);
		} else if (((x1 < x2) && (y1 < y2)) || ((x1 < x2) && (y1 == y2))) {
			this.moveTo(x1, y1);
			this.lineTo(x2, y2);
			this.moveTo(x1 + change_x_0_arrowhead, y1 + change_y_0_arrowhead);
			this.lineTo(x1, y1);
			this.lineTo(x1 + change_x_1_arrowhead, y1 + change_y_1_arrowhead);
		} else if (((x1 > x2) && (y1 < y2)) || ((x1 > x2) && (y1 == y2)) || ((x1 == x2) && (y1 < y2))) {
			this.moveTo(x1, y1);
			this.lineTo(x2, y2);
			this.moveTo(x1 - change_x_0_arrowhead, y1 + change_y_0_arrowhead);
			this.lineTo(x1, y1);
			this.lineTo(x1 - change_x_1_arrowhead, y1 + change_y_1_arrowhead);
		}
	}else { //To the outside of the circle
		if (((x1 < x2) && (y1 > y2)) || ((x1 < x2) && (y1 == y2)) || ((x1 == x2) && (y1 > y2))) {
			this.moveTo(x1, y1);
			this.lineTo(x2, y2);
			this.moveTo(x2 - change_x_0_arrowhead, y2 + change_y_0_arrowhead);
			this.lineTo(x2, y2);
			this.lineTo(x2 - change_x_1_arrowhead, y2 + change_y_1_arrowhead);
		} else if (((x1 > x2) && (y1 > y2)) || ((x1 > x2) && (y1 == y2))){
			this.moveTo(x1, y1);
			this.lineTo(x2, y2);
			this.moveTo(x2 + change_x_0_arrowhead, y2 + change_y_0_arrowhead);
			this.lineTo(x2, y2);
			this.lineTo(x2 + change_x_1_arrowhead, y2 + change_y_1_arrowhead);
		} else if (x1 < x2 && y1 < y2){
			this.moveTo(x1, y1);
			this.lineTo(x2, y2);
			this.moveTo(x2 - change_x_0_arrowhead, y2 - change_y_0_arrowhead);
			this.lineTo(x2, y2);
			this.lineTo(x2 - change_x_1_arrowhead, y2 - change_y_1_arrowhead);
		} else if (((x1 > x2) && (y1 < y2)) || ((x1 == x2) && (y1 < y2))) {
			this.moveTo(x1, y1);
			this.lineTo(x2, y2);
			this.moveTo(x2 + change_x_0_arrowhead, y2 - change_y_0_arrowhead);
			this.lineTo(x2, y2);
			this.lineTo(x2 + change_x_1_arrowhead, y2 - change_y_1_arrowhead);
		}
	}
	this.stroke();
}
CanvasRenderingContext2D.prototype.drawCoordPlane =
CanvasRenderingContext2D.prototype.drawCoordinatePlane = function(width, height, cell, text, scale) {
	//cell объект с полями: hor,ver
	//text объект с полями: x1,y1,sh1,sh2 (единичные отрезки и размер шрифта к ним)
	//sh1, sh2 по умолчанию 12px
	//scale - масштаб, по умолчанию scale=1
	if(scale!=undefined){
		cell.hor *= scale;
		cell.ver *= scale;}
	let widthHalf = (width / 2) % (cell.hor);
	let heightHalf = (height / 2) % (cell.ver);
	this.lineWidth = 0.5;
	this.irregularGrid(width, height, cell.hor, cell.ver);
	this.translate(width / 2 - widthHalf, height / 2 - heightHalf);
	//стрелки
	this.lineWidth = 1.5;
	this.drawArrow(0, height / 2 + heightHalf - 10, 0, -height / 2 + heightHalf + 10);
	this.drawArrow(-width / 2 + widthHalf + 10, 0, width / 2 + widthHalf - 10, 0);
	this.font = "12px liberation_sans";
	this.fillText(`x`, width / 2 + widthHalf - 20, 15);
	this.fillText(`y`, -15, -height / 2 + heightHalf + 20);
	//единичные отрезки
	this.font = "12px liberation_sans";
	this.fillText("0", -10, 12);
	this.drawLine(cell.hor, 5, cell.hor, -5);
	this.drawLine(-5, -cell.ver, 5, -cell.ver);
	this.font = '' + (text.sh1 || 12) + 'px liberation_sans';
	this.fillText(text.x1, cell.hor, 15);
	this.font = '' + (text.sh2 || 12) + 'px liberation_sans';
	this.fillText(text.y1, -15, -cell.ver);
};
CanvasRenderingContext2D.prototype.setkaVer2 =
CanvasRenderingContext2D.prototype.irregularGrid = function(width, height, cellWidth, cellHeight, scale) {
	if(scale === undefined)
		scale = 1;
	else{
		cellWidth *= scale;
		cellHeight *= scale;
	}
	for (let i = 0; i < width; i += cellWidth)
		this.drawLine(i, 0, i, height);
	for (let i = 0; i < height; i += cellHeight)
		this.drawLine(0, i, width, i);
};

/**
 * Рисует координатную сетку с осями и подписями
 * @param {Object} options - Объект с настройками сетки
 * @param {number} [options.gridWidth=800] - Ширина сетки в пикселях
 * @param {number} [options.gridHeight=390] - Высота сетки в пикселях
 * @param {number} [options.cellWidth=30] - Ширина одной ячейки в пикселях
 * @param {number} [options.cellHeight=30] - Высота одной ячейки в пикселях
 * @param {number} [options.stepX=1] - Шаг подписей по оси X
 * @param {number} [options.stepY=1] - Шаг подписей по оси Y
 * @param {number} [options.maxX=24] - Максимальное значение по оси X
 * @param {number} [options.maxY=11] - Максимальное значение по оси Y
 * @param {number} [options.stepByCeilX=1] - Количество ячеек между подписями по X
 * @param {number} [options.stepByCeilY=1] - Количество ячеек между подписями по Y
 * @param {number} [options.lineWidth=0.5] - Толщина линий сетки
 * @param {number} [options.arrowLineWidth=3] - Толщина линий осей
 * @param {string} [options.fontSize="12px serif"] - Стиль шрифта для подписей
 * @param {string} [options.textAlign='center'] - Выравнивание текста
 * @param {string} [options.textBaseline='middle'] - Базовая линия текста
 * @param {number} [options.arrowLengthX=24.5] - Длина оси X в ячейках
 * @param {number} [options.arrowLengthY=11.5] - Длина оси Y в ячейках
 * @param {number} [options.textOffsetX=20] - Смещение подписей по оси X
 * @param {number} [options.textOffsetY=20] - Смещение подписей по оси Y
 * @param {number} [options.tickSize=7] - Размер засечек на осях
 * @param {string} [options.typeX='standard'] - Тип подписей оси X: 'standard' (числа), 'time' (часы) или 'custom' (произвольные подписи из labelsX)
 * @param {string[]} [options.labelsX=[]] - Подписи оси X для typeX='custom' по порядку засечек, начиная с minX
 * @param {number[]} [options.gridLineDash=[]] - Пунктир линий сетки (например, [3, 3]); оси и засечки рисуются так же, как без опции
 * @returns {{originX: number, originY: number}} Точка пересечения осей в координатах контекста
 *          на момент вызова (`cellWidth`, `gridHeight - 2 * cellHeight`). В неё шаблон переводит
 *          начало координат, чтобы не пересчитывать это по размерам сетки самому.
 *          У этой точки подписи `minX` и `minY`, а на одну клетку приходится `stepX` единиц
 *          по горизонтали и `stepY` по вертикали. Поэтому после `ctx.translate(originX, originY)`
 *          и `ctx.scale(cellWidth, -cellHeight)` значение (x, y) рисуется в точке
 *          ((x - minX) / stepX, (y - minY) / stepY); при значениях по умолчанию — в (x, y).
 * @example
 * // Рисование сетки с настройками по умолчанию
 * ctx.drawGridWithArrows();
 * 
 * // Рисование сетки с кастомными настройками
 * ctx.drawGridWithArrows({
 *   gridWidth: 760,
 *   gridHeight: 390,
 *   cellWidth: 25,
 *   cellHeight: 25,
 *   stepX: 2,
 *   stepY: 2,
 *   maxX: 20,
 *   maxY: 15
 * });
 *
 * // Точка пересечения осей — начало координат, единица — клетка
 * // (minX = minY = 0, stepX = stepY = 1 — значения по умолчанию):
 * const origin = ctx.drawGridWithArrows({ gridWidth: 460, gridHeight: 440, cellWidth: 40, cellHeight: 40 });
 * ctx.translate(origin.originX, origin.originY);
 * ctx.scale(40, -40);
 */
CanvasRenderingContext2D.prototype.drawGridWithArrows = function(options = {}) {
	const {
			gridWidth = 800,
			gridHeight = 390,
			cellWidth = 30,
			cellHeight = 30,
			stepX = 1,
			stepY = 1,
			minX = 0,
        	minY = 0,  
			maxX = 24,
			maxY = 11,
			stepByCeilX = 1,
			stepByCeilY = 1,
			typeX = 'standard', // time, 
			typeY = 'standard', // time, 
			cycleTime = false, // 24:00 -> 0:00
			lineWidth = 0.5,
			arrowLineWidth = 3,
			fontSize = "12px serif",
			textAlign = 'center',
			textBaseline = 'middle',
			arrowLengthX = 24.5,
			arrowLengthY = 11.5,
			textOffsetX = 20,
			textOffsetY = 20,
			tickSize = 7,
			labelsX = [],
			gridLineDash = [],
	} = options;

	// Сохраняем исходное состояние контекста
	this.save();
	
	let translateX = cellWidth;
	let translateY = -cellHeight;
	let	arrowOffsetX = cellWidth;

	// Рисуем основную сетку
	this.lineWidth = lineWidth;
	this.translate(translateX, translateY);
	// Пунктир — только у сетки; без опции пунктир контекста не трогаем вовсе
	const dashedGrid = gridLineDash.length > 0 && this.setLineDash;
	if (dashedGrid) {
		this.save();
		this.setLineDash(gridLineDash);
	}
	if (this.irregularGrid) {
		this.irregularGrid(gridWidth, gridHeight - cellHeight, cellWidth, cellHeight);
	}
	if (dashedGrid) {
		this.restore();
	}

	// Вычисляем смещение для осей (оставляем одну клетку снизу)
	const axisOffsetY = gridHeight - cellHeight;

	// Рисуем оси
	this.translate(0, axisOffsetY);
	this.scale(1, -1);
	this.lineWidth = arrowLineWidth;
	this.translate(arrowOffsetX, 0);

	// Ось X
	if (this.drawArrow) {
		this.drawArrow(-cellWidth, 0, cellWidth * arrowLengthX, 0);
		this.drawArrow(-cellWidth, 0, -cellWidth, cellHeight * arrowLengthY);
	}

	// Подписи по оси X
	this.textAlign = textAlign;
	this.textBaseline = textBaseline;
	this.font = fontSize;
	this.scale(1, -1);

	let step1 = minX;
	let tickIndexX = 0;
	this.translate(-arrowOffsetX, 0);
	this.lineWidth = 1;
	for (let i = 0; i < gridWidth && step1 <= maxX; i += cellWidth * stepByCeilX) {
		let label;

		if (typeX === 'custom') {
			label = labelsX[tickIndexX] !== undefined ? labelsX[tickIndexX] : '';
		} else if (typeX === 'time') {
			label = `${cycleTime? step1%24: step1}:00`;
		} else {
			label = step1.ts();
		}

		this.fillText(label, i, textOffsetY);
		step1 += stepX * stepByCeilX;
		tickIndexX++;
		if (this.drawLine) {
			this.drawLine(i, tickSize, i, -tickSize);
		}
	}

	// Подписи по оси Y
	let step2 = minY;
	for (let i = 0; i > -gridHeight && step2 <= maxY; i -= cellHeight * stepByCeilY) {
		let label;

		if (typeY === 'time') {
			label = `${cycleTime? step2%24: step2}:00`;
		} else {
			label = step2.ts();
		}

		this.fillText(label, -textOffsetX, i);
		step2 += stepY * stepByCeilY;
		if (this.drawLine) {
			this.drawLine(-tickSize, i, tickSize, i);
		}
	}

	// Восстанавливаем исходное состояние контекста
	this.restore();

	// Точка пересечения осей в координатах контекста на момент вызова:
	// сетка сдвинута на (cellWidth, -cellHeight), ось X — ещё на gridHeight - cellHeight вниз.
	// Отдаём её наружу, чтобы шаблон не пересчитывал то же самое через gridHeight и cellHeight.
	return {
		originX: cellWidth,
		originY: gridHeight - 2 * cellHeight,
	};
};

CanvasRenderingContext2D.prototype.drawRightPyramid3 = function(o, dottedLine, setLineDash, drawHeight, drawApothem) {
	/** Функция отрисовки правильной треугольной пирамиды
		 * 	@param {Object} o с полями:
				@param {Number} edge - длина стороны основания
				@param {Number} height - длина высоты пирамиды, по умолчанию 2 * o.edge
				@param {Number} angle - угол, на который будет повернута к наблюдателю пирамида, по умолчанию Math.PI / 6

			необязательные параметры:
			@param {Number} dottedLine - номера сторон, которые должны быть пунктиром, по умолчанию []
			@param {Array} setLineDash - задаёт длину и частоту пунктира, по умолчанию [5, 2]
			@param {Boolean} drawHeight - отрисовка высоты пирамиды, по умолчанию false
			@param {Boolean} drawApothem - отрисовка апофемы пирамиды, по умолчанию false
	*/
	o.height = o.height || 2 * o.edge;
	dottedLine = dottedLine || [];
	setLineDash = setLineDash || [5, 2];

	while (o.angle > Math.PI)
		o.angle -= Math.PI;

	if (o.angle === undefined || o.angle == Math.PI / 2 )
		o.angle = Math.PI / 6;

	let edgeCoordinates = [
		[0, -o.edge, o.edge, -o.edge], //нижняя 0
		[0, -o.edge, o.edge * o.angle.cos(), -o.edge * o.angle.sin()], //левая 1
		[o.edge * o.angle.cos(), -o.edge * o.angle.sin(), o.edge, -o.edge], //правая 2
		[0, -o.edge, (o.edge * o.angle.cos() + o.edge) / 3, (-o.edge * o.angle.sin() - 2 * o.edge) / 3 + o.height], //левая к вершине3
		[o.edge, -o.edge, (o.edge * o.angle.cos() + o.edge) / 3, (-o.edge * o.angle.sin() - 2 * o.edge) / 3 + o.height], //правая к вершине 4
		[o.edge * o.angle.cos(), -o.edge * o.angle.sin(), (o.edge * o.angle.cos() + o.edge) / 3, (-o.edge * o.angle.sin() - 2 * o.edge) / 3 + o.height] //верхняя к вершине 5

	];

	if (drawHeight) {
		this.setLineDash(setLineDash);
		this.drawLine((o.edge * o.angle.cos() + o.edge) / 3, (-o.edge * o.angle.sin() - 2 * o.edge) / 3, (o.edge * o.angle.cos() + o.edge) / 3, (-o.edge * o.angle.sin() - 2 * o.edge) / 3 + o.height);
		this.drawLine(o.edge * o.angle.cos(), -o.edge * o.angle.sin(), o.edge / 2, -o.edge); //нижняя
		this.drawLine(0, -o.edge, 0.5 * (o.edge + o.edge * o.angle.cos()), 0.5 * (-o.edge - o.edge * o.angle.sin())); //правая
		this.drawLine(o.edge, -o.edge, 0.5 * o.edge * o.angle.cos(), 0.5 * (-o.edge - o.edge * o.angle.sin())); //левая
		this.setLineDash([]);
	}

	if (drawApothem) {
		this.drawLine(o.edge / 2, -o.edge, (o.edge * o.angle.cos() + o.edge) / 3, (-o.edge * o.angle.sin() - 2 * o.edge) /3 + o.height);
  }

	for (let i = 0; i < edgeCoordinates.length; i++) {
		if (dottedLine.includes(i))
			this.setLineDash(setLineDash);
		this.drawLine(edgeCoordinates[i][0], edgeCoordinates[i][1], edgeCoordinates[i][2], edgeCoordinates[i][3]);
		this.setLineDash([]);
	}
};

CanvasRenderingContext2D.prototype.drawRightPyramid4 = function(o, dottedLine, setLineDash, drawHeight, drawApothem) {
	/** Функция отрисовки правильной четырёхугольной пирамиды
		 * 	@param {Object} o с полями:
				@param {Number} edge - длина стороны основания
				@param {Number} height - длина высоты пирамиды, по умолчанию 2 * o.edge
				@param {Number} angle - угол, на который будет повернута к наблюдателю пирамида, по умолчанию Math.PI / 6

			необязательные параметры:
			@param {Number} dottedLine - номера сторон, которые должны быть пунктиром, по умолчанию []
			@param {Array} setLineDash - задаёт длину и частоту пунктира, по умолчанию [5, 2]
			@param {Boolean} drawHeight - отрисовка высоты пирамиды, по умолчанию false
			@param {Boolean} drawApothem - отрисовка апофемы пирамиды, по умолчанию false
			@param {Number} lettersOnVertex - отрисовка букв на вершинах, по умолчанию []
			@param {String} strokeStyle - цвет линий, по умолчанию om.secondaryBrandColors.iz()

	*/
	o.scale = o.scale || 1 / 20;
	o.angle = o.angle || Math.PI / 6;
	o.height = o.height || 2 * o.edge;
	o.lettersOnVertex = o.lettersOnVertex || [];
	o.strokeStyle = o.strokeStyle || om.secondaryBrandColors.iz();
	this.strokeStyle = o.strokeStyle;

	dottedLine = dottedLine || [];
	setLineDash = setLineDash || [5, 2];
	drawHeight = drawHeight || false;
	drawApothem = drawApothem || false;

	while (o.angle > Math.PI)
		o.angle -= Math.PI;
	if (o.angle === undefined || o.angle == Math.PI / 2)
		o.angle = Math.PI / 6;

	let edgeSin = o.edge * (o.angle).sin();
	let edgeCos = o.edge * (o.angle).cos();

	let basePyramid = [0, -o.edge, edgeCos + o.edge, -edgeSin, edgeCos, -edgeSin, o.edge, -o.edge];
	let XY = [];
	for (let i = 0; i <  basePyramid.length; i += 2) {
		XY.push({
			x:  basePyramid[i],
			y:  basePyramid[i + 1]
		});
	}
	let result = XY.mt_coordinatesOfIntersectionOfTwoSegments();

	let vertex = [
		[0, -o.edge],
		[o.edge, -o.edge],
		[o.edge + edgeCos, -edgeSin],
		[edgeCos, -edgeSin],
		[result.x, result.y + o.height],
		[result.x, result.y],
	];

	let edgeCoordinates = [
		[0, -o.edge, o.edge, -o.edge], //нижняя 0
		[0, -o.edge, edgeCos, -edgeSin], //левая 1
		[o.edge, -o.edge, o.edge + edgeCos, -edgeSin], //правая 2
		[edgeCos, -edgeSin, edgeCos + o.edge, -edgeSin], //верхняя 3

		[0, -o.edge, result.x, result.y + o.height], //левая к вершине 4
		[o.edge, -o.edge, result.x, result.y + o.height], //нижняя к вершине 5
		[edgeCos, -edgeSin, result.x, result.y + o.height], //верхняя к вершине 6
		[edgeCos + o.edge, -edgeSin, result.x, result.y + o.height], //правая к вершине 7

	];

	if (drawHeight) {
		this.setLineDash(setLineDash);
		this.drawLine(0, -o.edge, edgeCos + o.edge, -edgeSin);
		this.drawLine(edgeCos, -edgeSin, o.edge, -o.edge);
		this.drawLine(result.x, result.y + o.height, result.x, result.y);
		this.setLineDash([]);
	}

	if (drawApothem) {
		this.drawLine(o.edge / 2, -o.edge, result.x, result.y +
			o.height);
	}

	for (let i = 0; i < edgeCoordinates.length; i++) {
		if (dottedLine.includes(i))
			this.setLineDash(setLineDash);
		this.drawLine(edgeCoordinates[i][0], edgeCoordinates[i][1], edgeCoordinates[i][2], edgeCoordinates[i][3]);
		this.setLineDash([]);
	}

	if (o.lettersOnVertex.length) {
		for (let i = 0; i < o.lettersOnVertex.length; i++) {
			let step = (i < 4) ? 10 / o.scale : -10 / o.scale;
			this.fillText(o.lettersOnVertex[i], vertex[i][0], vertex[i][1] + step, 20);
		}
	}

};

/**
 * Угол проекции глубины, с которым рисует `drawParallelepiped()`:
 * значения больше π уменьшаются на π, а π/2 и undefined заменяются на π/6.
 * Угол в радианах: `angle: 40` в шаблонах - это 40 - 12π ≈ 2,30 (около 132°),
 * косинус отрицательный, и глубина уходит влево.
 * @param {number} [angle] - угол из параметров параллелепипеда
 * @returns {number} нормализованный угол
 */
function parallelepipedAngle(angle) {
	while (angle > Math.PI)
		angle -= Math.PI;
	if (angle === undefined || angle == Math.PI / 2)
		angle = Math.PI / 6;
	return angle;
}

/**
 * Вершины проекции параллелепипеда, который рисует `drawParallelepiped()`.
 * Глубина сдвигает заднюю грань на `depth * cos(angle)` по горизонтали
 * (влево, если косинус отрицательный, например при `angle: 40`)
 * и на `depth / 2` по вертикали.
 * Порядок вершин: 1, 2, 5, 6 - передняя грань (5 - начало координат),
 * 0, 3, 4, 7 - сдвинутая на глубину; 0-3 лежат на высоте height, 4-7 - на нулевой.
 * Угол нормализуется так же, как в `drawParallelepiped()` (см. `parallelepipedAngle()`);
 * сам объект `o` не меняется.
 * @param {Object} o - {width, height, depth, angle} - размеры и угол проекции
 * @returns {Array<Array<number>>} восемь вершин [x, y] в единицах чертежа
 * @example
 * let v = parallelepipedVertices({width: 3, height: 5, depth: 2, angle: Math.PI / 4});
 */
function parallelepipedVertices(o) {
	let dx = o.depth * Math.cos(parallelepipedAngle(o.angle));
	let dy = o.depth / 2;

	return [
		[dx, dy + o.height],
		[0, o.height],
		[o.width, o.height],
		[dx + o.width, dy + o.height],
		[dx, dy],
		[0, 0],
		[o.width, 0],
		[dx + o.width, dy],
	];
}

/**
 * Габариты проекции параллелепипеда: где он лежит и сколько места занимает
 * по горизонтали и по вертикали. Нужны, чтобы вписать чертёж в холст,
 * не переписывая в шаблоне формулу проекции из `drawParallelepiped()`.
 * Начало координат - передний нижний левый угол, но если глубина уходит влево
 * (косинус угла отрицательный, например `angle: 40`), коробка начинается левее
 * нуля: `minX` < 0. Поэтому сдвигать чертёж нужно на `-minX`, а не только
 * считать ширину.
 * @param {Object} o - {width, height, depth, angle}, как в `drawParallelepiped()`
 * @returns {Object} {minX, minY, width, height} - левый нижний угол габарита
 *     (в координатах drawParallelepiped) и ширина и высота проекции
 * @example
 * let size = parallelepipedSize({width: 3, height: 5, depth: 2, angle: 40});
 * let s = Math.min(ct.canvas.width / size.width, ct.canvas.height / size.height);
 * ct.scale(s, s);
 * ct.translate(-size.minX, -size.minY);//ось Y вниз: габарит - от левого верхнего угла холста
 */
function parallelepipedSize(o) {
	let vertex = parallelepipedVertices(o);
	let xs = vertex.map((v) => v[0]);
	let ys = vertex.map((v) => v[1]);
	let minX = Math.min(...xs);
	let minY = Math.min(...ys);
	return {
		minX: minX,
		minY: minY,
		width: Math.max(...xs) - minX,
		height: Math.max(...ys) - minY,
	};
}

CanvasRenderingContext2D.prototype.drawParallelepiped = function (o, dottedLine, diagonal, setLineDash) {

	dottedLine = dottedLine || [];
	diagonal = false || diagonal;
	setLineDash = setLineDash || [5, 2];
	o.lengthOfEdge = o.lengthOfEdge || false;
	o.scale = o.scale || 1 / 20;
	o.strokeStyle = o.strokeStyle || om.secondaryBrandColors.iz();
	o.diagonalStrokeStyle = o.diagonalStrokeStyle || om.primaryBrandColors.iz();
	o.lettersOnVertex = o.lettersOnVertex || [];
	o.crossSection = o.crossSection || [];

	this.strokeStyle = o.strokeStyle;

	// Как и раньше, нормализованный угол записывается в o
	o.angle = parallelepipedAngle(o.angle);
	let vertex = parallelepipedVertices(o);
	// Проекция глубины: её знает только parallelepipedVertices()
	let dx = vertex[4][0];
	let dy = vertex[4][1];

	let sideCoordinates = [
		[0, 0, 0, o.height], //0
		[o.width, 0, o.width, o.height], //1
		[0, 0, o.width, 0], //2
		[0, o.height, o.width, o.height], //3
		[0, o.height, dx, dy + o.height], //4
		[o.width, o.height, dx + o.width, dy + o.height], //5
		[0, 0, dx, dy], //6
		[o.width, 0, dx + o.width, dy], //7
		[dx, dy, dx, dy + o.height], //8
		[dx + o.width, dy, dx + o.width, dy + o.height], //9
		[dx, dy, dx + o.width, dy], //10
		[dx, dy + o.height, dx + o.width, dy + o.height] //11
	];

	sideCoordinates.forEach((elem,index)=>{
		if (dottedLine.includes(index))
			this.setLineDash(setLineDash);
		this.drawLine(elem[0], elem[1], elem[2], elem[3]);
		this.setLineDash([]);
	});

	if (o.crossSection.length) {
		let vertexToCross = o.crossSection.map((elem) => [vertex[elem][0], vertex[elem][1]]);
		this.drawSection(vertexToCross);
	}

	//диагональ
	if (diagonal) {
		this.strokeStyle = o.diagonalStrokeStyle;
		this.setLineDash(setLineDash);
		this.drawLine(0, 0, dx + o.width, dy + o.height);
		this.setLineDash([]);
		this.strokeStyle = o.strokeStyle;
	}

	//длины сторон
	let edge = [
		[o.width + 0.5, o.height / 2],
		[o.width / 2, -0.5],
		[dx / 2 + o.width, dy + o.height]
	];
	let length = [o.height, o.width, o.depth];
	if (o.lengthOfEdge) {
		this.scale(1 / o.scale, 1 / o.scale);
		edge.forEach((elem,index)=>this.fillText(length[index], elem[0] * o.scale, elem[1] * o.scale));
		this.scale(o.scale, o.scale);
	}

	if (o.lettersOnVertex.length) {
		for (let i = 0; i < 8; i++) {
			let step = (i < 4) ? 2 * o.height / o.scale : -o.height / o.scale;
			this.fillText(o.lettersOnVertex[i], vertex[i][0], vertex[i][1] + step, 20);
		}
	}
};

CanvasRenderingContext2D.prototype.drawSection = function(vertex, fillStyle) {
	this.beginPath();
	let copy = this.fillStyle;
	this.fillStyle = fillStyle || om.transparentBrandColors.iz();
	this.moveTo(vertex.last()[0], vertex.last()[1]);
	vertex.map((v) => this.lineTo(v[0], v[1]));
	this.fill();
	this.fillStyle = copy;
};

CanvasRenderingContext2D.prototype.drawLineAtAngle = function(x, y, angle, length) {
	/** Рисует отрезок длины length под углом angle в радианах*/
	const endpoint = calculateEndpointLineAtAngle(x, y, angle, length);
	this.drawLine(x, y, endpoint.x, endpoint.y);
	return endpoint;
};

CanvasRenderingContext2D.prototype.strokeInMiddleOfSegment = function(x1, y1, x2, y2, length, quantity) {
	/** Ставит штрихи длины length на середине отрезка перпендикулярно ему*/
	quantity = quantity || 1;
	let middle = coordinatesMiddleOfSegment(x1, y1, x2, y2);
	let angle = ((y2 - y1) / (x2 - x1)).arctg();
	let thickness = this.lineWidth;
	let gap = this.lineWidth * 3;
	let initialBias = (quantity - 1) * (gap + thickness) / 2;
	for (let i = 0; i < quantity; i++) {
		let bias = initialBias - i * (gap + thickness);
		this.drawLineAtAngle(middle[0] + bias * angle.cos(), middle[1] + bias * angle.sin(), angle + 0.5 * Math.PI, +length);
		this.drawLineAtAngle(middle[0] + bias * angle.cos(), middle[1] + bias * angle.sin(), angle + 0.5 * Math.PI, -length);
	}
};

CanvasRenderingContext2D.prototype.markSegmentWithLetter = function(x, y, angle, letter, length, maxLength) {
	/** Вспомогательная функция для отрисовки текста около некоторого отрезка */
	this.fillText(letter, x + angle.cos() * length, y + angle.sin() * length, maxLength);
};

CanvasRenderingContext2D.prototype.signSegmentInMiddle = function(x1, y1, x2, y2, letter, length, maxLength) {
	/** Рисует букву на середине отрезка*/
	length = length || 10;
	maxLength = maxLength || 10;
	let middle = coordinatesMiddleOfSegment(x1, y1, x2, y2);
	let angle = ((y2 - y1) / (x2 - x1)).arctg();
	this.markSegmentWithLetter(middle[0], middle[1], angle + 0.5 * Math.PI, letter, length.pm(), maxLength);
};

CanvasRenderingContext2D.prototype.drawFigure = function (vertex, matrixConnections) {
	matrixConnections.forEach((row, i) => {
		row.forEach((col, j) => {
			if (col) {
				if (Array.isArray(col)) {
					(col.length > 0) ? this.setLineDash(col) : this.setLineDash([4, 2]);
				}
				this.drawLine(vertex[i + 1].x, vertex[i + 1].y, vertex[j].x, vertex[j].y);
				this.setLineDash([0, 0])
			}
		});
	});
}

CanvasRenderingContext2D.prototype.drawFigureVer2 = function(vertex2D, matrixConnections) {
	for (let key in matrixConnections) {
		matrixConnections[key].forEach((ver) => {
			switch (typeof ver) {
			case "number":
				this.drawLine(vertex2D[key].x, vertex2D[key].y, vertex2D[ver].x, vertex2D[ver].y);
				break;
			case "object":
				this.setLineDash(ver[1]);
				this.drawLine(vertex2D[ver[0]].x, vertex2D[ver[0]].y, vertex2D[key].x, vertex2D[key].y);
				this.setLineDash([0, 0])
			}
		})
	}
};

/**
 * Подписывает вершины фигуры буквами (вызывать после ctx.drawFigure).
 * Контекст должен быть в положении для рисования (ось Y отражена scale(1, -1)):
 * метод временно возвращает ось Y в экранное положение, чтобы буквы не были
 * перевёрнуты, и восстанавливает контекст (save/restore).
 * Шрифт - 20px liberation_sans, выравнивание и цвет - текущие textAlign, textBaseline, fillStyle;
 * всё это и отступы можно задать необязательным параметром options.
 * По умолчанию для первой половины вершин подпись ставится под вершиной (+25),
 * для второй - над вершиной (-5). Настройка options.above задаёт номера
 * вершин, которые подписываются сверху (-5); остальные - снизу (+25).
 * @param {Array<{x: number, y: number}>} points - вершины фигуры (например, после autoScale)
 * @param {string[]} letters - буквы вершин в том же порядке (например, om.latbukv.slice(0, 3))
 * @param {Object} [options] - необязательные настройки подписей (действуют только внутри метода):
 * @param {number[]} [options.above] - номера вершин для подписи сверху; по умолчанию - вторая половина
 * @param {string} [options.font='20px liberation_sans'] - шрифт
 * @param {string} [options.textAlign] - выравнивание; по умолчанию текущее textAlign контекста
 * @param {string} [options.textBaseline] - базовая линия; по умолчанию текущая textBaseline
 * @param {string} [options.fillStyle] - цвет; по умолчанию текущий fillStyle
 * @param {number} [options.offsetBelow=25] - сдвиг по экранной оси Y подписи под вершиной
 * @param {number} [options.offsetAbove=-5] - сдвиг по экранной оси Y подписи над вершиной
 * @example
 * ctx.signVertices(points, letters);//подписи вершин фигуры
 * ctx.signVertices(points, letters, {above: [2, 3]});//вершины 2 и 3 - сверху, остальные - снизу
 * ctx.signVertices(points, letters, {textAlign: 'center'});//буквы по центру вершин
 */
CanvasRenderingContext2D.prototype.signVertices = function(points, letters, options) {
	if (Array.isArray(options))
		throw new TypeError('signVertices: номера вершин для подписи сверху передаются как {above: [...]}');
	options = options || {};
	let above = options.above;
	let offsetBelow = options.offsetBelow === undefined ? 25 : options.offsetBelow;
	let offsetAbove = options.offsetAbove === undefined ? -5 : options.offsetAbove;
	this.save();
	this.scale(1, -1);
	this.font = options.font || '20px liberation_sans';
	['textAlign', 'textBaseline', 'fillStyle'].forEach((name) => {
		if (options[name] !== undefined)
			this[name] = options[name];
	});
	let isAbove = Array.isArray(above)
		? function(i) { return above.indexOf(i) !== -1; }
		: function(i) { return i >= points.length / 2; };
	points.forEach((elem, i) => this.fillText(letters[i], elem.x, -elem.y + (isAbove(i) ? offsetAbove : offsetBelow)));
	this.restore();
};

CanvasRenderingContext2D.prototype.isCanvasRenderingContext2D=true;

/*Иначе огнелисичка матюкается
var docsCanvas;
if(!docsCanvas)
	docsCanvas={};

for(var chto in CanvasRenderingContext2D.prototype){
	docsCanvas[chto]=CanvasRenderingContext2D.prototype[chto];
//	Object.defineProperty(CanvasRenderingContext2D.prototype, chto, { enumerable: false });
}*/

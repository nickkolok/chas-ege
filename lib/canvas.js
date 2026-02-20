'use strict';

CanvasRenderingContext2D.prototype.drawLine=function(x1,y1,x2,y2){
	this.beginPath();
	this.moveTo(x1,y1);
	this.lineTo(x2,y2);
	this.stroke();
	this.closePath();
}
CanvasRenderingContext2D.prototype.regularGrid=
CanvasRenderingContext2D.prototype.setka=function(squareSide,squaresQuantity){
	for(var i=-squaresQuantity;i<=squaresQuantity;i++){
		this.drawLine(-squareSide*squaresQuantity,squareSide*i,squareSide*squaresQuantity,squareSide*i);
		this.drawLine(squareSide*i,-squareSide*squaresQuantity,squareSide*i,squareSide*squaresQuantity);
	}
}

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

	let diff = (angle1.abs() - angle2.abs()).abs();
	let diffangle = (angle1 - angle2).abs();
	
	if (drawRightAngle || (diff - Math.PI / 2).abs() < 0.05) {
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
			tickSize = 7
	} = options;

	// Сохраняем исходное состояние контекста
	this.save();
	
	let translateX = cellWidth;
	let translateY = -cellHeight;
	let	arrowOffsetX = cellWidth;

	// Рисуем основную сетку
	this.lineWidth = lineWidth;
	this.translate(translateX, translateY);
	if (this.irregularGrid) {
		this.irregularGrid(gridWidth, gridHeight - cellHeight, cellWidth, cellHeight);
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
	this.translate(-arrowOffsetX, 0);
	this.lineWidth = 1;
	for (let i = 0; i < gridWidth && step1 <= maxX; i += cellWidth * stepByCeilX) {
		let label;

		if (typeX === 'time') {
			label = `${cycleTime? step1%24: step1}:00`;
		} else {
			label = step1.ts();
		}

		this.fillText(label, i, textOffsetY);
		step1 += stepX * stepByCeilX;
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

CanvasRenderingContext2D.prototype.drawParallelepiped = function (o, dottedLine, diagonal, setLineDash) {

	dottedLine = dottedLine || [];
	diagonal = false || diagonal;
	setLineDash = setLineDash || [5, 2];
	o.lengthOfEdge = o.lengthOfEdge || false;
	o.scale = o.scale || 1 / 20;
	o.strokeStyle = o.strokeStyle || om.secondaryBrandColors.iz();
	o.diagonalStrokeStyle = o.diagonalStrokeStyle || om.primaryBrandColors;
	o.lettersOnVertex = o.lettersOnVertex || [];
	o.crossSection = o.crossSection || [];

	this.strokeStyle = o.strokeStyle;

	while (o.angle > Math.PI)
		o.angle -= Math.PI;
	if (o.angle === undefined || o.angle == Math.PI / 2)
		o.angle = Math.PI / 6;

	let vertex = [
		[o.depth * o.angle.cos(), o.depth / 2 + o.height],
		[0, o.height],
		[o.width, o.height],
		[o.depth * o.angle.cos() + o.width, o.depth / 2 + o.height],
		[o.depth * o.angle.cos(), o.depth / 2],
		[0, 0],
		[o.width, 0],
		[o.depth * o.angle.cos() + o.width, o.depth / 2],
	];

	let sideCoordinates = [
		[0, 0, 0, o.height], //0
		[o.width, 0, o.width, o.height], //1
		[0, 0, o.width, 0], //2
		[0, o.height, o.width, o.height], //3
		[0, o.height, o.depth * o.angle.cos(), o.depth / 2 + o.height], //4
		[o.width, o.height, o.depth * o.angle.cos() + o.width, o.depth / 2 + o.height], //5
		[0, 0, o.depth * o.angle.cos(), o.depth / 2], //6
		[o.width, 0, o.depth * o.angle.cos() + o.width, o.depth / 2], //7
		[o.depth * o.angle.cos(), o.depth / 2, o.depth * o.angle.cos(), o.depth / 2 + o.height], //8
		[o.depth * o.angle.cos() + o.width, o.depth / 2, o.depth * o.angle.cos() + o.width, o.depth / 2 + o.height], //9
		[o.depth * o.angle.cos(), o.depth / 2, o.depth * o.angle.cos() + o.width, o.depth / 2], //10
		[o.depth * o.angle.cos(), o.depth / 2 + o.height, o.depth * o.angle.cos() + o.width, o.depth / 2 + o.height] //11
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
		this.drawLine(0, 0, o.depth * o.angle.cos() + o.width, o.depth / 2 + o.height);
		this.setLineDash([]);
		this.strokeStyle = o.strokeStyle;
	}

	//длины сторон
	let edge = [
		[o.width + 0.5, o.height / 2],
		[o.width / 2, -0.5],
		[o.depth * o.angle.cos() / 2 + o.width, o.depth / 2 + o.height]
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

CanvasRenderingContext2D.prototype.isCanvasRenderingContext2D=true;

/*Иначе огнелисичка матюкается
var docsCanvas;
if(!docsCanvas)
	docsCanvas={};

for(var chto in CanvasRenderingContext2D.prototype){
	docsCanvas[chto]=CanvasRenderingContext2D.prototype[chto];
//	Object.defineProperty(CanvasRenderingContext2D.prototype, chto, { enumerable: false });
}*/

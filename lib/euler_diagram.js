// Диаграмма Эйлера: случайный опыт S — прямоугольник, элементарные события — точки,
// около каждой точки подписи (значение случайной величины и, если нужно, вероятность).
//
// Размеры диаграммы записаны здесь один раз: единица 20px, отступ рамки 20px,
// радиус точки 0.18, шаг координат x 1.5 (точки не накладываются), y от -6 до 6,
// подписи на 6px выше и на 16px ниже точки.
//
// Потребители: zdn/matege2024p/5/509533.js, zdn/matege2024p/5/509534.js

var eulerDiagramDefaults = {
	unit: 20,            //пикселей на единицу математической системы координат
	indent: 20,          //отступ рамки от края холста, px
	pointRadius: 0.18,   //радиус точки в математических единицах
	xStep: 1.5,          //шаг координат x: соседние точки не накладываются
	yMin: -6,
	yMax: 6,
	aboveOffset: 6,      //подпись над точкой: на столько px выше, px
	belowOffset: 16,     //подпись под точкой: на столько px ниже, px
	aboveFontSize: 16,
	belowFontSize: 13,
	frameFontSize: 16,
};

function eulerDiagramValues(minRepeats, maxRepeats) {
	/**Значения случайной величины на элементарных событиях диаграммы Эйлера.
	 * Берутся 3 или 4 различных значения от 1 до 9, каждое повторяется
	 * от minRepeats до maxRepeats раз, порядок исходов перемешивается.
	 * Возвращает {uniqueValues, xValues}: сами значения и их список по исходам.
	 * Количество исходов — xValues.length.*/
	var uniqueValues = arrayOfUniqueValues(sluchch(3, 4), 1, 9);
	var xValues = uniqueValues.flatMap(function(value) {
		return Array(sl(minRepeats, maxRepeats)).fill(value);
	}).shuffle();
	return { uniqueValues: uniqueValues, xValues: xValues };
}

function eulerDiagramCoords(quantity, minX, maxX) {
	/**Координаты quantity точек диаграммы Эйлера в математических координатах
	 * (единица eulerDiagramDefaults.unit, ось y вверх).
	 * Координаты x неповторяющиеся, с шагом eulerDiagramDefaults.xStep,
	 * координаты y — целые от eulerDiagramDefaults.yMin до eulerDiagramDefaults.yMax.
	 * Возвращает массив пар [x, y] — как раз то, что ест ctx.drawEulerDiagram.*/
	return [
		arrayOfUniqueValues(quantity, minX, maxX, eulerDiagramDefaults.xStep),
		arrayOfUniqueValues(quantity, eulerDiagramDefaults.yMin, eulerDiagramDefaults.yMax),
	].T();
}

/**
 * Рисует диаграмму Эйлера: рамку опыта, точки-элементарные события и подписи около них.
 * Система координат и масштаб берутся из eulerDiagramDefaults, размеры холста — из самого
 * холста, поэтому в paint не нужно ни дублировать width/height, ни пересчитывать
 * математические координаты в пиксельные.
 * @param {Object} o
 * @param {Array<Array<number>>} o.points - координаты точек в математических координатах (eulerDiagramCoords)
 * @param {Array<string>} [o.above] - подписи над точками (жирным), по одной на точку
 * @param {Array<string>} [o.below] - подписи под точками, по одной на точку
 * @param {number} [o.aboveFontSize=16] - кегль подписи над точкой
 * @param {number} [o.belowFontSize=13] - кегль подписи под точкой
 * @param {number} [o.radius=0.18] - радиус точки в математических единицах
 * @param {string} [o.experienceLabel='S'] - подпись случайного опыта у правого верхнего угла рамки
 * @example
 * ctx.drawEulerDiagram({
 * 	points: coords,
 * 	above: xValues.map(v => v.ts()),
 * 	below: probs.map(p => p.ts()),
 * });
 */
CanvasRenderingContext2D.prototype.drawEulerDiagram = function(o) {
	var d = eulerDiagramDefaults;
	var w = this.canvas.width;
	var h = this.canvas.height;
	var points = o.points;
	var radius = o.radius || d.pointRadius;
	var aboveFontSize = o.aboveFontSize || d.aboveFontSize;
	var belowFontSize = o.belowFontSize || d.belowFontSize;

	//Рамка и подпись опыта — в пиксельных координатах холста
	this.save();
	this.strokeStyle = "black";
	this.lineWidth = 1;
	this.strokeRect(d.indent, d.indent, w - 2 * d.indent, h - 2 * d.indent);
	this.font = d.frameFontSize + "px liberation_sans";
	this.fillText(o.experienceLabel || 'S', w - 50, 30);
	this.restore();

	//Точки — в математических координатах
	this.save();
	this.translateToCenter();
	this.scale(d.unit, -d.unit);
	this.lineWidth = 0.1;
	graph9AmarkCircles(this, points, undefined, radius);
	this.restore();

	//Подписи — в пикселях, но начало координат в центре холста, как и у точек
	this.save();
	this.translateToCenter();
	for (var i = 0; i < points.length; i++) {
		var x = d.unit * points[i][0];
		var y = -d.unit * points[i][1];
		if (o.above && o.above[i] !== undefined) {
			this.font = "bold " + aboveFontSize + "px liberation_sans";
			this.fillText(o.above[i], x, y - d.aboveOffset);
		}
		if (o.below && o.below[i] !== undefined) {
			this.font = belowFontSize + "px liberation_sans";
			this.fillText(o.below[i], x, y + d.belowOffset);
		}
	}
	this.restore();
};

try {
	global. eulerDiagramDefaults = module.exports. eulerDiagramDefaults = eulerDiagramDefaults ;
	global. eulerDiagramValues = module.exports. eulerDiagramValues = eulerDiagramValues ;
	global. eulerDiagramCoords = module.exports. eulerDiagramCoords = eulerDiagramCoords ;
} catch (e) {
}

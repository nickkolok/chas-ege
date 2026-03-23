function generateConcavePolygon(numPoints, centerX, centerY, radius) {
	try {
		const points = [];
		const angleStep = (2 * Math.PI) / numPoints;
		
		// Гарантируем минимум 4 точки для вогнутости
		const effectivePoints = Math.max(4, numPoints);
		
		// Создаем выраженные впадины
		const numConcaves = Math.max(2, Math.floor(effectivePoints / 4));
		const concaveDepth = radius * 0.25; // Глубина впадин 25% от радиуса
		
		for (let i = 0; i < effectivePoints; i++) {
			const angle = i * angleStep;
			let r = radius;
			
			// Добавляем выраженные впадины
			for (let j = 0; j < numConcaves; j++) {
				const concaveCenterAngle = (j * 2 * Math.PI) / numConcaves;
				let angleDiff = Math.abs(angle - concaveCenterAngle);
				angleDiff = Math.min(angleDiff, 2 * Math.PI - angleDiff);
				
				// Создаем впадину шириной ~60 градусов
				if (angleDiff < Math.PI / 3) {
					const depthFactor = 1 - (angleDiff / (Math.PI / 3));
					r -= concaveDepth * depthFactor;
				}
			}
			
			// Добавляем случайные вариации для естественности
			r *= sl(0.85, 1.15, 0.1);
			
			// Гарантируем минимальный радиус
			r = Math.max(radius * 0.4, r);

			points.push(new Point(
				centerX + r * Math.cos(angle),
				centerY + r * Math.sin(angle)
			));
		}

		return points;
	} catch (error) {
		console.error(`Ошибка в generateConcavePolygon: ${error.message}`);
		// Всегда возвращаем вогнутый полигон, даже при ошибке
		return generateConcaveFallback(numPoints, centerX, centerY, radius);
	}
}


// Проверка валидности полигона
function isValidPolygon(polygon) {
	return Array.isArray(polygon) && polygon.length >= 3 && polygon.every(point => point instanceof Point);
}

// Упрощенная проверка точки внутри полигона (алгоритм ray casting)
function isPointInPolygon(point, polygon) {
	if (!isValidPolygon(polygon)) 
		return false;

	let inside = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const xi = polygon[i].x, yi = polygon[i].y;
		const xj = polygon[j].x, yj = polygon[j].y;

		const intersect = ((yi > point.y) !== (yj > point.y)) &&
			(point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
		if (intersect) 
			inside = !inside;
	}
	return inside;
}

// Проверка пересечения полигонов (упрощенная)
function polygonsIntersect(poly1, poly2) {
	if (!isValidPolygon(poly1) || !isValidPolygon(poly2))
		return false;

	// Проверяем пересечение bounding box'ов сначала
	const bb1 = getBoundingBox(poly1);
	const bb2 = getBoundingBox(poly2);

	if (bb1.maxX < bb2.minX || bb1.minX > bb2.maxX ||
		bb1.maxY < bb2.minY || bb1.minY > bb2.maxY) {
		return false;
	}

	// Проверяем, есть ли точки одного полигона внутри другого
	for (let point of poly1) {
		if (isPointInPolygon(point, poly2)) 
			return true;
	}
	for (let point of poly2) {
		if (isPointInPolygon(point, poly1)) 
			return true;
	}

	return false;
}

// Получение bounding box полигона с проверками
function getBoundingBox(polygon, width, height) {
	if (!isValidPolygon(polygon)) {
		return { minX: 0, minY: 0, maxX: width, maxY: height };
	}

	let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
	for (let point of polygon) {
		if (point && typeof point.x === 'number' && typeof point.y === 'number') {
			minX = Math.min(minX, point.x);
			minY = Math.min(minY, point.y);
			maxX = Math.max(maxX, point.x);
			maxY = Math.max(maxY, point.y);
		}
	}

	// Если что-то пошло не так, возвращаем безопасные значения
	if (!isFinite(minX)) {
		return { minX: 0, minY: 0, maxX: width, maxY: height };
	}

	return { minX, minY, maxX, maxY };
}

// Генерация случайной точки внутри полигона
function randomPointInPolygon(polygon, width, height) {
	if (!isValidPolygon(polygon)) {
		return new Point(width / 2, height / 2);
	}

	const bb = getBoundingBox(polygon);
	for (let i = 0; i < 100; i++) {
		const point = new Point(
			sl(bb.minX, bb.maxX),
			sl(bb.minY, bb.maxY)
		);
		if (isPointInPolygon(point, polygon)) {
			return point;
		}
	}
	return new Point((bb.minX + bb.maxX) / 2, (bb.minY + bb.maxY) / 2);
}

// Отрисовка полигона с проверками
function drawPolygon(ctx, points, strokeStyle, fillStyle = false) {
	if (!isValidPolygon(points)) {
		console.error("Невалидный полигон для отрисовки");
		return;
	}

	if (fillStyle) {
		ctx.fillStyle = fillStyle
	};
	
	ctx.strokeStyle = strokeStyle;

	ctx.beginPath();
	ctx.moveTo(points[0].x, points[0].y);
	for (let i = 1; i < points.length; i++) {
		ctx.lineTo(points[i].x, points[i].y);
	}
	ctx.closePath();
	if (fillStyle) {
		ctx.fill();
	};
	ctx.stroke();
}

// Функция генерации данных карты (без отрисовки)
function generateMapData(centerX, centerY, settings = {}) {
	// Используем настройки размера деревни
	const villageRadius = settings.villageSize || 150;

	const village = generateConcavePolygon(settings.villagePoints || 12, centerX, centerY, villageRadius);

	// Создаем объект для хранения всех полигонов
	const mapData = {
		village: null,
		lakes: []
	};

	if (isValidPolygon(village)) {
		mapData.village = {
			points: village,
			center: new Point(centerX, centerY),
			radius: villageRadius,
			type: 'village'
		};
	} else {
		console.error('Не удалось сгенеринровать деревню');
		return;
	}

	// Генерация озёр
	if (mapData.village) {
		const bounds = getBoundingBox(village);
		const lakes = [];
		let attempts = 0;
		let lakeCount = settings.lakeCount || 2;
		const maxAttempts =  lakeCount * 10;

		for (let i = 0; i < lakeCount && attempts < maxAttempts; i++) {
			attempts++;
			const lakeCenter = randomPointInPolygon(village, bounds);

			// Генерируем случайный размер озера в заданном диапазоне
			const lakeRadius = sl(settings.minLakeSize || 30, settings.maxLakeSize || 50);

			// Для озер используем вогнутые полигоны
			const lake = generateConcavePolygon(settings.lakePoints || 15, lakeCenter.x, lakeCenter.y, lakeRadius);

			if (!isValidPolygon(lake)) continue;

			// Проверяем, что озеро полностью внутри деревни
			let valid = true;
			for (let point of lake) {
				if (!isPointInPolygon(point, village)) {
					valid = false;
					break;
				}
			}

			// Проверяем пересечение с другими озерами
			if (valid) {
				for (const existingLake of lakes) {
					if (polygonsIntersect(lake, existingLake.points)) {
						valid = false;
						break;
					}
				}
			}
			
			let polygonLake = new Polygon();
			polygonLake.addFace(lake);

			if (valid) {
				const lakeData = {
					points: lake,
					polygon: polygonLake,
					center: lakeCenter,
					radius: lakeRadius,
					type: 'lake',
				};
				
				lakes.push(lakeData);
				mapData.lakes.push(lakeData);
			} else {
				i--; // Пробуем снова
			}
		}
	}

	return mapData;
}

// Функция отрисовки только контуров
function drawMapOutlines(ctx, mapData, settings = {}) {
	if (!mapData.village) {
		console.error("Нет данных деревни для отрисовки");
		return;
	}

	// Отрисовка деревни
	drawPolygon(ctx, mapData.village.points, settings.colorVillage || '#2d5a2d');

	// Отрисовка озер
	mapData.lakes.forEach(lake => {
		drawPolygon(ctx, lake.points, settings.colorStrokeLake || '#0077be', settings.colorFillLake || '#a0d2ff');
	});
}

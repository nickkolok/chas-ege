function generateConcavePolygon(numPoints, centerX, centerY, radius) {
	const points = [];
	
	// Гарантируем минимум 4 точки для вогнутости
	const effectivePoints = Math.max(4, numPoints);
	const angleStep = (2 * Math.PI) / effectivePoints;
	
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
			
			// Создаем впадину полной шириной ~120 градусов
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
}

function randomPointInPolygon(polygon) {
	const bounds = polygon.box;
	for (let attempt = 0; attempt < 100; attempt++) {
		const point = new Point(sl(bounds.xmin, bounds.xmax), sl(bounds.ymin, bounds.ymax));
		if (polygon.contains(point)) {
			return point;
		}
	}
	throw new Error('Не удалось выбрать точку внутри полигона');
}

function drawPolygon(ctx, polygon, strokeStyle, fillStyle = false) {
	const points = polygon.vertices;
	if (fillStyle) {
		ctx.fillStyle = fillStyle;
	}
	ctx.strokeStyle = strokeStyle;
	ctx.beginPath();
	ctx.moveTo(points[0].x, points[0].y);
	for (let i = 1; i < points.length; i++) {
		ctx.lineTo(points[i].x, points[i].y);
	}
	ctx.closePath();
	if (fillStyle) {
		ctx.fill();
	}
	ctx.stroke();
}

function generateMapData(centerX, centerY, settings = {}) {
	const villageRadius = settings.villageSize || 150;
	const villagePolygon = new Polygon();
	villagePolygon.addFace(generateConcavePolygon(settings.villagePoints || 12, centerX, centerY, villageRadius));
	const mapData = {
		village: {
			polygon: villagePolygon,
			center: new Point(centerX, centerY),
			radius: villageRadius,
			type: 'village',
		},
		lakes: [],
	};
	const lakeCount = settings.lakeCount || 2;
	const maxAttempts = lakeCount * 10;
	for (let attempt = 0; mapData.lakes.length < lakeCount && attempt < maxAttempts; attempt++) {
		const lakeCenter = randomPointInPolygon(villagePolygon);
		const lakeRadius = sl(settings.minLakeSize || 30, settings.maxLakeSize || 50);
		const lakePolygon = new Polygon();
		lakePolygon.addFace(generateConcavePolygon(settings.lakePoints || 15, lakeCenter.x, lakeCenter.y, lakeRadius));
		if (!villagePolygon.contains(lakePolygon)) {
			continue;
		}
		if (mapData.lakes.some(lake => lakePolygon.box.intersect(lake.polygon.box) &&
			(lakePolygon.intersect(lake.polygon).length || lakePolygon.contains(lake.polygon) || lake.polygon.contains(lakePolygon)))) {
			continue;
		}
		mapData.lakes.push({
			polygon: lakePolygon,
			center: lakeCenter,
			radius: lakeRadius,
			type: 'lake',
		});
	}
	return mapData;
}

function drawMapOutlines(ctx, mapData, settings = {}) {
	drawPolygon(ctx, mapData.village.polygon, settings.colorVillage || '#2d5a2d');
	mapData.lakes.forEach(lake => {
		drawPolygon(ctx, lake.polygon, settings.colorStrokeLake || '#0077be', settings.colorFillLake || '#a0d2ff');
	});
}



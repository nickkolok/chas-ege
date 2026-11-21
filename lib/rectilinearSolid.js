'use strict';

/**
 * Многогранник, все двугранные углы которого прямые, составленный
 * из прямоугольных параллелепипедов («деталь» из задач ЕГЭ).
 *
 * Параллелепипеды задаются массивами [x1, y1, z1, x2, y2, z2]:
 * ось x направлена вправо, y — вглубь рисунка (от зрителя), z — вверх.
 * Параллелепипеды могут касаться друг друга и даже перекрываться:
 * многогранник — их объединение.
 *
 * @param {Array} boxes - массив параллелепипедов
 */
function RectilinearSolid(boxes) {
	this.boxes = boxes.map(function (b) {
		return [
			Math.min(b[0], b[3]), Math.min(b[1], b[4]), Math.min(b[2], b[5]),
			Math.max(b[0], b[3]), Math.max(b[1], b[4]), Math.max(b[2], b[5]),
		];
	});

	// Сжатие координат: сетка из всех встречающихся координат
	let uniqueSorted = function (values) {
		return values.filter(function (v, i, arr) {
			return arr.indexOf(v) === i;
		}).sort(function (a, b) {
			return a - b;
		});
	};
	let solid = this;
	this.grid = [0, 1, 2].map(function (axis) {
		let values = [];
		solid.boxes.forEach(function (b) {
			values.push(b[axis], b[axis + 3]);
		});
		return uniqueSorted(values);
	});

	let g = this.grid;
	this.filled = [];
	for (let i = 0; i < g[0].length - 1; i++) {
		this.filled.push([]);
		for (let j = 0; j < g[1].length - 1; j++) {
			this.filled[i].push([]);
			for (let k = 0; k < g[2].length - 1; k++) {
				let center = [(g[0][i] + g[0][i + 1]) / 2, (g[1][j] + g[1][j + 1]) / 2, (g[2][k] + g[2][k + 1]) / 2];
				this.filled[i][j].push(this.boxes.some(function (b) {
					return b[0] < center[0] && center[0] < b[3] &&
						b[1] < center[1] && center[1] < b[4] &&
						b[2] < center[2] && center[2] < b[5];
				}));
			}
		}
	}
}

/** Заполнена ли ячейка сетки; ячейки за пределами сетки пусты */
RectilinearSolid.prototype.isFilled = function (i, j, k) {
	let f = this.filled;
	return i >= 0 && j >= 0 && k >= 0 &&
		i < f.length && j < f[0].length && k < f[0][0].length &&
		f[i][j][k];
};

/** Объём многогранника */
RectilinearSolid.prototype.volume = function () {
	let g = this.grid;
	let v = 0;
	for (let i = 0; i < g[0].length - 1; i++) {
		for (let j = 0; j < g[1].length - 1; j++) {
			for (let k = 0; k < g[2].length - 1; k++) {
				if (this.filled[i][j][k]) {
					v += (g[0][i + 1] - g[0][i]) * (g[1][j + 1] - g[1][j]) * (g[2][k + 1] - g[2][k]);
				}
			}
		}
	}
	return v;
};

/** Площадь поверхности многогранника */
RectilinearSolid.prototype.surfaceArea = function () {
	let g = this.grid;
	let n = [g[0].length - 1, g[1].length - 1, g[2].length - 1];
	let s = 0;
	// Грань между ячейками, ровно одна из которых заполнена, лежит на поверхности
	for (let i = 0; i <= n[0]; i++) {
		for (let j = 0; j <= n[1]; j++) {
			for (let k = 0; k <= n[2]; k++) {
				if (j < n[1] && k < n[2] && this.isFilled(i - 1, j, k) !== this.isFilled(i, j, k)) {
					s += (g[1][j + 1] - g[1][j]) * (g[2][k + 1] - g[2][k]);
				}
				if (i < n[0] && k < n[2] && this.isFilled(i, j - 1, k) !== this.isFilled(i, j, k)) {
					s += (g[0][i + 1] - g[0][i]) * (g[2][k + 1] - g[2][k]);
				}
				if (i < n[0] && j < n[1] && this.isFilled(i, j, k - 1) !== this.isFilled(i, j, k)) {
					s += (g[0][i + 1] - g[0][i]) * (g[1][j + 1] - g[1][j]);
				}
			}
		}
	}
	return s;
};

/**
 * Рёбра многогранника: отрезки [[x1, y1, z1], [x2, y2, z2]].
 * Соседние коллинеарные куски одного ребра склеиваются.
 */
RectilinearSolid.prototype.edges = function () {
	let g = this.grid;
	let solid = this;
	let edges = [];
	[0, 1, 2].forEach(function (axis) {
		let u = (axis + 1) % 3;
		let w = (axis + 2) % 3;
		for (let a = 0; a < g[u].length; a++) {
			for (let b = 0; b < g[w].length; b++) {
				let start = null;
				for (let t = 0; t <= g[axis].length - 1; t++) {
					let isEdge = false;
					if (t < g[axis].length - 1) {
						// Четыре ячейки вокруг куска прямой
						let around = [[a - 1, b - 1], [a, b - 1], [a - 1, b], [a, b]].map(function (p) {
							let idx = [];
							idx[axis] = t;
							idx[u] = p[0];
							idx[w] = p[1];
							return solid.isFilled(idx[0], idx[1], idx[2]);
						});
						let count = around.filter(Boolean).length;
						isEdge = count === 1 || count === 3 ||
							(count === 2 && around[0] === around[3]);
					}
					if (isEdge && start === null) {
						start = t;
					}
					if (!isEdge && start !== null) {
						let p1 = [];
						let p2 = [];
						p1[axis] = g[axis][start];
						p2[axis] = g[axis][t];
						p1[u] = p2[u] = g[u][a];
						p1[w] = p2[w] = g[w][b];
						edges.push([p1, p2]);
						start = null;
					}
				}
			}
		}
	});
	return edges;
};

/**
 * Закрыта ли точка многогранником при взгляде по направлению toViewer
 * (вектор от точки к зрителю; все его координаты должны быть ненулевыми).
 */
RectilinearSolid.prototype.isPointHidden = function (point, toViewer) {
	let eps = 1e-9;
	return this.boxes.some(function (b) {
		let tMin = eps;
		let tMax = Infinity;
		for (let axis = 0; axis < 3; axis++) {
			let t1 = (b[axis] + eps - point[axis]) / toViewer[axis];
			let t2 = (b[axis + 3] - eps - point[axis]) / toViewer[axis];
			tMin = Math.max(tMin, Math.min(t1, t2));
			tMax = Math.min(tMax, Math.max(t1, t2));
		}
		return tMin < tMax;
	});
};

/**
 * Рисует многогранник RectilinearSolid в косоугольной (кабинетной) проекции:
 * ось y изображается под углом depthAngle к горизонтали с сокращением depthScale.
 * Видимые рёбра рисуются сплошными линиями, невидимые — штриховыми.
 * Рисунок масштабируется и центрируется в прямоугольнике width × height.
 *
 * @param {RectilinearSolid} solid - многогранник
 * @param {Object} o - параметры
 * @param {Number} o.width - ширина области рисования (по умолчанию 300)
 * @param {Number} o.height - высота области рисования (по умолчанию 300)
 * @param {Number} o.padding - отступ от краёв (по умолчанию 30)
 * @param {Number} o.depthScale - сокращение по оси y (по умолчанию 0.6)
 * @param {Number} o.depthAngle - угол изображения оси y (по умолчанию π/4)
 * @param {Number} o.maxScale - наибольший масштаб в пикселях на единицу длины (по умолчанию 40)
 * @param {Array} o.dash - штрих невидимых линий (по умолчанию [6, 4])
 * @param {String} o.strokeStyle - цвет линий (по умолчанию om.secondaryBrandColors.iz())
 * @param {Number} o.lineWidth - толщина линий (по умолчанию 2)
 * @param {Array} o.labels - подписи рёбер: {from: [x, y, z], to: [x, y, z], text: '3'};
 *     подпись ставится у середины отрезка, по умолчанию снаружи от центра рисунка;
 *     direction: [dx, dy] задаёт сторону явно (в координатах холста, ось y вниз),
 *     distance — расстояние от отрезка в пикселях (по умолчанию 14)
 * @param {String} o.font - шрифт подписей (по умолчанию '20px liberation_sans')
 * @param {String} o.fillStyle - цвет подписей (по умолчанию 'black')
 */
CanvasRenderingContext2D.prototype.drawRectilinearSolid = function (solid, o) {
	o = o || {};
	let width = o.width || 300;
	let height = o.height || 300;
	let padding = o.padding === undefined ? 30 : o.padding;
	let depthScale = o.depthScale || 0.6;
	let depthAngle = o.depthAngle || Math.PI / 4;
	let maxScale = o.maxScale || 40;
	let dash = o.dash || [6, 4];
	let labels = o.labels || [];

	let kx = depthScale * Math.cos(depthAngle);
	let kz = depthScale * Math.sin(depthAngle);
	let project = function (p) {
		return [p[0] + kx * p[1], -(p[2] + kz * p[1])];
	};
	// Направление к зрителю: вдоль него все точки проецируются в одну
	let toViewer = [kx, -1, kz];

	let corners = [];
	solid.boxes.forEach(function (b) {
		[0, 3].forEach(function (i) {
			[1, 4].forEach(function (j) {
				[2, 5].forEach(function (k) {
					corners.push(project([b[i], b[j], b[k]]));
				});
			});
		});
	});
	let minX = Math.min.apply(null, corners.map(function (c) { return c[0]; }));
	let maxX = Math.max.apply(null, corners.map(function (c) { return c[0]; }));
	let minY = Math.min.apply(null, corners.map(function (c) { return c[1]; }));
	let maxY = Math.max.apply(null, corners.map(function (c) { return c[1]; }));
	let scale = Math.min(
		(width - 2 * padding) / (maxX - minX),
		(height - 2 * padding) / (maxY - minY),
		maxScale
	);
	let offsetX = width / 2 - scale * (minX + maxX) / 2;
	let offsetY = height / 2 - scale * (minY + maxY) / 2;
	let toCanvas = function (p) {
		let q = project(p);
		return [offsetX + scale * q[0], offsetY + scale * q[1]];
	};
	let lerp = function (p1, p2, t) {
		return [0, 1, 2].map(function (i) {
			return p1[i] + (p2[i] - p1[i]) * t;
		});
	};

	this.save();
	this.strokeStyle = o.strokeStyle || om.secondaryBrandColors.iz();
	this.lineWidth = o.lineWidth || 2;
	this.lineCap = 'round';

	let ct = this;
	let samples = 240;
	solid.edges().forEach(function (edge) {
		// Делим ребро на участки одинаковой видимости
		let runs = [];
		for (let s = 0; s < samples; s++) {
			let hidden = solid.isPointHidden(lerp(edge[0], edge[1], (s + 0.5) / samples), toViewer);
			if (runs.length && runs[runs.length - 1].hidden === hidden) {
				runs[runs.length - 1].to = s + 1;
			} else {
				runs.push({ from: s, to: s + 1, hidden: hidden });
			}
		}
		runs.forEach(function (run) {
			let a = toCanvas(lerp(edge[0], edge[1], run.from / samples));
			let b = toCanvas(lerp(edge[0], edge[1], run.to / samples));
			ct.setLineDash(run.hidden ? dash : []);
			ct.beginPath();
			ct.moveTo(a[0], a[1]);
			ct.lineTo(b[0], b[1]);
			ct.stroke();
		});
	});
	this.setLineDash([]);

	this.font = o.font || '20px liberation_sans';
	this.fillStyle = o.fillStyle || 'black';
	this.textAlign = 'center';
	this.textBaseline = 'middle';
	let center = [(minX + maxX) / 2, (minY + maxY) / 2];
	labels.forEach(function (label) {
		let a = project(label.from);
		let b = project(label.to);
		let mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
		// Нормаль к отрезку, направленная от центра рисунка или в заданную сторону
		let normal = label.direction || [b[1] - a[1], a[0] - b[0]];
		let length = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1]);
		normal = [normal[0] / length, normal[1] / length];
		if (!label.direction && normal[0] * (mid[0] - center[0]) + normal[1] * (mid[1] - center[1]) < 0) {
			normal = [-normal[0], -normal[1]];
		}
		let distance = label.distance || 14;
		ct.fillText(
			label.text,
			offsetX + scale * mid[0] + normal[0] * distance,
			offsetY + scale * mid[1] + normal[1] * distance
		);
	});
	this.restore();
};

try {
	global.RectilinearSolid = module.exports.RectilinearSolid = RectilinearSolid;
} catch (e) {
}

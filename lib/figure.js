function findTriangleAngles(sideA, sideB, sideC) {
    if (!isValidTriangle(sideA, sideB, sideC)) {
        throw new Error("Three sides do not form a triangle");
    }

    const angleA = Math.acos((sideB * sideB + sideC * sideC - sideA * sideA) / (2 * sideB * sideC));
    const angleB = Math.acos((sideA * sideA + sideC * sideC - sideB * sideB) / (2 * sideA * sideC));
    const angleC = Math.acos((sideA * sideA + sideB * sideB - sideC * sideC) / (2 * sideA * sideB));
    return { angleA, angleB, angleC };
}

function shiftCoordinate3D(point, {	x, y, z	}) {
    x = x || 0;
    y = y || 0;
    z = z || 0;
    return {
        x: point.x - x || 0,
        y: point.y - y || 0,
        z: point.z - z || 0
    };
}

function coordinatesMiddleOfSegment3D(point1, point2) {
    return {
        x: 0.5 * (point1.x + point2.x),
        y: 0.5 * (point1.y + point2.y),
        z: 0.5 * (point1.z + point2.z),
    }
}


function lengthInSpace(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2) + Math.pow(point2.z - point1.z, 2));
}

/**
 * Вычисляет векторное произведение двух векторов в 3D-пространстве.
 * @param {{x: number, y: number, z: number}} v1
 * @param {{x: number, y: number, z: number}} v2
 * @returns {{x: number, y: number, z: number}} Вектор, перпендикулярный v1 и v2
 */
function crossProduct3D(v1, v2) {
    return {
        x: v1.y * v2.z - v1.z * v2.y,
        y: v1.z * v2.x - v1.x * v2.z,
        z: v1.x * v2.y - v1.y * v2.x
    };
}

/**
 * Находит центр описанной окружности треугольника в 3D-пространстве.
 * @param {{x: number, y: number, z: number}} A
 * @param {{x: number, y: number, z: number}} B
 * @param {{x: number, y: number, z: number}} C
 * @returns {{x: number, y: number, z: number}} Координаты центра
 */
function findCircumcenter3D(A, B, C) {
    // Векторы из вершины C к вершинам A и B
    const v1 = { x: A.x - C.x, y: A.y - C.y, z: A.z - C.z };
    const v2 = { x: B.x - C.x, y: B.y - C.y, z: B.z - C.z };

    // Квадраты длин векторов и их скалярное произведение
    const a2 = v1.x * v1.x + v1.y * v1.y + v1.z * v1.z;
    const b2 = v2.x * v2.x + v2.y * v2.y + v2.z * v2.z;
    const ab = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;

    // Векторное произведение (нормаль к плоскости треугольника)
    const cross = crossProduct3D(v1, v2);
    const c2 = cross.x * cross.x + cross.y * cross.y + cross.z * cross.z; // Квадрат длины нормали

    if (c2 === 0) {
        throw new Error("Точки коллинеарны, треугольник вырожденный");
    }

    // Коэффициенты для линейной комбинации векторов v1 и v2
    const coefA = b2 * (a2 - ab);
    const coefB = a2 * (b2 - ab);

    // Итоговая точка P = C + (coefA * v1 + coefB * v2) / (2 * |v1 x v2|^2)
    return {
        x: C.x + (coefA * v1.x + coefB * v2.x) / (2 * c2),
        y: C.y + (coefA * v1.y + coefB * v2.y) / (2 * c2),
        z: C.z + (coefA * v1.z + coefB * v2.z) / (2 * c2)
    };
}

function findRectangleVertices(width, depth, applicata) {
    valuesAreSmallerOrEqualToZero({ width, depth })
    return [
        { x: -0.5 * width, y:  0.5 * depth, z: applicata },
        { x:  0.5 * width, y:  0.5 * depth, z: applicata },
        { x:  0.5 * width, y: -0.5 * depth, z: applicata },
        { x: -0.5 * width, y: -0.5 * depth, z: applicata },
    ];
}

function findVerticesOfRegularPolygon(radiusOfCircumscribedCircle, numSides, applicata) {

    valuesAreSmallerOrEqualToZero({ radiusOfCircumscribedCircle });

    if (numSides < 3) {
        throw new Error("Invalid input: the figure should have at least 3 sides");
    }

    const vertices = [];
    const centralAngle = (2 * Math.PI) / numSides;

    for (let i = 0; i < numSides; i++) {
        const x = radiusOfCircumscribedCircle * Math.cos(centralAngle * i);
        const y = radiusOfCircumscribedCircle * Math.sin(centralAngle * i);
        vertices.push({ x, y, z: applicata });
    }

    return vertices;
}

function calculateTriangleArea(sideA, sideB, sideC) {
    const halfPerimeter = (sideA + sideB + sideC) / 2;
    return Math.sqrt(halfPerimeter * (halfPerimeter - sideA) * (halfPerimeter - sideB) * (halfPerimeter - sideC));
}

function valuesAreSmallerOrEqualToZero(values) {
    for (let key in values) {
        if (values[key] <= 0)
            throw new Error("Invalid input: the " + key + " is smaller or equal to zero");
    }
}

class Prism {
    constructor({ baseArea, height }) {
        valuesAreSmallerOrEqualToZero({ baseArea, height });

        this._height = height;
        this._baseArea = baseArea;
        this._vertices = [];
        this._connectionMatrix = [];
    }

    get height() {
        return this._height;
    }

    get baseArea() {
        return this._baseArea;
    }

    get volume() {
        return this._baseArea * this._height;
    }

}

class Pyramid {
    constructor({ height, baseArea }) {
        valuesAreSmallerOrEqualToZero({ height, baseArea });
        this._height = height;
        this._baseArea = baseArea;
        this._vertices = [];
        this._connectionMatrix = [];
    }

    get height() {
        return this._height;
    }

    get baseArea() {
        return this._baseArea;
    }

    get volume() {
        return (1 / 3) * this._baseArea * this._height;
    }

}

class RegularPyramid extends Pyramid {
    constructor({ height, baseSide, numberSide }) {
        valuesAreSmallerOrEqualToZero({ height, baseSide });

        if (numberSide < 3) {
            throw new Error("Invalid input: numberSide is less than three");
        }

        super({ height, baseArea: (numberSide * baseSide ** 2) / (4 * Math.tan(Math.PI / numberSide)) });
        this._baseSide = baseSide;
        this._numberSide = numberSide;
    }

    get baseSide() {
        return this._baseSide;
    }

    get numberSide() {
        return this._numberSide;
    }

    get verticesOfFigure() {
        if (this._vertices.length === 0) {
            this._vertices = findVerticesOfRegularPolygon(this.radiusOfCircumscribedCircle, this._numberSide, -0.5 * this._height);
            this._vertices.push({ x: 0, y: 0, z: 0.5 * this._height })
        }

        return this._vertices;
    }

    set verticesOfFigure(point) {
        this._vertices.push(point);
    }

    get radiusOfInscribedCircle() {
        return 0.5 * this._baseSide / Math.tan(Math.PI / this._numberSide);
    }

    get radiusOfCircumscribedCircle() {
        return 0.5 * this._baseSide / Math.sin(Math.PI / this._numberSide);
    }

    get surfaceArea() {
        return this._baseArea + this.sideSurfaceArea;
    }

    get sideSurfaceArea() {
        return 0.5 * this._baseSide * this._numberSide * this.apothem;
    }

    get sideEdge() {
        return Math.sqrt(this.radiusOfCircumscribedCircle ** 2 + this._height ** 2)
    }

    get apothem() {
        return Math.sqrt(this.sideEdge ** 2 - (0.5 * this._baseSide) ** 2)
    }

    get connectionMatrix() {
        if (this._connectionMatrix.length === 0) {
        for (let i = 0; i < this._numberSide - 1; i++) {
            this._connectionMatrix.push(new Array(i).fill(0).concat(1));
        }
        this._connectionMatrix[this._numberSide - 2][0] = 1;
        this._connectionMatrix.push(new Array(this._numberSide).fill(1));}

        return this._connectionMatrix;
    }

    set connectionMatrix(connectionMatrix) {
        this._connectionMatrix = connectionMatrix;
    }

}

class RectangularPyramidWithRectangleAtBase extends Pyramid {
    constructor({ height, sideA, sideB }) {
        valuesAreSmallerOrEqualToZero({ height, sideA, sideB });
        super({ height, baseArea: sideA * sideB });
        this._sideA = sideA;
        this._sideB = sideB;
        this._sideEdgeA = Math.sqrt(sideA ** 2 + height ** 2);
        this._sideEdgeB = Math.sqrt(sideB ** 2 + height ** 2);
        this._sideEdgeC = Math.sqrt(sideB ** 2 + sideA ** 2 + height ** 2);
    }

    get sideA() {
        return this._sideA;
    }

    get sideB() {
        return this._sideB;
    }

    get sideEdgeA() {
        return this._sideEdgeA;
    }

    get sideEdgeB() {
        return this._sideEdgeB;
    }

    get sideEdgeC() {
        return this._sideEdgeC;
    }

    get sideSurfaceArea() {
        return (
            calculateTriangleArea(this._sideA, this._sideEdgeA, this._height) +
            calculateTriangleArea(this._sideB, this._sideEdgeB, this._height) +
            calculateTriangleArea(this._sideB, this._sideEdgeA, this._sideEdgeC) +
            calculateTriangleArea(this._sideA, this._sideEdgeB, this._sideEdgeC)
        );
    }

    get surfaceArea() {
        return this._baseArea + this.sideSurfaceArea;
    }

    get connectionMatrix() {
        return [
            [1],
            [0, 1],
            [1, 0, 1],
            [1, 1, 1, 1],
        ];
    }

    set connectionMatrix(connectionMatrix) {
        this._connectionMatrix = connectionMatrix;
    }

    get verticesOfFigure() {
        let vertices = findRectangleVertices(this._sideA, this._sideB, -0.5 * this._height);
        vertices.push({ x: vertices[0].x, y: vertices[0].y, z: 0.5 * this._height });
        return vertices;
    }

    set verticesOfFigure({ sideA, sideB, height }) {
        let vertices = findRectangleVertices(sideA, sideB, -0.5 * height);
        vertices.push({ x: vertices[0].x, y: vertices[0].y, z: 0.5 * height });

        this._vertices = vertices;
    }

}

class Sphere {
    constructor(radius) {
        valuesAreSmallerOrEqualToZero({ radius });
        this._radius = radius;
    }

    get radius() {
        return this._radius;
    }

    get diameter() {
        return 2 * this._radius;
    }

    get volume() {
        return (4 / 3) * Math.PI * this._radius ** 3;
    }

    get surfaceArea() {
        return 4 * Math.PI * this._radius ** 2;
    }

    get areaGreatCircle() {
        return Math.PI * this._radius ** 2;
    }
}

class Cone {
    constructor({ radius, height }) {
        valuesAreSmallerOrEqualToZero({ radius, height });
        this._radius = radius;
        this._height = height;

    }

    get radius() {
        return this._radius;
    }

    get height() {
        return this._height;
    }

    get diameter() {
        return 2 * this._radius;
    }

    get volume() {
        return (1 / 3) * Math.PI * this._radius ** 2 * this._height;
    }

    get surfaceArea() {
        return Math.PI * this._radius * (this._radius + this.generatrix);
    }

    get baseArea() {
        return Math.PI * this._radius ** 2;
    }

    get sideSurfaceArea() {
        return Math.PI * this._radius * this.generatrix;
    }

    get generatrix() {
        return Math.sqrt(this._radius ** 2 + this._height ** 2);
    }

}

class Cylinder {
    constructor({ radius, height }) {
        valuesAreSmallerOrEqualToZero({ radius, height });
        this._radius = radius;
        this._height = height;

    }

    get radius() {
        return this._radius;
    }

    get height() {
        return this._height;
    }

    get diameter() {
        return 2 * this._radius;
    }

    get volume() {
        return Math.PI * Math.pow(this._radius, 2) * this._height;
    }

    get baseArea() {
        return Math.PI * this._radius * this._radius
    }

    get surfaceArea() {
        return 2 * this.baseArea + this.sideSurfaceArea;
    }

    get sideSurfaceArea() {
        return 2 * Math.PI * this._radius * this._height;
    }
}

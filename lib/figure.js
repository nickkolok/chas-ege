function isValidTriangle(sideA, sideB, sideC) {
    return sideA + sideB > sideC && sideA + sideC > sideB && sideB + sideC > sideA;
}

function findTriangleAngles(sideA, sideB, sideC) {
    if (!isValidTriangle(sideA, sideB, sideC)) {
        throw new Error("Three sides do not form a triangle");
    }

    const angleA = Math.acos((sideB * sideB + sideC * sideC - sideA * sideA) / (2 * sideB * sideC));
    const angleB = Math.acos((sideA * sideA + sideC * sideC - sideB * sideB) / (2 * sideA * sideC));
    const angleC = Math.acos((sideA * sideA + sideB * sideB - sideC * sideC) / (2 * sideA * sideB));
    return { angleA, angleB, angleC };
}

function findTriangleVertices(sideA, sideB, sideC, coordinateZ) {
    if (!isValidTriangle(sideA, sideB, sideC)) {
        throw new Error("Three sides do not form a triangle");
    }
    let vertexesA = { x: 0, y: 0, z: coordinateZ };
    let vertexesB = { x: sideA, y: 0, z: coordinateZ };
    let angleC = Math.acos((sideA * sideA + sideB * sideB - sideC * sideC) / (2 * sideA * sideB));
    let vertexesC = {
        x: sideB * Math.cos(angleC),
        y: sideB * Math.sin(angleC),
        z: coordinateZ
    };
    return [vertexesA, vertexesB, vertexesC];
}

function findOrthocenter(vertices, coordinateZ) {
    // Check if the input is valid
    if (vertices.length !== 3) {
        throw new Error("Invalid input: must provide three vertices");
    }

    // Calculate the slopes of the sides
    const slopes = [];
    for (let i = 0; i < 3; i++) {
        const j = (i + 1) % 3;
        const dx = vertices[j].x - vertices[i].x;
        const dy = vertices[j].y - vertices[i].y;
        slopes[i] = dy / dx;
    }

    // Calculate the intercepts of the perpendicular bisectors
    let intercepts = [];
    for (let i = 0; i < 3; i++) {
        const j = (i + 1) % 3;
        const k = (i + 2) % 3;
        const x1 = vertices[i].x;
        const y1 = vertices[i].y;
        const x2 = vertices[j].x;
        const y2 = vertices[j].y;
        const x3 = vertices[k].x;
        const y3 = vertices[k].y;
        const slope1 = slopes[i];
        const slope2 = slopes[j];
        const intercept1 = (y1 + y2) / 2 - slope1 * (x1 + x2) / 2;
        let intercept2 = (y2 + y3) / 2 - slope2 * (x2 + x3) / 2;
        intercepts[i] = (intercept2 - intercept1) / (slope1 - slope2);
    }

    // Calculate the orthocenter as the intersection of the perpendicular bisectors
    const orthocenter = {
        x: (intercepts[0] + intercepts[1] + intercepts[2]) / 3,
        y: (slopes[0] * intercepts[0] + slopes[1] * intercepts[1] + slopes[2] * intercepts[2]) / 3,
        z: coordinateZ,
    };

    return orthocenter;
}

function findRectangleVertices(width, depth, coordinateZ) {
    valuesAreSmallerOrEqualToZero({ width, depth, coordinateZ })
    return [
        { x: -0.5 * width, y: 0.5 * depth, z: coordinateZ },
        { x: 0.5 * width, y: 0.5 * depth, z: coordinateZ },
        { x: 0.5 * width, y: -0.5 * depth, z: coordinateZ },
        { x: -0.5 * width, y: -0.5 * depth, z: coordinateZ },
    ];
}

function findVerticesOfRegularPolygon(sideLength, numSides, coordinateZ) {

    valuesAreSmallerOrEqualToZero({ sideLength });

    if (numSides < 3) {
        throw new Error("Invalid input: the figure should have at least 3 sides");
    }

    const vertices = [];
    const centralAngle = (2 * Math.PI) / numSides;

    for (let i = 0; i < numSides; i++) {
        const x = sideLength * Math.cos(centralAngle * i);
        const y = sideLength * Math.sin(centralAngle * i);
        vertices.push({ x, y, z: coordinateZ });
    }

    return vertices;
}

function calculateTriangleArea(sideA, sideB, sideC) {
    const halfPerimeter = (sideA + sideB + sideC) / 2;
    return Math.sqrt(halfPerimeter * (halfPerimeter - sideA) * (halfPerimeter - sideB) * (halfPerimeter - sideC));
}

function valuesAreSmallerOrEqualToZero(values) {
    for (let key in values) {
        if (values.key <= 0)
            throw new Error("Invalid input: the " + key + " is smaller or equal to zero");
    }
}

class Prism {
    constructor({ baseArea, height }) {
        valuesAreSmallerOrEqualToZero({ baseArea, height });

        this._height = height;
        this._base = baseArea;
    }

    get volume() {
        return this._base.area() * this._height;
    }

    get sideSurfaceArea() {
        return this._base.getPerimeter() * this._height;
    }

    get fullSurfaceArea() {
        return 2 * this._base.getArea() + this.sideSurfaceArea;
    }
}

class IrregularTriangularPrism extends Prism {
    constructor({ height, sideA, sideB, sideC }) {
        valuesAreSmallerOrEqualToZero({ height, sideA, sideB, sideC });

        if (!isValidTriangle(sideA, sideB, sideC)) {
            throw new Error("Three sides do not form a triangle");
        }

        super({ height, baseArea: calculateTriangleArea(sideA, sideB, sideC) });
        this._sideA = sideA;
        this._sideB = sideB;
        this._sideC = sideC;

    }

    get surfaceArea() {
        return 2 * baseArea + this.sideSurfaceArea;
    }

    get sideSurfaceArea() {
        return (this._sideA + this._sideB + this._sideC) * this._height;
    }

    get diagonals() {
        return {
            diagonalA: Math.sqrt(this._height ** 2 + this._sideA ** 2),
            diagonalB: Math.sqrt(this._height ** 2 + this._sideB ** 2),
            diagonalC: Math.sqrt(this._height ** 2 + this._sideC ** 2),
        }
    }


    coordinates(connectionMatrix) {
        let vertexes = findTriangleVertices(this.sideA, this.sideB, this.sideC, -0.5 * this._height);
        for (let i = 0; i < 3; i++)
            vertexes.push({ x: vertexes[i].x, y: vertexes[i].y, z: 0.5 * this._height })

        connectionMatrix = connectionMatrix || [
            [1],
            [1, 1],
            [1],
            [0, 1, 0, 1],
            [0, 0, 1, 1, 1]
        ];

        return { vertexes, connectionMatrix };
    }
}

class RegularPrism extends Prism {
    constructor({ height, baseSide, numberSide }) {
        valuesAreSmallerOrEqualToZero({ height, baseSide, numberSide });

        if (numberSide < 3) {
            throw new Error("Invalid input: numberSide is less than three");
        }

        super({ height, baseArea: (numberSide * baseSide ** 2) / (4 * Math.tan(Math.PI / numberSide)) });
        this._baseSide = baseSide;
        this._numberSide = numberSide;

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
        return this._baseSide * this._numberSide * this._height;
    }

    get diagonalOfSideFace() {
        return Math.sqrt(this._baseSide ** 2 + this._height ** 2)
    }

    coordinates(connectionMatrix) {
        let vertexes = findVerticesOfRegularPolygon(this.baseSide, this.numberSide, -0.5 * this._height);

        vertexes.push({ x: vertexes[this.numberSide - 1].x, y: vertexes[this.numberSide - 1].y, z: 0.5 * this._height })
        for (let i = 0; i < this.numberSide - 1; i++)
            vertexes.push({ x: vertexes[i].x, y: vertexes[i].y, z: 0.5 * this._height })

        if (connectionMatrix === undefined) {
            for (let i = 0; i < 2 * this.numberSide - 1; i++) {
                connectionMatrix[i] = [];
                for (let j = 0; j <= i; j++) {
                    connectionMatrix[i][j] = (i === j) ? 1 : (i === j + this._numberSide || j === i + this._numberSide) ? 1 : 0;
                }
            }

            connectionMatrix[connectionMatrix.length - 1][this.numberSide] = 1;
            connectionMatrix[this.numberSide - 2][0] = 1;
        }
        return { vertexes, connectionMatrix };
    }
}

class Parallelepiped extends Prism {
    constructor({ depth, height, width }) {
        valuesAreSmallerOrEqualToZero({ depth, height, width });
        super({ height: height, baseArea: depth * width });
        this._depth = depth;
        this._width = width;
        this._height = height;
    }

    get surfaceArea() {
        return 2 * (this._depth * this._width + this._width * this._height + this._height * this._depth);
    }

    get mainDiagonal() {
        return Math.sqrt(this._depth ** 2 + this._width ** 2 + this._height ** 2);
    }

    get DWDiagonal() {
        return Math.sqrt(this._depth ** 2 + this._width ** 2);
    }

    get DHDiagonal() {
        return Math.sqrt(this._depth ** 2 + this._height ** 2);
    }

    get HWDiagonal() {
        return Math.sqrt(this._height ** 2 + this._width ** 2);
    }

    coordinates(connectionMatrix) {
        let vertexes = findRectangleVertices(this._width, this._depth, -0.5 * this._height)

        vertexes.push({ x: vertexes[4 - 1].x, y: vertexes[4 - 1].y, z: 0.5 * this._height })
        for (let i = 0; i < 4 - 1; i++)
            vertexes.push({ x: vertexes[i].x, y: vertexes[i].y, z: 0.5 * this._height })

        connectionMatrix = connectionMatrix || [
            [1],
            [0, 1],
            [1, 0, 1],
            [0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 0, 1, 0, 1, 0, 1],
        ];

        return { vertexes, connectionMatrix };
    }
}

class Cube extends Parallelepiped {
    constructor(baseSide) {
        valuesAreSmallerOrEqualToZero({ baseSide });
        super({ depth: baseSide, width: baseSide, height: baseSide });
        this._baseSide = baseSide;
    }
}

class Pyramid {
    constructor({ height, baseArea }) {
        valuesAreSmallerOrEqualToZero({ height, baseArea });
        this._height = height;
        this._baseArea = baseArea;
    }

    get height() {
        return this._height;
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
        return 0.5 * this._baseSide * this._numberSide * this._height;
    }

    get sideEdge() {
        return Math.sqrt(this.radiusOfCircumscribedCircle ** 2 + this._height ** 2)
    }

    get apothem() {
        return Math.sqrt(this.sideEdge ** 2 - (0.5 * this._baseSide) ** 2)
    }

    coordinates(connectionMatrix) {
        let vertexes = findVerticesOfRegularPolygon(this.baseSide, this.numberSide, -0.5 * this._height);
        vertexes.push({ x: 0, y: 0, z: 0.5 * this._height })

        if (connectionMatrix === undefined) {
            for (let i = 1; i < this.numberSide - 1; i++) {
                connectionMatrix.push(new Array(i).fill(0).concat(1));
            }
            connectionMatrix[this.numberSide - 2][0] = 1;
            connectionMatrix.push(new Array(this.numberSide).fill(1));
        }

        return { vertexes, connectionMatrix };
    }

}

class RectangularPyramidWithRightAngledTriangleAtBase extends Pyramid {
    constructor({ height, sideA, sideB }) {
        valuesAreSmallerOrEqualToZero({ height, sideA, sideB });
        super({ height, baseArea: 0.5 * sideA * sideB });
        this._sideA = sideA;
        this._sideB = sideB;
        this._sideC = Math.sqrt(sideA ** 2 + sideB ** 2);
        this.sideEdgeA = Math.sqrt(sideA ** 2 + height ** 2);
        this.sideEdgeB = Math.sqrt(sideB ** 2 + height ** 2);
    }

    get sideSurfaceArea() {
        return (
            calculateTriangleArea(this._sideA, this.sideEdgeA, this._height) +
            calculateTriangleArea(this._sideB, this.sideEdgeB, this._height) +
            calculateTriangleArea(this._sideC, this.sideEdgeA, this.sideEdgeB)
        );
    }

    get surfaceArea() {
        return this._baseArea + this.sideSurfaceArea();
    }

    coordinates(connectionMatrix) {
        let vertexes = findTriangleVertices(this.sideA, this.sideB, this.sideC, -0.5 * this._height);
        vertexes.push({ x: vertexes[0].x, y: vertexes[0].y, z: 0.5 * this._height });

        connectionMatrix = connectionMatrix || [
            [1],
            [1, 1],
            [1, 1, 1],
        ];

        return { vertexes, connectionMatrix };
    }
}

class RectangularPyramidWithRectangleAtBase extends Pyramid {
    constructor({ height, sideA, sideB }) {
        valuesAreSmallerOrEqualToZero({ height, sideA, sideB });
        super({ height, baseArea: sideA * sideB });
        this._sideA = sideA;
        this._sideB = sideB;
        this.sideEdgeA = Math.sqrt(sideA ** 2 + height ** 2);
        this.sideEdgeB = Math.sqrt(sideB ** 2 + height ** 2);
        this.sideEdgeC = Math.sqrt(sideB ** 2 + sideA ** 2 + height ** 2);
    }

    get sideSurfaceArea() {
        return (
            calculateTriangleArea(this._sideA, this.sideEdgeA, this._height) +
            calculateTriangleArea(this._sideB, this.sideEdgeB, this._height) +
            calculateTriangleArea(this._sideB, this.sideEdgeA, this.sideEdgeC) +
            calculateTriangleArea(this._sideA, this.sideEdgeB, this.sideEdgeC)
        );
    }

    get surfaceArea() {
        return this._baseArea + this.sideSurfaceArea();
    }

    coordinates(connectionMatrix) {
        let vertexes = findRectangleVertices(this.sideA, this.sideB, -0.5 * this._height);
        vertexes.push({ x: vertexes[0].x, y: vertexes[0].y, z: 0.5 * this._height });

        connectionMatrix = connectionMatrix || [
            [1],
            [0, 1],
            [1, 0, 1],
            [1, 1, 1, 1],
        ];

        return { vertexes, connectionMatrix };
    }
}

class Sphere {
    constructor(radius) {
        valuesAreSmallerOrEqualToZero({ radius });
        this._radius = radius;
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

    get volume() {
        return Math.PI * Math.pow(this._radius, 2) * this._height;
    }

    get surfaceArea() {
        return 2 * Math.PI * this._radius * (this._radius + this._height);
    }

    get sideSurfaceArea() {
        return 2 * Math.PI * this._radius * this._height;
    }
}

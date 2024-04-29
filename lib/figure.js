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

function findTriangleVertices(sideA, sideB, sideC, applicata) {
    if (!isValidTriangle(sideA, sideB, sideC)) {
        throw new Error("Invalid input: three sides do not form a triangle");
    }
    let verticesA = { x: 0, y: 0, z: applicata };
    let verticesB = { x: sideA, y: 0, z: applicata };
    let angleC = Math.acos((sideA * sideA + sideB * sideB - sideC * sideC) / (2 * sideA * sideB));
    let verticesC = {
        x: sideB * Math.cos(angleC),
        y: sideB * Math.sin(angleC),
        z: applicata,
    };

    let circumcenter = findCircumcenter3D(verticesA, verticesB, verticesC)
    let coordinate = [verticesA, verticesB, verticesC].map((elem)=>shiftCoordinate3D(elem, circumcenter))

    return coordinate;
}

function shiftCoordinate3D(point, {x,y,z}) {
    return {
        x: point.x - x,
        y: point.y - y,
        z: point.z - z
    };
}

function lengthInSpace(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2) + Math.pow(point2.z - point1.z, 2));
}

function findCircumcenter3D(A, B, C) {
    const AB = lengthInSpace(A, B);
    const BC = lengthInSpace(B, C);
    const CA = lengthInSpace(C, A);

    if (!isValidTriangle(AB, BC, CA)) {
        throw new Error("Three sides do not form a triangle");
    }
    // Calculate the circumcenter
    const D = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
    if (D === 0) {
        return false;
    }

    const Ux = (1 / D) * ((A.x * A.x + A.y * A.y + A.z * A.z) * (B.y - C.y) + (B.x * B.x + B.y * B.y + B.z * B.z) * (C.y - A.y) + (C.x * C.x + C.y * C.y + C.z * C.z) * (A.y - B.y));
    const Uy = (1 / D) * ((A.x * A.x + A.y * A.y + A.z * A.z) * (C.x - B.x) + (B.x * B.x + B.y * B.y + B.z * B.z) * (A.x - C.x) + (C.x * C.x + C.y * C.y + C.z * C.z) * (B.x - A.x));
    const Uz = (1 / D) * ((A.x * A.x + A.y * A.y + A.z * A.z) * (B.z - C.z) + (B.x * B.x + B.y * B.y + B.z * B.z) * (C.z - A.z) + (C.x * C.x + C.y * C.y + C.z * C.z) * (A.z - B.z));

    return { x: Ux, y: Uy, z: Uz };
}

function findRectangleVertices(width, depth, applicata) {
    valuesAreSmallerOrEqualToZero({ width, depth, applicata })
    return [
        { x: -0.5 * width, y:  0.5 * depth, z: applicata },
        { x:  0.5 * width, y:  0.5 * depth, z: applicata },
        { x:  0.5 * width, y: -0.5 * depth, z: applicata },
        { x: -0.5 * width, y: -0.5 * depth, z: applicata },
    ];
}

function findVerticesOfRegularPolygon(radiusOfCircumscribedCircle, numSides, applicata) {

    valuesAreSmallerOrEqualToZero({ radius });

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
        if (values.key <= 0)
            throw new Error("Invalid input: the " + key + " is smaller or equal to zero");
    }
}

class Prism {
    constructor({ baseArea, height }) {
        valuesAreSmallerOrEqualToZero({ baseArea, height });

        this._height = height;
        this._baseArea = baseArea;
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

    get sideA() {
        return this._sideA;
    }
    
    get sideB() {
        return this._sideB;
    }

    get sideC() {
        return this._sideC;
    }

    get surfaceArea() {
        return 2 * this._baseArea + this.sideSurfaceArea;
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

    get connectionMatrix() {
        return [
            [1],
            [1, 1],
            [1],
            [0, 1, 0, 1],
            [0, 0, 1, 1, 1]
        ];
    }

    set connectionMatrix(connectionMatrix) {
        this.connectionMatrix = connectionMatrix;
    }

    get verticesOfFigure() {
        let vertices = findTriangleVertices(this._sideA, this._sideB, this._sideC, -0.5 * this._height);
        for (let i = 0; i < 3; i++)
            vertices.push({ x: vertices[i].x, y: vertices[i].y, z: 0.5 * this._height })

        return vertices;
    }

    set verticesOfFigure({ sideA, sideB, sideC, height }) {
        let vertices = findTriangleVertices(sideA, sideB, sideC, -0.5 * height);
        for (let i = 0; i < 3; i++)
            vertices.push({ x: vertices[i].x, y: vertices[i].y, z: 0.5 * height })

        this.verticesOfFigure = vertices;
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

    get baseSide() {
        return this._baseSide;
    }

    get numberSide() {
        return this._numberSide;
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

    get connectionMatrix() {
        let connectionMatrix = [];
        for (let i = 0; i < 2 * this._numberSide - 1; i++) {
            connectionMatrix[i] = [];
            for (let j = 0; j <= i; j++) {
                connectionMatrix[i][j] = (i === j) ? 1 : (i === j + this._numberSide || j === i + this._numberSide) ? 1 : 0;
            }
        }

        connectionMatrix[connectionMatrix.length - 1][this._numberSide] = 1;
        connectionMatrix[this._numberSide - 2][0] = 1;

        return connectionMatrix;
    }

    set connectionMatrix(connectionMatrix) {
        this.connectionMatrix = connectionMatrix;
    }

    get verticesOfFigure() {
        let vertices = findVerticesOfRegularPolygon(this._baseSide, this._numberSide, -0.5 * this._height);

        vertices.push({ x: vertices[this._numberSide - 1].x, y: vertices[this._numberSide - 1].y, z: 0.5 * this._height })
        for (let i = 0; i < this._numberSide - 1; i++)
            vertices.push({ x: vertices[i].x, y: vertices[i].y, z: 0.5 * this._height })

        return vertices;
    }

    set verticesOfFigure({ baseSide, height }) {
        const vertices = findVerticesOfRegularPolygon(baseSide, this._numberSide, -0.5 * height);

        vertices.push({ x: vertices[this._numberSide - 1].x, y: vertices[this._numberSide - 1].y, z: 0.5 * this._height });

        for (let i = 0; i < this._numberSide - 1; i++) {
            vertices.push({ x: vertices[i].x, y: vertices[i].y, z: 0.5 * this._height });
        }

        return vertices;
    }
}

class Parallelepiped extends Prism {
    constructor({ depth, height, width }) {
        //valuesAreSmallerOrEqualToZero({ depth, height, width });
        super({ height: height, baseArea: depth * width });
        this._depth = depth;
        this._width = width;
    }

    get depth() {
        return this._depth;
    }

    get width() {
        return this._width;
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

    get connectionMatrix() {
        return [
            [1],
            [0, 1],
            [1, 0, 1],
            [0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 0, 1, 0, 1, 0, 1],
        ];
    }

    set connectionMatrix(connectionMatrix) {
        this.connectionMatrix = connectionMatrix;
    }

    get verticesOfFigure() {
        let vertices = findRectangleVertices(this._width, this._depth, -0.5 * this._height)

        vertices.push({ x: vertices[4 - 1].x, y: vertices[4 - 1].y, z: 0.5 * this._height })
        for (let i = 0; i < 4 - 1; i++)
            vertices.push({ x: vertices[i].x, y: vertices[i].y, z: 0.5 * this._height })

        return vertices;
    }

    set verticesOfFigure({ width, depth, height }) {
        let vertices = findRectangleVertices(width, depth, -0.5 * height)

        vertices.push({ x: vertices[4 - 1].x, y: vertices[4 - 1].y, z: 0.5 * height })
        for (let i = 0; i < 4 - 1; i++)
            vertices.push({ x: vertices[i].x, y: vertices[i].y, z: 0.5 * height })

        this.verticesOfFigure = vertices;
    }
}

class Cube extends Parallelepiped {
    constructor(baseSide) {
        valuesAreSmallerOrEqualToZero({ baseSide });
        super({ depth: baseSide, width: baseSide, height: baseSide });
        this._baseSide = baseSide;
    }

    get baseSide() {
        return this._baseSide;
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

    get connectionMatrix() {
        let connectionMatrix = [];
        for (let i = 0; i < this._numberSide - 1; i++) {
            connectionMatrix.push(new Array(i).fill(0).concat(1));
        }
        connectionMatrix[this._numberSide - 2][0] = 1;
        connectionMatrix.push(new Array(this._numberSide).fill(1));

        return connectionMatrix;
    }

    set connectionMatrix(connectionMatrix) {
        this.connectionMatrix = connectionMatrix;
    }

    get verticesOfFigure() {
        let vertices = findVerticesOfRegularPolygon(this.radiusOfCircumscribedCircle, this._numberSide, -0.5 * this._height);
        vertices.push({ x: 0, y: 0, z: 0.5 * this._height })

        return vertices;
    }

    set verticesOfFigure({ baseSide, height }) {
        let vertices = findVerticesOfRegularPolygon(baseSide, this._numberSide, -0.5 * height);
        vertices.push({ x: 0, y: 0, z: 0.5 * height })

        this.verticesOfFigure = vertices;
    }

}

class RectangularPyramidWithRightAngledTriangleAtBase extends Pyramid {
    constructor({ height, sideA, sideB }) {
        valuesAreSmallerOrEqualToZero({ height, sideA, sideB });
        super({ height, baseArea: 0.5 * sideA * sideB });
        this._sideA = sideA;
        this._sideB = sideB;
        this._sideC = Math.sqrt(sideA ** 2 + sideB ** 2);
        this._sideEdgeA = Math.sqrt(sideA ** 2 + height ** 2);
        this._sideEdgeB = Math.sqrt(sideB ** 2 + height ** 2);
    }

    get sideA() {
        return this._sideA;
    }

    get sideB() {
        return this._sideB;
    }

    get sideC() {
        return this._sideC;
    }

    get sideEdgeA() {
        return this._sideEdgeA;
    }

    get sideEdgeB() {
        return this._sideEdgeB;
    }

    get sideSurfaceArea() {
        return (
            calculateTriangleArea(this._sideA, this._sideEdgeA, this._height) +
            calculateTriangleArea(this._sideB, this._sideEdgeB, this._height) +
            calculateTriangleArea(this._sideC, this._sideEdgeA, this._sideEdgeB)
        );
    }

    get surfaceArea() {
        return this._baseArea + this.sideSurfaceArea();
    }

    get connectionMatrix() {
        return [
            [1],
            [1, 1],
            [1, 1, 1],
        ];
    }

    set connectionMatrix(connectionMatrix) {
        this.connectionMatrix = connectionMatrix;
    }

    get verticesOfFigure() {
        let vertices = findTriangleVertices(this._sideA, this._sideB, this._sideC, -0.5 * this._height);
        vertices.push({ x: vertices[0].x, y: vertices[0].y, z: 0.5 * this._height });

        return vertices;
    }

    set verticesOfFigure({ sideA, sideB, sideC, height }) {
        let vertices = findTriangleVertices(sideA, sideB, sideC, -0.5 * height);
        vertices.push({ x: vertices[0].x, y: vertices[0].y, z: 0.5 * height });

        this.verticesOfFigure = vertices;
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
        return this._baseArea + this.sideSurfaceArea();
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
        this.connectionMatrix = connectionMatrix;
    }

    get verticesOfFigure() {
        let vertices = findRectangleVertices(this._sideA, this._sideB, -0.5 * this._height);
        vertices.push({ x: vertices[0].x, y: vertices[0].y, z: 0.5 * this._height });
        return vertices;
    }

    set verticesOfFigure({ sideA, sideB, height }) {
        let vertices = findRectangleVertices(sideA, sideB, -0.5 * height);
        vertices.push({ x: vertices[0].x, y: vertices[0].y, z: 0.5 * height });

        this.verticesOfFigure = vertices;
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
        return 2 * this.baseArea * this._radius + this.sideSurfaceArea;
    }

    get sideSurfaceArea() {
        return 2 * Math.PI * this._radius * this._height;
    }
}

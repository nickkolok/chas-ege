function isValidTriangle(sideA, sideB, sideC) {
    return sideA + sideB > sideC && sideA + sideC > sideB && sideB + sideC > sideA;
}

function findTriangleAngles(sideA, sideB, sideC) {
    const angleA = Math.acos((sideB * sideB + sideC * sideC - sideA * sideA) / (2 * sideB * sideC));
    const angleB = Math.acos((sideA * sideA + sideC * sideC - sideB * sideB) / (2 * sideA * sideC));
    const angleC = Math.acos((sideA * sideA + sideB * sideB - sideC * sideC) / (2 * sideA * sideB));
    return { angleA, angleB, angleC };
}

function findTriangleVertices(sideA, sideB, sideC) {
    if (!isValidTriangle(sideA, sideB, sideC)) {
        throw new Error("Invalid triangle");
    }
    let vertexA = { x: 0, y: 0, z: 0 };
    let vertexB = { x: sideA, y: 0, z: 0 };
    let angleC = Math.acos((sideA * sideA + sideB * sideB - sideC * sideC) / (2 * sideA * sideB));
    let vertexC = {
        x: sideB * Math.cos(angleC),
        y: sideB * Math.sin(angleC),
        z: 0
    };
    return [vertexA, vertexB, vertexC];
}

function findOrthocenter(vertices) {
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
    };

    return orthocenter;
}

function findRectangleVertices(width, height) {
    if (width > 0 && height > 0) {
        return [
            { x: 0, y: 0, z: 0 },
            { x: width, y: 0, z: 0 },
            { x: width, y: height, z: 0 },
            { x: 0, y: height, z: 0 }
        ];
    } else {
        throw new Error("The wrong values of the parties.");
    }
}


function findVerticesOfShape(sideLength, numSides) {
    if (numSides < 3) {
        throw new Error("Invalid input: the figure should have at least 3 sides");
    }

    if (sideLength <= 0) {
        throw new Error("Invalid input: the sideLength is smaller or equal to zero");
    }

    const vertices = [];
    const centralAngle = (2 * Math.PI) / numSides;

    for (let i = 0; i < numSides; i++) {
        const x = sideLength * Math.cos(centralAngle * i);
        const y = sideLength * Math.sin(centralAngle * i);
        vertices.push({ x, y, z: 0 });
    }

    return vertices;
}

function findVerticesOfShape(sideLength, numSides) {
    if (numSides < 3) {
        return "Фигура должна иметь хотя бы 3 стороны";
    }

    const vertices = [];
    const centralAngle = (2 * Math.PI) / numSides;

    for (let i = 0; i < numSides; i++) {
        const x = sideLength * Math.cos(centralAngle * i);
        const y = sideLength * Math.sin(centralAngle * i);
        vertices.push({ x, y, z: 0 });
    }

    return vertices;
}

class Prisma {
    constructor({ height, baseArea }) {
        if (height <= 0) {
            throw new Error("Invalid input: the height is smaller or equal to zero");
        }

        if (baseArea <= 0) {
            throw new Error("Invalid input: the baseArea is smaller or equal to zero");
        }

        this.height = height;
        this.baseArea = baseArea;
    }

    volume() {
        return this.baseArea * this.height;
    }
}

class IrregularTriangularPrisma extends Prisma {
    constructor({ height, sideA, sideB, sideC }) {
        let half = 0.5 * (sideA + sideB + sideC);
        super({ height, baseArea: Math.sqrt(half * (half - sideA) * (half - sideB) * (half - sideC)) });
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;

        if (!isValidTriangle(sideA, sideB, sideC)) {
            throw new Error("It is impossible to create a prism with such a basis.");
        }
    }

    surfaceArea() {
        return 2 * baseArea + this.sideSurfaceArea();
    }

    sideSurfaceArea() {
        return (this.sideA + this.sideB + this.sideC) * this.height;
    }

    diagonals() {
        return {
            diagonalA: Math.sqrt(this.height ** 2 + this.sideA ** 2),
            diagonalB: Math.sqrt(this.height ** 2 + this.sideB ** 2),
            diagonalC: Math.sqrt(this.height ** 2 + this.sideC ** 2),
        }
    }


    coordinate(matrix) {
        let vertex = findTriangleVertices(this.sideA, this.sideB, this.sideC);
        for (let i = 0; i < 3; i++)
            vertex.push({ x: vertex[i].x, y: vertex[i].y, z: this.height })

        matrix = matrix || [
            [1],
            [1, 1],
            [1],
            [0, 1, 0, 1],
            [0, 0, 1, 1, 1]
        ];

        return { vertex, matrix };
    }
}

class RegularPrisma extends Prisma {
    constructor({ height, baseSide, numberSide }) {
        super({ height, baseArea: (numberSide * baseSide ** 2) / (4 * Math.tan(Math.PI / numberSide)) });
        this.baseSide = baseSide;
        this.numberSide = numberSide;

    }

    radiusInscribedCircle() {
        return 0.5 * this.baseSide / Math.tan(Math.PI / this.numberSide);
    }

    radiusCircumscribedCircle() {
        return 0.5 * this.baseSide / Math.sin(Math.PI / this.numberSide);
    }

    surfaceArea() {
        return this.baseArea + this.sideSurfaceArea();
    }

    sideSurfaceArea() {
        return this.baseSide * this.numberSide * this.height;
    }

    diagonalSideFace() {
        return Math.sqrt(this.baseSide ** 2 + this.height ** 2)
    }

    coordinate(matrix) {
        let vertex = findVerticesOfShape(this.baseSide, this.numberSide);

        vertex.push({ x: vertex[this.numberSide - 1].x, y: vertex[this.numberSide - 1].y, z: this.height })
        for (let i = 0; i < this.numberSide - 1; i++)
            vertex.push({ x: vertex[i].x, y: vertex[i].y, z: this.height })

        matrix = matrix || [];
        for (let i = 0; i < 2 * this.numberSide - 1; i++) {
            matrix[i] = [];
            for (let j = 0; j <= i; j++) {
                matrix[i][j] = (i === j) ? 1 : (i === j + this.numberSide || j === i + this.numberSide) ? 1 : 0;
            }
        }

        matrix[matrix.length - 1][this.numberSide] = 1;
        matrix[this.numberSide - 2][0] = 1;

        return { vertex, matrix };
    }
}

class Parallelepiped extends Prisma {
    constructor({ depth, height, width }) {
        super({ height: height, baseArea: depth * width });
        this.depth = depth;
        this.width = width;
        this.height = height;
    }

    surfaceArea() {
        return 2 * (this.depth * this.width + this.width * this.height + this.height * this.depth);
    }

    mainDiagonal() {
        return Math.sqrt(this.depth ** 2 + this.width ** 2 + this.height ** 2);
    }

    DWDiagonal() {
        return Math.sqrt(this.depth ** 2 + this.width ** 2);
    }

    DHDiagonal() {
        return Math.sqrt(this.depth ** 2 + this.height ** 2);
    }

    HWDiagonal() {
        return Math.sqrt(this.height ** 2 + this.width ** 2);
    }

    coordinate(matrix) {
        let vertex = findRectangleVertices(this.width, this.depth)

        vertex.push({ x: vertex[4 - 1].x, y: vertex[4 - 1].y, z: this.height })
        for (let i = 0; i < 4 - 1; i++)
            vertex.push({ x: vertex[i].x, y: vertex[i].y, z: this.height })

        matrix = matrix || [
            [1],
            [0, 1],
            [1, 0, 1],
            [0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 0, 1, 0, 1, 0, 1],
        ];

        return { vertex, matrix };
    }
}

class Cube extends Parallelepiped {
    constructor(baseSide) {
        super({ depth: baseSide, width: baseSide, height: baseSide });
        this.baseSide = baseSide;
    }
}

class Pyramid {
    constructor({ height, baseArea }) {

        if (height <= 0) {
            throw new Error("Invalid input: the height is smaller or equal to zero");
        }

        if (baseArea <= 0) {
            throw new Error("Invalid input: the area is smaller or equal to zero");
        }

        this.height = height;
        this.baseArea = baseArea;
    }

    volume() {
        return (1 / 3) * this.baseArea * this.height;
    }
}

class RegularPyramid extends Pyramid {
    constructor({ height, baseSide, numberSide }) {
        super({ height, baseArea: (numberSide * baseSide ** 2) / (4 * Math.tan(Math.PI / numberSide)) });
        this.baseSide = baseSide;
        this.numberSide = numberSide;
    }

    radiusInscribedCircle() {
        return 0.5 * this.baseSide / Math.tan(Math.PI / this.numberSide);
    }

    radiusCircumscribedCircle() {
        return 0.5 * this.baseSide / Math.sin(Math.PI / this.numberSide);
    }

    surfaceArea() {
        return this.baseArea + this.sideSurfaceArea();
    }

    sideSurfaceArea() {
        return 0.5 * this.baseSide * this.numberSide * this.height;
    }

    sideEdge() {
        return Math.sqrt(this.radiusCircumscribedCircle() ** 2 + this.height ** 2)
    }

    apothem() {
        return Math.sqrt(this.sideEdge() ** 2 - (0.5 * this.baseSide) ** 2)
    }

    coordinate(matrix) {
        let vertex = findVerticesOfShape(this.baseSide, this.numberSide);
        vertex.push({ x: 0, y: 0, z: this.height })

        matrix = matrix || [[1]];
        for (let i = 1; i < this.numberSide - 1; i++) {
            matrix.push(new Array(i).fill(0).concat(1));
        }
        matrix[this.numberSide - 2][0] = 1;
        matrix.push(new Array(this.numberSide).fill(1));
        return { vertex, matrix };
    }

}

class RectangularPyramidWithRightAngledTriangleAtBase extends Pyramid {
    constructor({ height, sideA, sideB }) {
        super({ height, baseArea: 0.5 * sideA * sideB });
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = Math.sqrt(sideA ** 2 + sideB ** 2);
        this.sideEdgeA = Math.sqrt(sideA ** 2 + height ** 2);
        this.sideEdgeB = Math.sqrt(sideB ** 2 + height ** 2);
    }

    sideSurfaceArea() {
        let half = 0.5 * (this.sideEdgeA + this.sideEdgeB + this.sideC)
        return 0.5 * this.height * (this.sideA + this.sideB) + Math.sqrt(half * (half - this.sideEdgeA) * (half - this.sideEdgeB) * (half - this.sideC))
    }

    surfaceArea() {
        return this.baseArea + this.sideSurfaceArea();
    }


    coordinate(matrix) {
        let vertex = findTriangleVertices(this.sideA, this.sideB, this.sideC);
        vertex.push({ x: vertex[0].x, y: vertex[0].y, z: this.height })

        matrix = matrix || [
            [1],
            [1, 1],
            [1, 1, 1],
        ];

        return { vertex, matrix };
    }
}

class RectangularPyramidWithRectangleAtBase extends Pyramid {
    constructor({ height, sideA, sideB }) {
        super({ height, baseArea: sideA * sideB });
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideEdgeA = Math.sqrt(sideA ** 2 + height ** 2);
        this.sideEdgeB = Math.sqrt(sideB ** 2 + height ** 2);
        this.sideEdgeC = Math.sqrt(sideB ** 2 + sideA ** 2 + height ** 2);
    }


    sideSurfaceArea() {
        return 0.5 * this.height * (this.sideA + this.sideB) + 0.5 * (this.sideA * this.sideEdgeA + this.sideB * this.sideEdgeB);
    }

    surfaceArea() {
        return this.baseArea + this.sideSurfaceArea();
    }

    coordinate(matrix) {
        let vertex = findRectangleVertices(this.sideA, this.sideB);
        vertex.push({ x: vertex[0].x, y: vertex[0].y, z: this.height })

        matrix = matrix || [
            [1],
            [0, 1],
            [1, 0, 1],
            [1, 1, 1, 1],
        ];

        return { vertex, matrix };
    }
}

class Sphere {
    constructor(radius) {
        if (radius <= 0) {
            throw new Error("Invalid input: the radius is smaller or equal to zero");
        }
        this.radius = radius;
    }

    diameter() {
        return 2 * this.radius;
    }

    volume() {
        return (4 / 3) * Math.PI * this.radius ** 3;
    }

    surfaceArea() {
        return 4 * Math.PI * this.radius ** 2;
    }

    areaGreatCircle() {
        return Math.PI * this.radius ** 2;
    }
}

class Cone {
    constructor({ radius, height }) {
        if (radius <= 0) {
            throw new Error("Invalid input: the radius is smaller or equal to zero");
        }
        if (height <= 0) {
            throw new Error("Invalid input: the height is smaller or equal to zero");
        }
        this.radius = radius;
        this.height = height;

    }

    diameter() {
        return 2 * this.radius;
    }

    volume() {
        return (1 / 3) * Math.PI * this.radius ** 2 * this.height;
    }

    surfaceArea() {
        return Math.PI * this.radius * (this.radius + this.generatrix());
    }

    baseArea() {
        return Math.PI * this.radius ** 2;
    }

    sideSurfaceArea() {
        return Math.PI * this.radius * this.generatrix();
    }

    generatrix() {
        return Math.sqrt(this.radius ** 2 + this.height ** 2);
    }

}

class Cylinder {
    constructor({ radius, height }) {
        if (radius <= 0) {
            throw new Error("Invalid input: the radius is smaller or equal to zero");
        }
        if (height <= 0) {
            throw new Error("Invalid input: the height is smaller or equal to zero");
        }
        this.radius = radius;
        this.height = height;

    }

    volume() {
        return Math.PI * Math.pow(this.radius, 2) * this.height;
    }

    surfaceArea() {
        return 2 * Math.PI * this.radius * (this.radius + this.height);
    }

    sideSurfaceArea() {
        return 2 * Math.PI * this.radius * this.height;
    }
}




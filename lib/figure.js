function isValidTriangle(sideA,sideB,sideC){
    return sideA + sideB > sideC && sideA + sideC > sideB && sideB + sideC > sideA;
}

class Prisma {
    constructor({ height, baseArea }) {
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

        if (isValidTriangle(sideA,sideB,sideC)) {
            throw new Error("Невозможно создать пирамиду с такими основанием.");
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
}

class RegularPrisma extends Prisma {
    constructor({ height, baseSide, numberSide }) {
        super({ height, baseArea: (numberSide * baseSide ** 2) / (4 * Math.tan(Math.PI / numberSide)) });
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
}

class Cube extends Parallelepiped {
    constructor(baseSide) {
        super({ depth: baseSide, width: baseSide, height: baseSide });
    }
}

class Pyramid {
    constructor({ height, baseArea }) {
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
}

class Sphere {
    constructor(radius) {
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




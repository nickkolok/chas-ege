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

        if (!this._isValidTriangle()) {
            throw new Error("Невозможно создать пирамиду с такими основанием.");
        }
    }

    _isValidTriangle() {
        return this.sideA + this.sideB > this.sideC &&
            this.sideA + this.sideC > this.sideB &&
            this.sideB + this.sideC > this.sideA;
    }

    surfaceArea() {
        return 2 * this.baseArea + (this.sideA + this.sideB + this.sideC) * this.height;
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

class RegularHexagonalPrisma extends Prisma {
    constructor({ height, baseSide }) {
        super({ height, baseArea: 1.5 * Math.sqrt(3) * baseSide ** 2 });
        this.baseSide = baseSide;

        if (!this._isValidRegularHexagon()) {
            throw new Error("Невозможно создать пирамиду с таким основанием.");
        }
    }

    _isValidRegularHexagon() {
        return this.baseSide > 0;
    }

    surfaceArea() {
        return 2 * this.baseArea + 6 * this.baseSide * this.height;
    }

    sideSurfaceArea() {
        return 6 * this.baseSide * this.height;
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

class Pyramid {
    constructor({ height, baseArea }) {
        this.height = height;
        this.baseArea = baseArea;
    }

    volume() {
        return (1 / 3) * this.baseArea * this.height;
    }
}

class IrregularTriangularPyramid extends Pyramid {
    constructor({ sideA, sideB, sideC}) {
        let half = 0.5 * (sideA + sideB + sideC);
        super({ height, baseArea: Math.sqrt(half * (half - sideA) * (half - sideB) * (half - sideC)) });
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;

        if (!this._isValidTriangle()) {
            throw new Error("Невозможно создать пирамиду с такими основанием.");
        }
    }

    _isValidTriangle() {
        return this.sideA + this.sideB > this.sideC &&
            this.sideA + this.sideC > this.sideB &&
            this.sideB + this.sideC > this.sideA;
    }

    radiusInscribedCircle() {
        return this.baseArea / (this.sideA + this.sideC + this.sideB)
    }

    surfaceArea() {
        return this.baseArea + (this.sideA + this.sideB + this.sideC) * this.height / 2;
    }

    sideSurfaceArea() {
        return (this.sideA + this.sideB + this.sideC) * this.height / 2;
    }

    apothems() {
        return {
            apothemSideA: Math.sqrt(this.height ** 2 + (this.sideA / 2) ** 2),
            apothemSideB: Math.sqrt(this.height ** 2 + (this.sideB / 2) ** 2),
            apothemSideC: Math.sqrt(this.height ** 2 + (this.sideC / 2) ** 2),
        };
    }
}

class RegularTriangularPyramid extends IrregularTriangularPyramid {
    constructor({ height, baseSide }) {
        super({ height, sideA: baseSide, sideB: baseSide, sideC: baseSide });
        this.baseSide = baseSide;
    }
}

class ParallelogramPyramid extends Pyramid {
    constructor({ height, sideA, sideB, angleBetweenSideASideB }) {
        super({ height, baseArea: heightA * sideA });
        this.sideA = sideA;
        this.sideB = sideB;
        this.angleBetweenSideASideB = angleBetweenSideASideB;
        this.heightA = sideB * Math.sin(angleBetweenSideASideB);
        this.heightB = sideA * Math.sin(angleBetweenSideASideB);

        if (!this._isValidParallelogram()) {
            throw new Error("Невозможно создать пирамиду с такими сторонами параллелограмма.");
        }
    }

    _isValidParallelogram() {
        return this.sideA > 0 && this.sideB > 0;
    }

    volume() {
        return (1 / 3) * this.baseArea * this.height;
    }

    surfaceArea() {
        return this.baseArea + 2 * (this.sideA * this.apothems().apothemSideA + this.sideB * this.apothems().apothemSideB);
    }

    apothems() {
        return {
            apothemSideA: Math.sqrt(this.height ** 2 + (this.sideA / 2) ** 2),
            apothemSideB: Math.sqrt(this.height ** 2 + (this.sideB / 2) ** 2)
        };
    }
}

class SquarePyramid extends Pyramid {
    constructor({ height, baseSide }) {
        this.baseSide = baseSide;
        super({ height, baseArea: baseSide ** 2 });

        if (!this._isValidSquare()) {
            throw new Error("Невозможно создать пирамиду с таким основанием.");
        }
    }

    _isValidSquare() {
        return this.baseSide > 0;
    }

    volume() {
        return (1 / 3) * this.baseArea * this.height;
    }

    surfaceArea() {
        return this.baseArea + 4 * this.baseSide * this.height;
    }

    apothems() {
        return Math.sqrt(this.height ** 2 + (this.baseSide / 2) ** 2);
    }
}

class RegularHexagonalPyramid extends Pyramid {
    constructor({ height, baseSide }) {
        super({ height, baseArea: 1.5 * Math.sqrt(3) * baseSide ** 2 });
        this.baseSide = baseSide;
        if (!this._isValidRegularHexagon()) {
            throw new Error("Невозможно создать пирамиду с таким основанием.");
        }
    }

    _isValidRegularHexagon() {
        return this.baseSide > 0;
    }

    volume() {
        return (1 / 3) * this.baseArea * this.height;
    }

    surfaceArea() {
        return this.baseArea + 6 * this.baseSide * this.height;
    }

    apothems() {
        return Math.sqrt(this.height ** 2 + (this.baseSide / 2) ** 2);
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





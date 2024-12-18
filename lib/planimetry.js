function isValidTriangle(sideA, sideB, sideC) {
    return sideA + sideB > sideC && sideA + sideC > sideB && sideB + sideC > sideA;
}

function shiftCoordinate2D(A, B) {
    if (!(A instanceof Point) || !(B instanceof Point)) {
        throw new TypeError("Arguments must be instances of Point");
    }

    const xShift = A.x - B.x;
    const yShift = A.y - B.y;

    return new Point(xShift, yShift);
}

function findTriangleVertices2D(sideA, sideB, sideC) {
    if (!isValidTriangle(sideA, sideB, sideC)) {
        throw new Error("Invalid input: three sides do not form a triangle");
    }
    
    // Define the vertices in 2D
    let verticesA = new Point(0, 0);
    let verticesB = new Point(sideA, 0);
    
    // Calculate the angle at vertex C using the law of cosines
    let angleC = Math.acos((sideA * sideA + sideB * sideB - sideC * sideC) / (2 * sideA * sideB));
    
    // Calculate the coordinates of vertex C
    let verticesC = new Point(sideB * Math.cos(angleC), sideB * Math.sin(angleC));

    // Assuming findCircumcenter2D and shiftCoordinate2D are defined for 2D operations
    let circumcenter = findCircumcenter2D(verticesA, verticesB, verticesC);
    let coordinate = [verticesA, verticesB, verticesC].map(vertex => shiftCoordinate2D(vertex, circumcenter));

    return coordinate;
}

function findCircumcenter2D(A, B, C) {
    if (!(A instanceof Point) || !(B instanceof Point) || !(C instanceof Point)) {
        throw new TypeError("Arguments must be instances of Point");
    }

    const AB = lengthInPlane(A, B);
    const BC = lengthInPlane(B, C);
    const CA = lengthInPlane(C, A);

    if (!isValidTriangle(AB, BC, CA)) {
        throw new Error("Three sides do not form a triangle");
    }

    // Calculate the circumcenter in 2D
    const D = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
    if (D === 0) {
        throw new Error("The points are collinear, circumcenter cannot be determined.");
    }

    const Ux = (1 / D) * ((A.x * A.x + A.y * A.y) * (B.y - C.y) + (B.x * B.x + B.y * B.y) * (C.y - A.y) + (C.x * C.x + C.y * C.y) * (A.y - B.y));
    const Uy = (1 / D) * ((A.x * A.x + A.y * A.y) * (C.x - B.x) + (B.x * B.x + B.y * B.y) * (A.x - C.x) + (C.x * C.x + C.y * C.y) * (B.x - A.x));

    return new Point(Ux, Uy);
}

function lengthInPlane(A, B) {
    if (!(A instanceof Point) || !(B instanceof Point)) {
        throw new TypeError("Arguments must be instances of Point");
    }
    return Math.hypot(B.x - A.x, B.y - A.y);
}

class Triangle {
    constructor(firstParameter, secondParameter, thirdParameter) {
        switch (true) {
            case firstParameter instanceof Point && secondParameter instanceof Point && thirdParameter instanceof Point:
                // Constructor with three Points
                this._pointA = firstParameter;
                this._pointB = secondParameter;
                this._pointC = thirdParameter;

                this._sideAB = new Segment(this._pointA, this._pointB).lengthSegment;
                this._sideBC = new Segment(this._pointB, this._pointC).lengthSegment;
                this._sideCA = new Segment(this._pointC, this._pointA).lengthSegment;

                if (!isValidTriangle(this._sideAB, this._sideBC, this._sideCA)) {
                    throw new Error("Three sides do not form a triangle");
                }
                break;

            case typeof firstParameter === 'number' && typeof secondParameter === 'number' && typeof thirdParameter === 'number':
                // Constructor with three side lengths
                const sideA = firstParameter;
                const sideB = secondParameter;
                const sideC = thirdParameter;

                if (!isValidTriangle(sideA, sideB, sideC)) {
                    throw new Error("Three sides do not form a triangle");
                }

                this._sideAB = sideA;
                this._sideBC = sideB;
                this._sideCA = sideC;

                [this._pointA, this._pointB, this._pointC] = findTriangleVertices2D(this._sideAB, this._sideBC, this._sideCA);

                break;

            default:
                throw new TypeError("Invalid arguments: Please provide either three Points or three side lengths.");
        }
    }

    get pointA() {
        return this._pointA.coordinates;
    }

    get pointB() {
        return this._pointB.coordinates;
    }

    get pointC() {
        return this._pointC.coordinates;
    }

    get vertices() {
        return {
            A: this._pointA.coordinates,
            B: this._pointB.coordinates,
            C: this._pointC.coordinates
        };
    }

    get sideAB() {
        return this._sideAB;
    }

    get sideBC() {
        return this._sideBC;
    }

    get sideCA() {
        return this._sideCA;
    }

    get sides() {
        return {
            sideAB: this._sideAB,
            sideBC: this._sideBC,
            sideCA: this._sideCA,
        };
    }

    get perimeterTriangle() {
        return this._sideAB + this._sideBC + this._sideCA;
    }

    get areaTriangle() {
        const s = this.perimeterTriangle / 2;
        return Math.sqrt(s * (s - this._sideAB) * (s - this._sideBC) * (s - this._sideCA));
    }
}


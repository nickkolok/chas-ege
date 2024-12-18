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
    let verticesA = { x: 0, y: 0 };
    let verticesB = { x: sideA, y: 0 };
    
    // Calculate the angle at vertex C using the law of cosines
    let angleC = Math.acos((sideA * sideA + sideB * sideB - sideC * sideC) / (2 * sideA * sideB));
    
    // Calculate the coordinates of vertex C
    let verticesC = {
        x: sideB * Math.cos(angleC),
        y: sideB * Math.sin(angleC)
    };

    // Assuming findCircumcenter2D and shiftCoordinate2D are defined for 2D operations
    let circumcenter = findCircumcenter2D(verticesA, verticesB, verticesC);
    let coordinate = [verticesA, verticesB, verticesC].map((elem) => shiftCoordinate2D(elem, circumcenter));

    return coordinate;
}

function findCircumcenter2D(A, B, C) {
    const AB = lengthInPlane(A, B);
    const BC = lengthInPlane(B, C);
    const CA = lengthInPlane(C, A);

    if (!isValidTriangle(AB, BC, CA)) {
        throw new Error("Three sides do not form a triangle");
    }

    // Calculate the circumcenter in 2D
    const D = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
    if (D === 0) {
        return false;
    }

    const Ux = (1 / D) * ((A.x * A.x + A.y * A.y) * (B.y - C.y) + (B.x * B.x + B.y * B.y) * (C.y - A.y) + (C.x * C.x + C.y * C.y) * (A.y - B.y));
    const Uy = (1 / D) * ((A.x * A.x + A.y * A.y) * (C.x - B.x) + (B.x * B.x + B.y * B.y) * (A.x - C.x) + (C.x * C.x + C.y * C.y) * (B.x - A.x));

    return { x: Ux, y: Uy };
}

// Example of a 2D length function
function lengthInPlane(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
  

class Point {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get coordinates() {
        return { x: this._x, y: this._y };
    }
}

class Segment {
    constructor(firstParameter, secondParameter, angle) {
        switch (true) {
            case firstParameter instanceof Point && secondParameter instanceof Point:
                this._startPoint = firstParameter;
                this._endPoint = secondParameter;
                break;

            case typeof firstParameter === 'number':
                const length = firstParameter;
                const startPoint = secondParameter instanceof Point ? secondParameter : new Point(0, 0);
                const angleInRadians = typeof angle === 'number' ? angle : 0;

                this._startPoint = startPoint;
                const dx = length * Math.cos(angleInRadians);
                const dy = length * Math.sin(angleInRadians);
                this._endPoint = new Point(startPoint.x + dx, startPoint.y + dy);
                break;

            default:
                throw new Error("Invalid arguments: Please provide valid Points or a length with optional start Point and angle.");
        }
    }

    get startPoint() {
        return this._startPoint;
    }

    get endPoint() {
        return this._endPoint;
    }

    get lengthSegment() {
        const dx = this._endPoint.x - this._startPoint.x;
        const dy = this._endPoint.y - this._startPoint.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    get midPointSegment() {
        const midX = (this._startPoint.x + this._endPoint.x) / 2;
        const midY = (this._startPoint.y + this._endPoint.y) / 2;
        return new Point(midX, midY);
    }
}

class Triangle {
    constructor(firstParameter, secondParameter, thirdParameter) {
        if (!(firstParameter instanceof Point) || !(secondParameter instanceof Point) || !(thirdParameter instanceof Point)) {
            throw new TypeError("All vertices must be instances of Point class");
        }

        this._pointA = firstParameter;
        this._pointB = secondParameter;
        this._pointC = thirdParameter;

        this._sideAB = new Segment(this._pointA, this._pointB).lengthSegment;
        this._sideBC = new Segment(this._pointB, this._pointC).lengthSegment;
        this._sideCA = new Segment(this._pointC, this._pointA).lengthSegment;

        if (!isValidTriangle(this._sideAB, this._sideBC, this._sideCA)) {
            throw new Error("Three sides do not form a triangle");
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


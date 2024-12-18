class Triangle {
    constructor(firstParameter, secondParameter, thirdParameter) {
        switch (true) {
            case firstParameter instanceof Point && secondParameter instanceof Point && thirdParameter instanceof Point:
                this._createFromPoints(firstParameter, secondParameter, thirdParameter);
                break;

            case typeof firstParameter === 'number' && typeof secondParameter === 'number' && typeof thirdParameter === 'number':
                this._createFromSideLengths(firstParameter, secondParameter, thirdParameter);
                break;

            default:
                throw new TypeError("Invalid arguments: Please provide either three Points or three side lengths.");
        }

        this._angleA = new Angle(this._pointB, this._pointA, this._pointC).angleInRadians;
        this._angleB = new Angle(this._pointA, this._pointB, this._pointC).angleInRadians;
        this._angleC = new Angle(this._pointA, this._pointC, this._pointB).angleInRadians;
    }

    _createFromPoints(pointA, pointB, pointC) {
        this._pointA = pointA;
        this._pointB = pointB;
        this._pointC = pointC;

        this._sideAB = new Segment(this._pointA, this._pointB);
        this._sideBC = new Segment(this._pointB, this._pointC);
        this._sideCA = new Segment(this._pointC, this._pointA);

        this._lengthAB = this._sideAB.length;
        this._lengthBC = this._sideBC.length;
        this._lengthCA = this._sideCA.length;

        if (!isValidTriangle(this._lengthAB, this._lengthBC, this._lengthCA)) {
            throw new Error("Three sides do not form a triangle");
        }
    }

    _createFromSideLengths(sideA, sideB, sideC) {
        if (!isValidTriangle(sideA, sideB, sideC)) {
            throw new Error("Three sides do not form a triangle");
        }

        this._lengthAB = sideA;
        this._lengthBC = sideB;
        this._lengthCA = sideC;

        [this._pointA, this._pointB, this._pointC] = findTriangleVertices2D(this._lengthAB, this._lengthBC, this._lengthCA);

        this._sideAB = new Segment(this._pointA, this._pointB);
        this._sideBC = new Segment(this._pointB, this._pointC);
        this._sideCA = new Segment(this._pointC, this._pointA);
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

    get lengthAB() {
        return this._lengthAB;
    }

    get lengthBC() {
        return this._lengthBC;
    }

    get lengthCA() {
        return this._lengthCA;
    }

    get lengths() {
        return {
            lengthAB: this._lengthAB,
            lengthBC: this._lengthBC,
            lengthCA: this._lengthCA,
        };
    }

    get angleAInRadians() {
        return this._angleA;
    }

    get angleBInRadians() {
        return this._angleB;
    }

    get angleCInRadians() {
        return this._angleC;
    }

    get angleAInDegrees() {
        return radiansToDegrees(this._angleAInRadians)
    }

    get angleBInDegrees() {
        return radiansToDegrees(this._angleBInRadians)
    }

    get angleCInDegrees() {
        return radiansToDegrees(this._angleCInRadians)
    }

    get perimeter() {
        return this._lengthAB + this._lengthBC + this._lengthCA;
    }

    get semiperimeter() {
        return this.perimeter / 2;
    }

    get area() {
        return Math.sqrt(this.semiperimeter * (this.semiperimeter - this._lengthAB) * (this.semiperimeter - this._lengthBC) * (this.semiperimeter - this._lengthCA));
    }
}

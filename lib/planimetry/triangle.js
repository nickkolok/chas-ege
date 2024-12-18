class Triangle {
    constructor(firstParameter, secondParameter, thirdParameter) {
        switch (true) {
            case firstParameter instanceof Point && secondParameter instanceof Point && thirdParameter instanceof Point:
                // Constructor with three Points
                this._pointA = firstParameter;
                this._pointB = secondParameter;
                this._pointC = thirdParameter;

                this._sideAB = new Segment(this._pointA, this._pointB);
                this._sideBC = new Segment(this._pointB, this._pointC);
                this._sideCA = new Segment(this._pointC, this._pointA);

                this._lengthAB = this._sideAB.lengthSegment;
                this._lengthBC = this._sideBC.lengthSegment;
                this._lengthCA = this._sideCA.lengthSegment;

                if (!isValidTriangle(this._lengthAB, this._lengthBC, this._lengthCA)) {
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

                this._lengthAB = sideA;
                this._lengthBC = sideB;
                this._lengthCA = sideC;

                [this._pointA, this._pointB, this._pointC] = findTriangleVertices2D(this._lengthAB, this._lengthBC, this._lengthCA);

                this._sideAB = new Segment(this._pointA, this._pointB);
                this._sideBC = new Segment(this._pointB, this._pointC);
                this._sideCA = new Segment(this._pointC, this._pointA);

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

    get perimeterTriangle() {
        return this._lengthAB + this._lengthBC + this._lengthCA;
    }

    get areaTriangle() {
        const s = this.perimeterTriangle / 2;
        return Math.sqrt(s * (s - this._lengthAB) * (s - this._lengthBC) * (s - this._lengthCA));
    }
}

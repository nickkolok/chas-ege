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

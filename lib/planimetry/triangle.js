class Triangle {
    #angleA
    #angleB
    #angleC

    constructor({ points, lengths, angles, supplementary = {} }) {
        const isAngleInDegree = angles.angleInDegree || false;
        const {
            calculateMedians = false,
            calculateHeights = false,
            calculateBisectors = false,
            calculateMidlines = false
        } = supplementary;

        switch (true) {
            case points && points.length === 3 && points.every(p => p.x !== undefined && p.y !== undefined):
                const [pointA, pointB, pointC] = points.map(p => new Point(p.x, p.y));
                this._createFromPoints(pointA, pointB, pointC);
                break;

                case lengths && lengths.length === 3 && lengths.every(length => typeof length === 'number' && length > 0):
                const [lengthAB, lengthBC, lengthCA] = lengths;
                if (typeof lengthAB === 'number' && typeof lengthBC === 'number' && typeof lengthCA === 'number') {
                    this._createFromSideLengths(lengthAB, lengthBC, lengthCA);
                } else {
                    throw new TypeError("Invalid lengths: Please provide three numeric side lengths.");
                }
                break;
            case lengths && lengths.length === 2 && angles && angles.length === 1:
                const [sideAB, sideBC] = lengths;
                const [angleB] = angles;
                const angleInRadians = isAngleInDegree ? degreesToRadians(angleB) : angleB;
                const sideCA = calculateThirdSide(sideAB, sideBC, angleInRadians)
                this._createFromSideLengths(sideAB, sideBC, sideCA);
                break;
            default:
                throw new TypeError("Invalid arguments: Please provide either three Points, three side lengths, or two side lengths and one angle.");        }

        this.#angleA = new Angle(this.#pointB, this.#pointA, this.#pointC).angleInRadians;
        this.#angleB = new Angle(this.#pointA, this.#pointB, this.#pointC).angleInRadians;
        this.#angleC = new Angle(this.#pointA, this.#pointC, this.#pointB).angleInRadians;

        if (calculateMedians) {
            this._calculateMedians();
        }
        if (calculateHeights) {
            this._calculateHeights();
        }
        if (calculateBisectors) {
            this._calculateBisectors();
        }
        if (calculateMidlines) {
            this._calculateMidlines();
        }
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

    _calculateMedians() {
        const midPointBC = this._sideBC.midPoint;
        const midPointCA = this._sideCA.midPoint;
        const midPointAB = this._sideAB.midPoint;

        this._medianA = new Segment(this._pointA, midPointBC);
        this._medianB = new Segment(this._pointB, midPointCA);
        this._medianC = new Segment(this._pointC, midPointAB);
    }

    _calculateHeights() {
        const area = this.area;

        const heightA = (2 * area) / this._lengthBC;
        const heightB = (2 * area) / this._lengthCA;
        const heightC = (2 * area) / this._lengthAB;

        const footA = this._calculateFootOfPerpendicular(this._pointA, this._sideBC);
        const footB = this._calculateFootOfPerpendicular(this._pointB, this._sideCA);
        const footC = this._calculateFootOfPerpendicular(this._pointC, this._sideAB);

        this._heightA = new Segment(this._pointA, footA);
        this._heightB = new Segment(this._pointB, footB);
        this._heightC = new Segment(this._pointC, footC);
    }

    _calculateFootOfPerpendicular(point, side) {
        const x1 = side.startPoint.x;
        const y1 = side.startPoint.y;
        const x2 = side.endPoint.x;
        const y2 = side.endPoint.y;
        const x0 = point.x;
        const y0 = point.y;

        const dx = x2 - x1;
        const dy = y2 - y1;
        const d = dx * dx + dy * dy;
        const a = (dx * (x0 - x1) + dy * (y0 - y1)) / d;

        const x = x1 + a * dx;
        const y = y1 + a * dy;

        return new Point(x, y);
    }

    _calculateBisectors() {
        this._bisectorA = this._calculateBisector(this.#pointA, this.#sideBC, this.#angleA);
        this._bisectorB = this._calculateBisector(this.#pointB, this.#sideCA, this.#angleB);
        this._bisectorC = this._calculateBisector(this.#pointC, this.#sideAB, this.#angleC);
    }

    _calculateBisector(vertex, oppositeSide, angle) {
        const length = (2 * oppositeSide.length * Math.cos(angle / 2)) / (this._lengthAB + this._lengthBC + this._lengthCA - oppositeSide.length);
        const foot = this._calculateFootOfBisector(vertex, oppositeSide, length);
        return new Segment(vertex, foot);
    }

    _calculateFootOfBisector(vertex, oppositeSide, bisectorLength) {
        // Calculate the foot of the bisector on the opposite side
        const midPoint = oppositeSide.midPoint;
        const direction = new Point(midPoint.x - vertex.x, midPoint.y - vertex.y);
        const scale = bisectorLength / Math.sqrt(direction.x * direction.x + direction.y * direction.y);
        const x = vertex.x + direction.x * scale;
        const y = vertex.y + direction.y * scale;
        return new Point(x, y);
    }

    _calculateMidlines() {
        const midPointAB = this._sideAB.midPoint;
        const midPointBC = this._sideBC.midPoint;
        const midPointCA = this._sideCA.midPoint;

        this._midlineAB = new Segment(midPointBC, midPointCA);
        this._midlineBC = new Segment(midPointCA, midPointAB);
        this._midlineCA = new Segment(midPointAB, midPointBC);
    }

    get medianA() {
        return this._medianA;
    }

    get medianB() {
        return this._medianB;
    }

    get medianC() {
        return this._medianC;
    }

    get medianALength() {
        return this._medianA.length();
    }

    get medianBLength() {
        return this._medianB.length();
    }

    get medianCLength() {
        return this._medianC.length();
    }

    get medianLengths() {
        return {
            medianALength: this.medianALength,
            medianBLength: this.medianBLength,
            medianCLength: this.medianCLength,
        };
    }

    get heightA() {
        return this._heightA;
    }

    get heightB() {
        return this._heightB;
    }

    get heightC() {
        return this._heightC;
    }

    get heightALength() {
        return this._heightA.length;
    }

    get heightBLength() {
        return this._heightB.length;
    }

    get heightCLength() {
        return this._heightC.length;
    }

    get heightLengths() {
        return {
            heightALength: this.heightALength,
            heightBLength: this.heightBLength,
            heightCLength: this.heightCLength,
        };
    }

    get bisectorA() {
        return this._bisectorA;
    }

    get bisectorB() {
        return this._bisectorB;
    }

    get bisectorC() {
        return this._bisectorC;
    }

    get bisectorALength() {
        return this._bisectorA.length;
    }

    get bisectorBLength() {
        return this._bisectorB.length;
    }

    get bisectorCLength() {
        return this._bisectorC.length;
    }

    get bisectorLengths() {
        return {
            bisectorALength: this.bisectorALength,
            bisectorBLength: this.bisectorBLength,
            bisectorCLength: this.bisectorCLength,
        };
    }

    get midlineAB() {
        return this._midlineAB;
    }

    get midlineBC() {
        return this._midlineBC;
    }

    get midlineCA() {
        return this._midlineCA;
    }

    get midlineABLength() {
        return this._midlineAB.length;
    }

    get midlineBCLength() {
        return this._midlineBC.length;
    }

    get midlineCALength() {
        return this._midlineCA.length;
    }

    get midlineLengths() {
        return {
            midlineABLength: this.midlineABLength,
            midlineBCLength: this.midlineBCLength,
            midlineCALength: this.midlineCALength,
        };
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
        [this._pointA.coordinates, this._pointB.coordinates, this._pointC.coordinates]
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
        return this.#angleA;
    }

    get angleBInRadians() {
        return this.#angleB;
    }

    get angleCInRadians() {
        return this.#angleC;
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

    get connectionMatrix() {
        return [
            [1],
            [1, 1],
        ];
    }

    set connectionMatrix(connectionMatrix) {
        this.connectionMatrix = connectionMatrix;
    }
}

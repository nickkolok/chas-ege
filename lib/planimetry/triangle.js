class Triangle {
    #angleA
    #angleB
    #angleC

    #pointA
    #pointB
    #pointC

    #sideAB
    #sideBC
    #sideCA

    #lengthAB
    #lengthBC
    #lengthCA

    #medianAB
    #medianBC
    #medianCA

    #heightA
    #heightB
    #heightC

    #bisectorA
    #bisectorB
    #bisectorC

    #midlineAB
    #midlineBC
    #midlineCA

    constructor({ points = [], lengths = [], angles = [], supplementary = {} }) {
        this.isAngleInDegree = angles.angleInDegree || false;
        angles = angles.angles;
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
                const angleInRadians = this.isAngleInDegree ? degreesToRadians(angleB) : angleB;
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
        this.#pointA = pointA;
        this.#pointB = pointB;
        this.#pointC = pointC;

        this.#sideAB = new Segment(this.#pointA, this.#pointB);
        this.#sideBC = new Segment(this.#pointB, this.#pointC);
        this.#sideCA = new Segment(this.#pointC, this.#pointA);

        this.#lengthAB = this.#sideAB.length;
        this.#lengthBC = this.#sideBC.length;
        this.#lengthCA = this.#sideCA.length;

        if (!isValidTriangle(this.#lengthAB, this.#lengthBC, this.#lengthCA)) {
            throw new Error("Three sides do not form a triangle");
        }
    }

    _createFromSideLengths(sideA, sideB, sideC) {
        if (!isValidTriangle(sideA, sideB, sideC)) {
            throw new Error("Three sides do not form a triangle");
        }

        this.#lengthAB = sideA;
        this.#lengthBC = sideB;
        this.#lengthCA = sideC;

        [this.#pointA, this.#pointB, this.#pointC] = findTriangleVertices2D(this.#lengthAB, this.#lengthBC, this.#lengthCA);

        this.#sideAB = new Segment(this.#pointA, this.#pointB);
        this.#sideBC = new Segment(this.#pointB, this.#pointC);
        this.#sideCA = new Segment(this.#pointC, this.#pointA);
    }

    _calculateMedians() {
        const midPointBC = this.#sideBC.midPoint;
        const midPointCA = this.#sideCA.midPoint;
        const midPointAB = this.#sideAB.midPoint;

        this.#medianAB = new Segment(midPointBC, midPointCA);
        this.#medianBC = new Segment(midPointAB, midPointCA);
        this.#medianCA = new Segment(midPointAB, midPointBC);
    }

    _calculateHeights() {
        const footA = this._calculateFootOfPerpendicular(this.#pointA, this.#sideBC);
        const footB = this._calculateFootOfPerpendicular(this.#pointB, this.#sideCA);
        const footC = this._calculateFootOfPerpendicular(this.#pointC, this.#sideAB);

        this.#heightA = new Segment(this.#pointA, footA);
        this.#heightB = new Segment(this.#pointB, footB);
        this.#heightC = new Segment(this.#pointC, footC);
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
        this.#bisectorA = this._calculateBisector(this.#pointA, this.#sideBC, this.#angleA);
        this.#bisectorB = this._calculateBisector(this.#pointB, this.#sideCA, this.#angleB);
        this.#bisectorC = this._calculateBisector(this.#pointC, this.#sideAB, this.#angleC);
    }

    _calculateBisector(vertex, oppositeSide, angle) {
        const length = (2 * oppositeSide.length * Math.cos(angle / 2)) / (this.#lengthAB + this.#lengthBC + this.#lengthCA - oppositeSide.length);
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
        const midPointAB = this.#sideAB.midPoint;
        const midPointBC = this.#sideBC.midPoint;
        const midPointCA = this.#sideCA.midPoint;

        this.#midlineAB = new Segment(midPointBC, midPointCA);
        this.#midlineBC = new Segment(midPointCA, midPointAB);
        this.#midlineCA = new Segment(midPointAB, midPointBC);
    }

    get medianAB() {
        return this.#medianAB;
    }

    get medianBC() {
        return this.#medianBC;
    }

    get medianCA() {
        return this.#medianCA;
    }

    get medianALength() {
        return this.medianAB.length();
    }

    get medianBLength() {
        return this.medianBC.length();
    }

    get medianCLength() {
        return this.medianCA.length();
    }

    get medianLengths() {
        return {
            medianALength: this.medianALength,
            medianBLength: this.medianBLength,
            medianCLength: this.medianCLength,
        };
    }

    get heightA() {
        return this.#heightA;
    }

    get heightB() {
        return this.#heightB;
    }

    get heightC() {
        return this.#heightC;
    }

    get heightALength() {
        return this.#heightA.length;
    }

    get heightBLength() {
        return this.#heightB.length;
    }

    get heightCLength() {
        return this.#heightC.length;
    }

    get heightLengths() {
        return {
            heightALength: this.heightALength,
            heightBLength: this.heightBLength,
            heightCLength: this.heightCLength,
        };
    }

    get bisectorA() {
        return this.#bisectorA;
    }

    get bisectorB() {
        return this.#bisectorB;
    }

    get bisectorC() {
        return this.#bisectorC;
    }

    get bisectorALength() {
        return this.#bisectorA.length;
    }

    get bisectorBLength() {
        return this.#bisectorB.length;
    }

    get bisectorCLength() {
        return this.#bisectorC.length;
    }

    get bisectorLengths() {
        return {
            bisectorALength: this.bisectorALength,
            bisectorBLength: this.bisectorBLength,
            bisectorCLength: this.bisectorCLength,
        };
    }

    get midlineAB() {
        return this.#midlineAB;
    }

    get midlineBC() {
        return this.#midlineBC;
    }

    get midlineCA() {
        return this.#midlineCA;
    }

    get midlineABLength() {
        return this.#midlineAB.length;
    }

    get midlineBCLength() {
        return this.#midlineBC.length;
    }

    get midlineCALength() {
        return this.#midlineCA.length;
    }

    get midlineLengths() {
        return {
            midlineABLength: this.midlineABLength,
            midlineBCLength: this.midlineBCLength,
            midlineCALength: this.midlineCALength,
        };
    }

    get pointA() {
        return this.#pointA.coordinates;
    }

    get pointB() {
        return this.#pointB.coordinates;
    }

    get pointC() {
        return this.#pointC.coordinates;
    }

    get vertices() {
        return [this.#pointA.coordinates, this.#pointB.coordinates, this.#pointC.coordinates];
    }

    get sideAB() {
        return this.#sideAB;
    }

    get sideBC() {
        return this.#sideBC;
    }

    get sideCA() {
        return this.#sideCA;
    }

    get sides() {
        return {
            sideAB: this.#sideAB,
            sideBC: this.#sideBC,
            sideCA: this.#sideCA,
        };
    }

    get lengthAB() {
        return this.#lengthAB;
    }

    get lengthBC() {
        return this.#lengthBC;
    }

    get lengthCA() {
        return this.#lengthCA;
    }

    get lengths() {
        return [this.#lengthAB, this.#lengthBC, this.#lengthCA]
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
        return this.isAngleInDegree ? this.#angleA: radiansToDegrees(this.angleAInRadians)
    }

    get angleBInDegrees() {
        return this.isAngleInDegree ? this.#angleB: radiansToDegrees(this.angleBInRadians)
    }

    get angleCInDegrees() {
        return this.isAngleInDegree ? this.#angleC: radiansToDegrees(this.angleCInRadians)
    }

    get perimeter() {
        return this.#lengthAB + this.#lengthBC + this.#lengthCA;
    }

    get semiperimeter() {
        return this.perimeter / 2;
    }

    get area() {
        return Math.sqrt(this.semiperimeter * (this.semiperimeter - this.#lengthAB) * (this.semiperimeter - this.#lengthBC) * (this.semiperimeter - this.#lengthCA));
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

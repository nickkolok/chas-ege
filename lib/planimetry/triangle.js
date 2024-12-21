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

    #medianA
    #medianB
    #medianC

    #heightA
    #heightB
    #heightC

    #bisectorA
    #bisectorB
    #bisectorC

    #midlineAB
    #midlineBC
    #midlineCA

    #vertices

    #connectionMatrix

    constructor({ points = [], lengths = [], angles = {}, supplementary = {} }) {
        this.isAngleInDegree = angles.angleInDegree || false;
        angles = angles.angles;
        const {
            calculateMedians = false,
            calculateHeights = false,
            calculateBisectors = false,
            calculateMidlines = false
        } = supplementary;

        this.#connectionMatrix = [
            [1],
            [1, 1],
        ];

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
                    throw new TypeError(`Invalid lengths: Received lengths are ${JSON.stringify(lengths)}. Please provide three numeric side lengths.`);
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
                throw new TypeError(`Invalid arguments: Received points ${JSON.stringify(points)}, lengths ${JSON.stringify(lengths)}, angles ${JSON.stringify(angles)}. Please provide either three Points, three side lengths, or two side lengths and one angle.`);
        }

        this.#angleA = new Angle(this.#pointB, this.#pointA, this.#pointC).angleInRadians;
        this.#angleB = new Angle(this.#pointA, this.#pointB, this.#pointC).angleInRadians;
        this.#angleC = new Angle(this.#pointA, this.#pointC, this.#pointB).angleInRadians;

        this.#vertices = [this.#pointA, this.#pointB, this.#pointC].map(point => point.coordinates);

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

        this.#medianA = new Segment(this.#pointA, midPointBC);
        this.#medianB = new Segment(this.#pointB, midPointCA);
        this.#medianC = new Segment(this.#pointC, midPointAB);
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

    get medianA() {
        return this.#medianA;
    }

    get medianB() {
        return this.#medianB;
    }

    get medianC() {
        return this.#medianC;
    }

    get medianPointA() {
        return [this.medianA.startPoint.coordinates, this.medianA.endPoint.coordinates];
    }

    get medianPointB() {
        return [this.medianB.startPoint.coordinates, this.medianB.endPoint.coordinates];
    }

    get medianPointC() {
        return [this.medianC.startPoint.coordinates, this.medianC.endPoint.coordinates];
    }

    get medianEndPointA() {
        return this.medianA.endPoint.coordinates;
    }

    get medianEndPointB() {
        return this.medianB.endPoint.coordinates;
    }

    get medianEndPointC() {
        return this.medianC.endPoint.coordinates;
    }

    get medianEndPoints() {
        return {
            medianEndPointA: this.medianA.endPoint.coordinates,
            medianEndPointB: this.medianB.endPoint.coordinates,
            medianEndPointC: this.medianC.endPoint.coordinates
        };
    }

    get medianALength() {
        return this.medianA.length();
    }

    get medianBLength() {
        return this.medianB.length();
    }

    get medianCLength() {
        return this.medianC.length();
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

    get heightEndPointA() {
        return this.heightA.endPoint.coordinates;
    }

    get heightEndPointB() {
        return this.heightB.endPoint.coordinates;
    }

    get heightEndPointC() {
        return this.heightC.endPoint.coordinates;
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

    get bisectorEndPointA() {
        return this.bisectorA.endPoint.coordinates;
    }

    get bisectorEndPointB() {
        return this.bisectorB.endPoint.coordinates;
    }

    get bisectorEndPointC() {
        return this.bisectorC.endPoint.coordinates;
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

    get midlineEndPointAB() {
        return this.midlineAB.endPoint.coordinates;
    }

    get midlineEndPointBC() {
        return this.midlineBC.endPoint.coordinates;
    }

    get midlineEndPointCA() {
        return this.midlineCA.endPoint.coordinates;
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
        return this.#vertices;
    }

    addVertex(points, type) {
        if (!Array.isArray(points)) {
            points = [points]; // Convert single point to an array
        }

        points.forEach(point => {
            if (point.x === undefined || point.y === undefined) {
                throw new Error("Each point must have x and y coordinates");
            }
        });

        this.#vertices.push(...points);
        if (type !== undefined) {
            if (!Array.isArray(type)) {
                type = [type]; // Convert single type to an array
            }

            if (points.length > 1 && type.length === 1 && type[0] !== 'S') {
                type = Array(points.length).fill(type[0]);
            }

            type.forEach(typeABC => {
                this.#connectionMatrix.push(new Array(this.#connectionMatrix.length + 1).fill(0));
                switch (typeABC) {
                    case 'A': // add points and connect to A
                        this.connectVertices([0, this.#connectionMatrix.length]); // Connect to vertex A
                        break;
                    case 'B': // add points and connect to B
                        this.connectVertices([1, this.#connectionMatrix.length]); // Connect to vertex B
                        break;
                    case 'C': // add points and connect to C
                        this.connectVertices([2, this.#connectionMatrix.length]); // Connect to vertex C
                        break;
                    case 'S': // add segment CD and connect C and D
                        this.connectVertices([this.#connectionMatrix.length, this.#connectionMatrix.length - 1]); // Connect C and D
                        break;
                    case 'E': // add points                        
                        break;
                    default:
                        throw new Error("Invalid type specified. Available types are 'A', 'B', 'C', 'S', 'E'. " + typeABC);
                }
            });
        }
    }

    connectVertices(vertexPairs) {
        // If the input is a single pair, wrap it in an array
        if (!Array.isArray(vertexPairs[0])) {
            vertexPairs = [vertexPairs];
        }

        vertexPairs.forEach(pair => {
            if (!Array.isArray(pair) || pair.length !== 2) {
                throw new Error("Each element in the array should be an array with exactly two vertex indices.");
            }

            let [index1, index2] = pair;

            // Ensure the largest index is first
            if (index1 < index2) {
                [index1, index2] = [index2, index1];
            }

            if (index1 < 0 || index2 < 0 || index1 >= this.#vertices.length || index2 >= this.#vertices.length) {
                throw new Error("Vertex indices are out of bounds.");
            }

            // Connect the vertices
            this.#connectionMatrix[index1 - 1][index2] = 1;
        });
    }

    connectVerticesCyclic(vertexPairs) {
        // Убедимся, что vertexPairs всегда массив массивов
        if (!Array.isArray(vertexPairs[0])) {
            vertexPairs = [vertexPairs];
        }

        vertexPairs.forEach(subArray => {
            // Используем метод generatePairs для создания пар
            subArray.generatePairs();
            // Применяем connectVertices к каждой паре
            subArray.forEach(pair => {
                this.connectVertices(pair);
            });
        });
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
        return {
            lengthAB: this.lengthAB,
            lengthBC: this.lengthBC,
            lengthCA: this.lengthCA
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
        return this.isAngleInDegree ? this.#angleA : radiansToDegrees(this.angleAInRadians)
    }

    get angleBInDegrees() {
        return this.isAngleInDegree ? this.#angleB : radiansToDegrees(this.angleBInRadians);
    }

    get angleCInDegrees() {
        return this.isAngleInDegree ? this.#angleC : radiansToDegrees(this.angleCInRadians)
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
        return this.#connectionMatrix;
    }

    set connectionMatrix(connectionMatrix) {
        this.connectionMatrix = connectionMatrix;
    }
}

class Triangle {
    #angleAInRadians
    #angleBInRadians
    #angleCInRadians

    #angleAInDegrees
    #angleBInDegrees
    #angleCInDegrees

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

    constructor({ points = [], lengths = {}, angles = {}, supplementary = {} }) {
        this.isAngleInDegree = angles.angleInDegree || false;
        const angleValues = angles.angle || {};
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

        const { lengthAB, lengthBC, lengthCA } = lengths;

        switch (true) {
            case points && points.length === 3 && points.every(p => p.x !== undefined && p.y !== undefined):
                const [pointA, pointB, pointC] = points.map(p => new Point(p.x, p.y));
                this._createFromPoints(pointA, pointB, pointC);
                break;

            case Object.keys(lengths).length == 3:
                if (typeof lengthAB === 'number' && typeof lengthBC === 'number' && typeof lengthCA === 'number') {
                    this._createFromSideLengths(lengthAB, lengthBC, lengthCA);
                } else {
                    throw new TypeError(`Invalid lengths: Received lengths are ${JSON.stringify(lengths)}. Please provide three numeric side lengths.`);
                }
                break;

            case Object.keys(lengths).length == 2 && typeof angleValues === 'number':
                const angleInRadians = this.isAngleInDegree ? degreesToRadians(angleValues) : angleValues;
                switch (true) {
                    case (lengthAB > 0 && lengthBC > 0):
                        const sideCA = calculateThirdSide(lengthAB, lengthBC, angleInRadians);
                        this._createFromSideLengths(lengthAB, lengthBC, sideCA);
                        break;
                    case (lengthAB > 0 && lengthCA > 0):
                        const sideBC = calculateThirdSide(lengthAB, lengthCA, angleInRadians);
                        this._createFromSideLengths(lengthAB, sideBC, lengthCA);
                        break;
                    case (lengthBC > 0 && lengthCA > 0):
                        const sideAB = calculateThirdSide(lengthBC, lengthCA, angleInRadians);
                        this._createFromSideLengths(sideAB, lengthBC, lengthCA);
                        break;
                    default:
                        throw new TypeError(`Invalid lengths: At least two side lengths and one angle are required.`);
                }
                break;

            default:
                throw new TypeError(`Invalid arguments: Received points ${JSON.stringify(points)}, lengths ${JSON.stringify(lengths)}, angleValues ${JSON.stringify(angleValues)}. Please provide either three Points, three side lengths, or two side lengths and one angle.`);
        }

        if (this.#pointA && this.#pointB && this.#pointC) {
            this.#setAngles();
        } else {
            throw new Error("Points A, B, and C must be initialized before setting angles.");
        }

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

    #setAngles() {
        if (this.isAngleInDegree) {
            this.#angleAInDegrees = new Angle(this.#pointB, this.#pointA, this.#pointC).angleInDegrees;
            this.#angleBInDegrees = new Angle(this.#pointA, this.#pointB, this.#pointC).angleInDegrees;
            this.#angleCInDegrees = new Angle(this.#pointA, this.#pointC, this.#pointB).angleInDegrees;

            this.#angleAInRadians = degreesToRadians(this.#angleAInDegrees);
            this.#angleBInRadians = degreesToRadians(this.#angleBInDegrees);
            this.#angleCInRadians = degreesToRadians(this.#angleCInDegrees);
        } else {
            this.#angleAInRadians = new Angle(this.#pointB, this.#pointA, this.#pointC).angleInRadians;
            this.#angleBInRadians = new Angle(this.#pointA, this.#pointB, this.#pointC).angleInRadians;
            this.#angleCInRadians = new Angle(this.#pointA, this.#pointC, this.#pointB).angleInRadians;

            this.#angleAInDegrees = radiansToDegrees(this.#angleAInRadians);
            this.#angleBInDegrees = radiansToDegrees(this.#angleBInRadians);
            this.#angleCInDegrees = radiansToDegrees(this.#angleCInRadians);
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
        this.#bisectorA = this._calculateBisector(this.#pointA, this.#sideBC);
        this.#bisectorB = this._calculateBisector(this.#pointB, this.#sideCA);
        this.#bisectorC = this._calculateBisector(this.#pointC, this.#sideAB);
    }

    _calculateBisector(vertex, oppositeSide) {
        const { startPoint, endPoint } = oppositeSide;
        const lengthAdjacent1 = new Segment(vertex, startPoint).length;
        const lengthAdjacent2 = new Segment(vertex, endPoint).length;

        // Координаты точки на противоположной стороне, через которую проходит биссектриса
        const px = (lengthAdjacent1 * endPoint.x + lengthAdjacent2 * startPoint.x) / (lengthAdjacent1 + lengthAdjacent2);
        const py = (lengthAdjacent1 * endPoint.y + lengthAdjacent2 * startPoint.y) / (lengthAdjacent1 + lengthAdjacent2);

        return new Segment(vertex, new Point(px, py));
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
        return this.#medianA.length;
    }

    get medianBLength() {
        return this.#medianB.length;
    }

    get medianCLength() {
        return this.#medianC.length;
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
        return this.#angleAInRadians;
    }

    get angleBInRadians() {
        return this.#angleBInRadians;
    }

    get angleCInRadians() {
        return this.#angleCInRadians;
    }

    get angleAInDegrees() {
        return this.#angleAInDegrees;
    }

    get angleBInDegrees() {
        return this.#angleBInDegrees;
    }

    get angleCInDegrees() {
        return this.#angleCInDegrees;
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

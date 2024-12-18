class Angle {
    #vector1;
    #vector2;
    #angleInRadians;

    constructor(firstParameter, secondParameter, thirdParameter) {
        switch (true) {
            case firstParameter instanceof Point && secondParameter instanceof Point && thirdParameter instanceof Point:
                this._createFromPoints(firstParameter, secondParameter, thirdParameter);
                break;
            case firstParameter instanceof Segment && secondParameter instanceof Segment:
                this._createFromSegments(firstParameter, secondParameter);
                break;
            case firstParameter instanceof Vector && secondParameter instanceof Vector:
                this._createFromVectors(firstParameter, secondParameter);
                break;
            case typeof firstParameter === 'number' && typeof secondParameter === 'number' && typeof thirdParameter === 'number':
                this._createFromAngleSides(firstParameter, secondParameter, thirdParameter);
                break;
            default:
                throw new Error("Invalid arguments: Please provide either three Points, two Segments, two Vectors, or two side lengths and an angle. Check the types and number of inputs.");        }
        this.#angleInRadians = this._calculateAngleBetweenVectors(this.#vector1, this.#vector2);
    }

    _createFromPoints(p1, p2, p3) {
        this.#vector1 = new Vector(p2, p1);
        this.#vector2 = new Vector(p2, p3);

        if (areVectorsCollinear(this.#vector1, this.#vector2)) {
            throw new Error("The points are collinear and do not form an angle.");
        }

    }

    _createFromSegments(segment1, segment2) {
        this.#vector1 = new Vector(segment1.startPoint, segment1.endPoint);
        this.#vector2 = new Vector(segment2.startPoint, segment2.endPoint);

        if (areVectorsCollinear(this.#vector1, this.#vector2)) {
            throw new Error("The segments are collinear and do not form an angle.");
        }
    }

    _createFromVectors(vector1, vector2) {
        this.#vector1 = vector1;
        this.#vector2 = vector2;

        if (areVectorsCollinear(this.#vector1, this.#vector2)) {
            throw new Error("The vectors are collinear and do not form an angle.");
        }
    }

    _createFromAngleSides(length1, length2, angle) {
        if (angle < 0 || angle > 2 * Math.PI) {
            throw new Error("Angle must be between 0 and 2π radians.");
        }
        this.#vector1 = new Vector(new Point(0, 0), new Point(length1, 0));
        
        const x2 = length2 * Math.cos(angle);
        const y2 = length2 * Math.sin(angle);
        this.#vector2 = new Vector(new Point(0, 0), new Point(x2, y2));
    }

    _calculateAngleBetweenVectors(vector1, vector2) {
        const dotProduct = vector1.dotProduct(vector2);
        const magnitude1 = vector1.magnitude;
        const magnitude2 = vector2.magnitude;
        const cosTheta = dotProduct / (magnitude1 * magnitude2);
        return Math.acos(cosTheta);
    }

    get vector1() {
        return this.#vector1;
    }

    get vector2() {
        return this.#vector2;
    }

    get angleInRadians() {
        return this.#angleInRadians;
    }

    get angleInDegrees() {
        return this.#angleInRadians * (180 / Math.PI);
    }
}

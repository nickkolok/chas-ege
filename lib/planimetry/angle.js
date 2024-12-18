class Angle {
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
            default:
                throw new Error("Invalid arguments: Please provide either three Points, two Segments, or two Vectors.");
        }
        this._angleInRadians = this._calculateAngleBetweenVectors(vector1, vector2);
        this._bisector = this._calculateBisector(vector1, vector2);
    }

    _createFromPoints(p1, p2, p3) {
        const vector1 = new Vector(p2, p1);
        const vector2 = new Vector(p2, p3);

        if (areVectorsCollinear(vector1, vector2)) {
            throw new Error("The points are collinear and do not form an angle.");
        }

    }

    _createFromSegments(segment1, segment2) {
        const vector1 = new Vector(segment1.startPoint, segment1.endPoint);
        const vector2 = new Vector(segment2.startPoint, segment2.endPoint);

        if (areVectorsCollinear(vector1, vector2)) {
            throw new Error("The segments are collinear and do not form an angle.");
        }
    }

    _createFromVectors(vector1, vector2) {
        if (areVectorsCollinear(vector1, vector2)) {
            throw new Error("The vectors are collinear and do not form an angle.");
        }
    }

    _calculateAngleBetweenVectors(vector1, vector2) {
        const dotProduct = vector1.dotProduct(vector2);
        const magnitude1 = vector1.magnitude;
        const magnitude2 = vector2.magnitude;
        const cosTheta = dotProduct / (magnitude1 * magnitude2);
        return Math.acos(cosTheta);
    }

    _calculateBisector(vector1, vector2) {
        const sumVector = new Vector(vector1.xComponent + vector2.xComponent, vector1.yComponent + vector2.yComponent);
        const magnitude = sumVector.magnitude;
        return new Vector(sumVector.xComponent / magnitude, sumVector.yComponent / magnitude);
    }

    get angleInRadians() {
        return this._angleInRadians;
    }

    get angleInDegrees() {
        return this._angleInRadians * (180 / Math.PI);
    }

    get bisector() {
        return this._bisector;
    }
}

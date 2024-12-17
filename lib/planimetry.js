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
    constructor(pointA, pointB, pointC) {
        if (!(pointA instanceof Point) || !(pointB instanceof Point) || !(pointC instanceof Point)) {
            throw new TypeError("All vertices must be instances of Point class");
        }

        this._pointA = pointA;
        this._pointB = pointB;
        this._pointC = pointC;

        this._sideAB = new Segment(this._pointA, this._pointB).lengthSegment;
        this._sideBC = new Segment(this._pointB, this._pointC).lengthSegment;
        this._sideCA = new Segment(this._pointC, this._pointA).lengthSegment;

        if (this._sideAB + this._sideBC <= this._sideCA || this._sideAB + this._sideCA <= this._sideBC || this._sideBC + this._sideCA <= this._sideAB) {
            throw new Error("The points must form a valid triangle");
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


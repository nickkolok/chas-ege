class Vector {
    constructor(firstParameter, secondParameter) {
        switch (true) {
            case firstParameter instanceof Point && secondParameter instanceof Point:
                this._startPoint = firstParameter;
                this._endPoint = secondParameter;
                break;
            case typeof firstParameter === 'number' && typeof secondParameter === 'number':
                this._startPoint = new Point(0, 0);
                this._endPoint = new Point(firstParameter, secondParameter);
                break;
            case firstParameter instanceof Point && secondParameter === undefined:
                this._startPoint = new Point(0, 0);
                this._endPoint = firstParameter;
                break;
            default:
                throw new Error("Invalid arguments: Please provide either two Points, two numbers, or a single Point.");
        }
    }

    get startPoint() {
        return this._startPoint;
    }

    get endPoint() {
        return this._endPoint;
    }

    get xComponent() {
        return this._endPoint.x - this._startPoint.x;
    }

    get yComponent() {
        return this._endPoint.y - this._startPoint.y;
    }

    get magnitude() {
        return lengthInPlane(this._startPoint, this._endPoint);
    }

    get direction() {
        return Math.atan2(this.yComponent, this.xComponent);
    }

    add(vector) {
        return new Vector(this.xComponent + vector.xComponent, this.yComponent + vector.yComponent);
    }

    subtract(vector) {
        return new Vector(this.xComponent - vector.xComponent, this.yComponent - vector.yComponent);
    }

    dotProduct(vector) {
        return this.xComponent * vector.xComponent + this.yComponent * vector.yComponent;
    }

    multiplyByScalar(scalar) {
        return new Vector(this.xComponent * scalar, this.yComponent * scalar);
    }
}

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

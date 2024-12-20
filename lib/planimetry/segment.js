class Segment {
    #startPoint;
    #endPoint;

    constructor(firstParameter, secondParameter, angle) {
        switch (true) {
            case firstParameter instanceof Point && secondParameter instanceof Point:
                this.#startPoint = firstParameter;
                this.#endPoint = secondParameter;
                break;

            case typeof firstParameter === 'number':
                const length = firstParameter;
                const startPoint = secondParameter instanceof Point ? secondParameter : new Point(0, 0);
                const angleInRadians = typeof angle === 'number' ? angle : 0;

                this.#startPoint = startPoint;
                const dx = length * Math.cos(angleInRadians);
                const dy = length * Math.sin(angleInRadians);
                this.#endPoint = new Point(startPoint.x + dx, startPoint.y + dy);
                break;

            default:
                throw new Error("Invalid arguments: Please provide valid Points or a length with optional start Point and angle.");
        }
    }

    get startPoint() {
        return this.#startPoint;
    }

    get endPoint() {
        return this.#endPoint;
    }

    get length() {
        return lengthInPlane(this.#startPoint, this.#endPoint);
    }

    get midPoint() {
        const midX = (this.#startPoint.x + this.#endPoint.x) / 2;
        const midY = (this.#startPoint.y + this.#endPoint.y) / 2;
        return new Point(midX, midY);
    }
}

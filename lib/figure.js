function findTriangleAngles(sideA, sideB, sideC) {
    if (!isValidTriangle(sideA, sideB, sideC)) {
        throw new Error("Three sides do not form a triangle");
    }

    const angleA = Math.acos((sideB * sideB + sideC * sideC - sideA * sideA) / (2 * sideB * sideC));
    const angleB = Math.acos((sideA * sideA + sideC * sideC - sideB * sideB) / (2 * sideA * sideC));
    const angleC = Math.acos((sideA * sideA + sideB * sideB - sideC * sideC) / (2 * sideA * sideB));
    return { angleA, angleB, angleC };
}

function shiftCoordinate3D(point, {	x, y, z	}) {
    x = x || 0;
    y = y || 0;
    z = z || 0;
    return {
        x: point.x - x || 0,
        y: point.y - y || 0,
        z: point.z - z || 0
    };
}

function coordinatesMiddleOfSegment3D(point1, point2) {
    return {
        x: 0.5 * (point1.x + point2.x),
        y: 0.5 * (point1.y + point2.y),
        z: 0.5 * (point1.z + point2.z),
    }
}


function lengthInSpace(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2) + Math.pow(point2.z - point1.z, 2));
}

function calculateTriangleArea(sideA, sideB, sideC) {
    const halfPerimeter = (sideA + sideB + sideC) / 2;
    return Math.sqrt(halfPerimeter * (halfPerimeter - sideA) * (halfPerimeter - sideB) * (halfPerimeter - sideC));
}

function valuesAreSmallerOrEqualToZero(values) {
    for (let key in values) {
        if (values[key] <= 0)
            throw new Error("Invalid input: the " + key + " is smaller or equal to zero");
    }
}

class Prism {
    constructor({ baseArea, height }) {
        valuesAreSmallerOrEqualToZero({ baseArea, height });

        this._height = height;
        this._baseArea = baseArea;
        this._vertices = [];
        this._connectionMatrix = [];
    }

    get height() {
        return this._height;
    }

    get baseArea() {
        return this._baseArea;
    }

    get volume() {
        return this._baseArea * this._height;
    }

}

class Sphere {
    constructor(radius) {
        valuesAreSmallerOrEqualToZero({ radius });
        this._radius = radius;
    }

    get radius() {
        return this._radius;
    }

    get diameter() {
        return 2 * this._radius;
    }

    get volume() {
        return (4 / 3) * Math.PI * this._radius ** 3;
    }

    get surfaceArea() {
        return 4 * Math.PI * this._radius ** 2;
    }

    get areaGreatCircle() {
        return Math.PI * this._radius ** 2;
    }
}

class Cone {
    constructor({ radius, height }) {
        valuesAreSmallerOrEqualToZero({ radius, height });
        this._radius = radius;
        this._height = height;

    }

    get radius() {
        return this._radius;
    }

    get height() {
        return this._height;
    }

    get diameter() {
        return 2 * this._radius;
    }

    get volume() {
        return (1 / 3) * Math.PI * this._radius ** 2 * this._height;
    }

    get surfaceArea() {
        return Math.PI * this._radius * (this._radius + this.generatrix);
    }

    get baseArea() {
        return Math.PI * this._radius ** 2;
    }

    get sideSurfaceArea() {
        return Math.PI * this._radius * this.generatrix;
    }

    get generatrix() {
        return Math.sqrt(this._radius ** 2 + this._height ** 2);
    }

}

class Cylinder {
    constructor({ radius, height }) {
        valuesAreSmallerOrEqualToZero({ radius, height });
        this._radius = radius;
        this._height = height;

    }

    get radius() {
        return this._radius;
    }

    get height() {
        return this._height;
    }

    get diameter() {
        return 2 * this._radius;
    }

    get volume() {
        return Math.PI * Math.pow(this._radius, 2) * this._height;
    }

    get baseArea() {
        return Math.PI * this._radius * this._radius
    }

    get surfaceArea() {
        return 2 * this.baseArea + this.sideSurfaceArea;
    }

    get sideSurfaceArea() {
        return 2 * Math.PI * this._radius * this._height;
    }
}

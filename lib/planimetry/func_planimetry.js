function isValidTriangle(sideA, sideB, sideC) {
    return sideA + sideB > sideC && sideA + sideC > sideB && sideB + sideC > sideA;
}

function shiftCoordinate2D(A, B) {
    if (!(A instanceof Point) || !(B instanceof Point)) {
        throw new TypeError("Arguments must be instances of Point");
    }

    const xShift = A.x - B.x;
    const yShift = A.y - B.y;

    return new Point(xShift, yShift);
}

function findTriangleVertices2D(sideA, sideB, sideC) {
    if (!isValidTriangle(sideA, sideB, sideC)) {
        throw new Error("Invalid input: three sides do not form a triangle");
    }
    
    // Define the vertices in 2D
    let verticesA = new Point(0, 0);
    let verticesB = new Point(sideA, 0);
    
    // Calculate the angle at vertex C using the law of cosines
    let angleC = Math.acos((sideA * sideA + sideB * sideB - sideC * sideC) / (2 * sideA * sideB));
    
    // Calculate the coordinates of vertex C
    let verticesC = new Point(sideB * Math.cos(angleC), sideB * Math.sin(angleC));

    // Assuming findCircumcenter2D and shiftCoordinate2D are defined for 2D operations
    let circumcenter = findCircumcenter2D(verticesA, verticesB, verticesC);
    let coordinate = [verticesA, verticesB, verticesC].map(vertex => shiftCoordinate2D(vertex, circumcenter));

    return coordinate;
}

function findCircumcenter2D(A, B, C) {
    if (!(A instanceof Point) || !(B instanceof Point) || !(C instanceof Point)) {
        throw new TypeError("Arguments must be instances of Point");
    }

    const AB = lengthInPlane(A, B);
    const BC = lengthInPlane(B, C);
    const CA = lengthInPlane(C, A);

    if (!isValidTriangle(AB, BC, CA)) {
        throw new Error("Three sides do not form a triangle");
    }

    // Calculate the circumcenter in 2D
    const D = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
    if (D === 0) {
        throw new Error("The points are collinear, circumcenter cannot be determined.");
    }

    const Ux = (1 / D) * ((A.x * A.x + A.y * A.y) * (B.y - C.y) + (B.x * B.x + B.y * B.y) * (C.y - A.y) + (C.x * C.x + C.y * C.y) * (A.y - B.y));
    const Uy = (1 / D) * ((A.x * A.x + A.y * A.y) * (C.x - B.x) + (B.x * B.x + B.y * B.y) * (A.x - C.x) + (C.x * C.x + C.y * C.y) * (B.x - A.x));

    return new Point(Ux, Uy);
}

function lengthInPlane(A, B) {
    if (!(A instanceof Point) || !(B instanceof Point)) {
        throw new TypeError("Arguments must be instances of Point");
    }
    return Math.hypot(B.x - A.x, B.y - A.y);
}

function areVectorsCollinear(vector1, vector2) {
    if (!(vector1 instanceof Vector) || !(vector2 instanceof Vector)) {
        throw new TypeError("Arguments must be instances of Vector");
    }
    return vector1.xComponent * vector2.yComponent === vector1.yComponent * vector2.xComponent;
}

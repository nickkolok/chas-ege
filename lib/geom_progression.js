class GeometricProgression {
	constructor(first, factor) {
		this.first = first;
		this.factor = factor;
		this.nmember = 0;

	}

	member(nmember) {
		this.nmember = nmember;
		return (this.first * Math.pow(this.factor, this.nmember - 1)).toFixed(0);
	}

}

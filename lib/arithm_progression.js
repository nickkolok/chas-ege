class ArithmeticProgression {
	constructor(first, difference) {
		this.first = first;
		this.difference = difference;
		this.nmember = 0;

	}

	member(nmember) {
		this.nmember = nmember;
		return this.first + this.difference * (this.nmember - 1);
	}

	sum(nmember) {
		this.nmember = nmember;
		return ((2 * this.first + this.difference * (this.nmember - 1)) / 2) * this.nmember;
	}

}

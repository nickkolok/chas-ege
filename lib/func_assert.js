'use strict';

function retryWhileUndefined(theFunction, maxIterations) {
	maxIterations || (maxIterations = 1024 * 1024);
	for (var i = 0; i < maxIterations; i++) {
		var result;
		if ( (result = theFunction(i)) !== undefined) {
			return result;
		}
	}
	throw new Error('Could get nothing but undefined (iterations: ' + maxIterations + ')');
}

function retryWhileError(theFunction, maxIterations) {
	maxIterations || (maxIterations = 1024 * 1024);
	for (var i = 0; i < maxIterations; i++) {
		try {
			return theFunction(i);
		}catch{
		}
	}
	throw new Error('Could get nothing but errors (iterations: ' + maxIterations + ')');
}

function genAssert(condition, message){
	if(!condition){
		throw new Error(message || '');
	}
}

function genAssertNonempty(array, message){
	genAssert(array.length, message);
}

function genAssertZ1000(number, message){
	genAssert((1000*number).isAlmostInteger(), message);
}

function genAssertIrreducible(numerator, denominator, message){
	genAssert(numerator.nod(denominator) === 1, message || 'Дробь должна быть несократима');
}

function genAssertSaneDecomposition(number, maxFactor, message) {
	let factors = primeFactors(number);
	if (factors.maxE() > maxFactor) {
		factors.splice(factors.max(), 1);
		genAssert(factors.maxE() < maxFactor, message);
	}
}

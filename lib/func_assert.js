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

function retryWhileError(theFunction, maxIterations, maxCollectedErrors) {
	maxIterations || (maxIterations = 1024 * 1024);
	maxCollectedErrors || (maxCollectedErrors = 32);

	var collectedErrors = [];
	var collectedErrorsDict = {};

	for (var i = 0; i < maxIterations; i++) {
		try {
			return theFunction(i);
		}catch(e){
			collectedErrors.pushIf(e, collectedErrors.length < maxCollectedErrors);
			safeinc(collectedErrorsDict, e.message);
		}
	}
	collectedErrors.map((e) => console.error(e));
	if(maxIterations > maxCollectedErrors){
		console.log('... and ' + (maxIterations - maxCollectedErrors) + ' more error(s)');
	}
	console.log('Detailed stats:');
	console.log(collectedErrorsDict);
	throw new Error(
		'Could get nothing but errors (iterations: ' + maxIterations + '),' +
		'\n' + 'see console output for detailed stats.' +
		'\n' + 'First ' + [maxCollectedErrors, maxIterations].minE() + ' error(s) are:' + '\n' +
		'\n' + collectedErrors.join('\n')
	);
}

function genAssert(condition, message){
	if(!condition){
		throw new Error(message || '');
	}
}

function genAssertNonempty(array, message){
	genAssert(array.length, message || 'Массив должен быть непуст');
}

function genAssertZ1000(number, message){
	genAssert((1000*number).isAlmostInteger(), message || 'Число должно иметь не более 3 знаков после запятой');
}

function genAssertIrreducible(numerator, denominator, message){
	genAssert(numerator.nod(denominator) === 1, message || 'Дробь должна быть несократима');
}

function genAssertSaneDecomposition(number, maxFactor, message) {
	let factors = primeFactors(number);
	if (factors.maxE() > maxFactor) {
		factors.splice(factors.max(), 1);
		genAssert(
			factors.maxE() < maxFactor,
			message || ('Число должно раскладываться на простые множители, не более одного из которых превосходит ' + maxFactor)
		);
	}
}

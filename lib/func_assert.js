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
	maxCollectedErrors || (maxCollectedErrors = 16);

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

	var detailedStats = '\n\nDetailed stats:\n\n';
	for (var er in collectedErrorsDict) {
		detailedStats += er + ' : ' + collectedErrorsDict[er] + '\n';
	}


	throw new Error(
		'Could get nothing but errors (iterations: ' + maxIterations + '),' +
		'\n' + 'see console output for detailed stats.' +
		'\n' + 'First ' + [maxCollectedErrors, maxIterations].minE() + ' error(s) are:' + '\n' +
		'\n' + collectedErrors.join('\n') +
		detailedStats
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

//Над именами надо подумать
function genAssertGraphCrossesVertical(coordinate, func,  message) {
	genAssert((func(-0.5) - (coordinate + 0.25)).abs() > 1 && (func(-0.2) - (coordinate + 0.25)).abs() > 1 && (func(-0.8) - (coordinate + 0.25)).abs() > 1, message || 'График перечёркивает ' + coordinate + ' у вертикальной оси');
}

function genAssertGraphCrossesHorizontal(coordinate, func,  message) {
	genAssert((func(coordinate) + 0.5).abs() > 1 && (func(coordinate + 0.2) + 0.5).abs() > 1 && (func(coordinate + 0.4) + 0.5).abs() > 1, message || 'График перечёркивает ' + coordinate + ' у горизонтальной оси');
}

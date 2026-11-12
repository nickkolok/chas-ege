(function() {
	retryWhileError(function() {
		'use strict';

		NAtask.setTaskWithGraphOfFunctionDerivative({
			authors: 'Суматохина Александра',
			type: 'derivative',
			boundariesOfGraph: {
				minX: sl(-11,-5),
				maxX: sl(5,10),
				minY: -9,
				maxY: 8,
				stepForX: 4,
				stepForY: 0.1,
			},
			questionsF: {
				main: 'interval',
				conditions: ['function_is_decreasing', 'function_is_increasing'],
				variants: ['smallest', 'largest',],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
			},
			minimumDifferenceBetweenExtremes: 1,
			numberOfRoots: {min:3, max:10}, 
			numberOfExtremes: {min: 2, max:10}, 
			/*extremumsIsInteger: {
				int: 'yes',
				tolerance: 0.15
			},*/
			rootsIsInteger: {
				int: 'yes',
				tolerance: 0.09
			},
		});
	}, 10000);
})();
/*27499 8301 8539 8545 509557 509599 8307 8309 8313 8319 8321 8325 8327 8329 
8337 8339 8349 8357 8359 8369 8375 8377 8379 8381 8383 8385 8389 8395 8401 
8403 8407 8411 8415 8421 8423 8425 8427 8429 8439 8445 8449 8453 8455 8457 
8459 8461 8463 8467 8469 8475 8477 8479 8481 8483 8485 8487 8491 8493 8495 
8499 8505 8511 8521 8525 8527 8529 8533 8535 8541 
*/

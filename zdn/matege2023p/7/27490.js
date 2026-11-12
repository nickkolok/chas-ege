(function() {
	retryWhileError(function() {
		'use strict';

		NAtask.setTaskWithGraphOfFunctionDerivative({
			authors: 'Суматохина Александра',
			type: 'function',
			boundariesOfGraph: {
				minX: sl(-11,-5),
				maxX: sl(5,10),
				minY: -9,
				maxY: 8,
				stepForX: 4,
				stepForY: 0.3,
			},
			questionsF: {
				main: 'integer_points',
				conditions: ['extreme_points'],
				variants: ['sum', 'production', 'number', 'smallest', 'largest'],
			},
			canvasSettings: {
				height: 400,
				width: 500,
				scale: 20,
				lineWidth: 0.07,
			},
			minimumDifferenceBetweenExtremes: 3,
			numberOfRoots: {min:0, max:10}, 
			numberOfExtremes: {min: 3, max:10}, 
			extremumsIsInteger: {
				int: 'yes',
				tolerance: 0.15
			},
		});
	}, 10000);
})();

/* 27490 7327 7545 520183 520202 621768 621898 624074 624108 7331 7333 7335 
7337 7339 7341 7343 7345 7347 7349 7351 7353 7355 7357 7359 7361 7363 7365 
7367 7369 7371 7373 7375 7377 7379 7381 7383 7385 7387 7389 7391 7393 7395 
7397 7399 7401 7403 7405 7407 7409 7411 7413 7415 7417 7419 7421 7423 7425 
7427 7429 7431 7433 7435 7437 7439 7441 7443 7445 7447 7449 7451 7453 7455 
7457 7459 7461 7463 7465 7467 7469 7471 7473 7475 7477 7479 7481 7483 7485 
7487 7489 7491 7493 7495 7497 7499 7501 7503 7505 7507 7509 7511 7513 7515 
7517 7519 7521 7523 7525 7527 7529 7531 7533 7535 7537 7539 7541 7543 7547
*/

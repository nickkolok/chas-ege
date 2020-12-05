(function(){'use strict';

	var isTriple = sl1();

	var denominator = Math.pow(2,sl(0,4));
	if (isTriple){
		denominator *= 3;
	}
	var isTargetNegative = sl1();


	var trigfunc = ['sin','cos','tg','ctg'].iz();
	var _math = {
		sin: Math.sin,
		cos: Math.cos,
		tg : Math.tan,
		ctg: function(phi){return 1/Math.tan(phi)},
	}


	var k = [1,2,4,5,8,10,20].iz().pm();
	var b = sl(-20,20);

	var step = 1/(4*k); //Самое мелкое, что бывает - п/4 и п/6
	if (isTargetNegative) {
		step *= -1;
	}

	var skip0evenIfSatisfies = sl1();

	var x = 0;

	if (skip0evenIfSatisfies) {
		x += step;
	}


	var targetValue = [
		[0,0],
		[1,1],
	];

	if (trigfunc === 'sin' || trigfunc === 'cos'){
		targetValue = targetValue.concat([
			[Math.sqrt(0.5),'\\frac{\\sqrt{2}}{2}'],
			[Math.sqrt(0.5),'\\frac{1}{\\sqrt{2}}'],
		]);

		if (isTriple){
			targetValue = targetValue.concat([
				[0.5,'0,5'],
				[0.5,'\\frac{1}{2}'],
				[Math.sqrt(3)/2,'\\frac{\\sqrt{3}}{2}'],
			])
		}
	} else if (isTriple){ // tg x = (\\sqrt{3})^{\\pm 1}
		targetValue = targetValue.concat([
			[Math.sqrt(3),'\\sqrt{3}'],
			[Math.sqrt(1/3),'\\frac{\\sqrt{3}}{3}'],
			[Math.sqrt(1/3),'\\frac{1}{\\sqrt{3}}'],
		])
	}



	targetValue = targetValue.iz();


	if (sl1()) {
		targetValue[0] *= -1;
		targetValue[1] = '-' + targetValue[1];
	}


	while(true){
		if(Math.abs(
			(_math[trigfunc](Math.PI * (k*x + b) / denominator))
			- targetValue[0]
		) < 1/1024/1024){ // Let it be epsilon
			break;
		}
		x += step;
	}

	var leftpart;
	if(!b){
		leftpart = k + "\\pi x";
	} else {
		leftpart = "\\pi("+k+"x +" + b + ")";
	}
	leftpart = leftpart.plusminus();

	if (denominator != 1){
		leftpart = '\\frac{' + leftpart + '}{' + denominator + '}';
	}

	if (denominator == 1 && b != 0){
		leftpart = '(' + leftpart + ')';
	}
	leftpart = '\\' + trigfunc + leftpart

	var whichroot = [];
	if (x == 0){
		whichroot = [
			'наибольший неположительный',
			'наименьший неотрицательный',
		];
	} else if (x < 0) {
		whichroot = [
			'наибольший отрицательный',
		];
		if(!skip0evenIfSatisfies){
			whichroot.push('наибольший неположительный');
		}
	} else { // x < 0
		whichroot = [
			'наименьший положительный'
		];
		if(!skip0evenIfSatisfies){
			whichroot.push('наименьший неотрицательный');
		}
	}

	chas2.task.setEquationTask({
		customPreamble: 'Найдите ' + whichroot.iz() + ' корень уравнения',
		parts: [leftpart, targetValue[1]],
		roots: x,
		enablePartsSubtraction: 1,
		enablePartsDivision: 1,
		enablePartsExchange: 0,
	});

})();
//Обзад 26669 и аналоги, 77376 и аналоги, 77377 и аналоги,
//а также много вариаций на тему
//Николай Авдеев

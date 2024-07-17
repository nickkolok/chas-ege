(function() { retryWhileError(function() {
    let c=sluchch(1,20).pm();
    let a=slKrome(c,1,20).pm();
    let b=sluchch(1,20).pm();
    let e=sluchch(1,20).pm();
    let d=(b*c-e*a)/(a-c);
    genAssertZ1000(d, 'Корень не должен быть слишком дробным');
    NAtask.setEquationTask({
            parts: ['\\frac{'+a+'}{'+'x+'+b+'}','\\frac{'+c+'}{'+'x+'+e+'}'],
	    roots: d,
    });	

}, 2000);})();
//VeronikaKit
//Решу ОГЭ 311381

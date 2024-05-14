(function() { retryWhileError(function() {
    let a=sluchch(1,50).pm();
    let b=sluchch(1,50).pm();
    let c=slKrome(b,1,50).pm();
    let e=sluchch(1,50).pm();
    let d=(e-a)/(b-c);
    genAssertZ1000(d, 'Корень не должен быть слишком дробным');
    
    NAtask.setEquationTask({
    	    parts: [a+'+'+b+'x', c + 'x+'+e],
	    roots: d,
    });	

}, 20);})();
// Решу ЕГЭ 338557 341701 369730 369798 369827 369856 338666 338671 338689 338807 338884 338886 338926 338933 338962 338990 338993
// VeronikaKit

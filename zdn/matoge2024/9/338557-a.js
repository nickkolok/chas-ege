(function() { retryWhileError(function() {
    let a=sluchch(1,30).pm();
    let b=sluchch(1,20).pm();
    let c=slKrome(b,1,20).pm();
    let e=sluchch(1,30).pm();
    let d=(e-a)/(b-c);
    genAssert(d!=0, 'Корень не равен нулю');
    genAssertZ1000(d, 'Корень не должен быть слишком дробным');
    NAtask.setEquationTask({
            parts: [a+'+'+b+'x', c + 'x+'+e],
	    roots: d,
    });	
}, 20);})();
//338557-a

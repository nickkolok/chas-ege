(function() { retryWhileError(function() {
    let a=sluchch(1,30).pm();
    let b=slKrome(a,1,30).pm();
    let d=(-Math.pow(a,2)-b**2)/(2*a+2*b);
    genAssertZ1000(d, 'Корень не должен быть слишком дробным');
    NAtask.setEquationTask({
            parts: ['(x+'+a+')^2+(x+'+b+')^2',2+'x^2'],
	    roots: d,
    });	

}, 20000);})();
//338494

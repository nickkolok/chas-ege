(function() { retryWhileError(function() {
    let d=sluchch(1,30).pm();
    let e=slKrome(d,1,30).pm();
    let c=d*e;
    let b=d+e;
    genAssertZ1000(d,'Корень не должен быть слишком дробным');
    genAssertZ1000(e,'Корень не должен быть слишком дробным');
    NAtask.setEquationTask({
            parts: ['x^2+'+c, b+'x'],
	    roots: [d,e],
	    handleMultipleRoots: 'randomExceptList',
    });
}, 20);})();
//VeronikaKit

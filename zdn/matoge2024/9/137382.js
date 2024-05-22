(function() { retryWhileError(function() {
    let d=sluchch(1,20).pm();
    let e=slKrome(d,1,20).pm();
    let c=-d*e;
    let b=-d-e;
    genAssert(b**2-4*(-c)>0,'Нужно два решения');
    NAtask.setEquationTask({
    	    parts: ['x^2+'+b+'x', c],
	        roots: [d,e],
	        handleMultipleRoots: 'randomExceptList',
    });
}, 20);})();
//Решу ОГЭ 137382
//VeronikaKit

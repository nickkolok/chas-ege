(function() { retryWhileError(function() {
    let d=sluchch(1,30).pm();
    let e=slKrome(d,1,30).pm();
    let c=d*e;
    let b=d+e;
    genAssert(b!=0, 'Множитель не должен равняться нулю');
    NAtask.setEquationTask({
            parts: ['x^2+'+c, b+'x'],
	    roots: [d,e],
	    handleMultipleRoots: 'randomExceptList',
    });
}, 20);})();
//VeronikaKit

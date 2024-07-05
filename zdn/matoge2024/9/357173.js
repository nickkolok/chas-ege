(function() { retryWhileError(function() {
    let d=sluchch(1,50);
    let a=d**2;
    let e=-d;
    NAtask.setEquationTask({
    	    parts: ['x^2-'+a, 0],
	        roots: [d,e],
	        handleMultipleRoots: 'randomExceptList',
    });
}, 20);})();

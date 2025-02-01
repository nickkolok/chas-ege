(function() { retryWhileError(function() {
    let a=sluchch(1,20).pm();
    let b=sluchch(1,20).pm();
    let c=sluchch(1,50).pm();
    let d=sluchch(1,50).pm();
    let e=-b/a;
    let f=-d/c;
    genAssertZ1000(e, 'Корень не должен быть слишком дробным');
    genAssertZ1000(f, 'Корень не должен быть слишком дробным');
    NAtask.setEquationTask({
    	parts: ['('+a+'x+'+b+')('+c+'x+'+d+')', '0'],
        roots: [e,f],
        handleMultipleRoots: 'randomExceptList',
	
    });	
}, 100);})();
//VeronikaKit
//369496

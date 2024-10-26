(function() { retryWhileError(function() {
    let a=sluchch(1,30).pm();
    let b=sluchch(1,30).pm();
    let c=sluchch(1,30).pm();
    let d=-Math.sqrt(-b*c*a)/a;
    let h=Math.sqrt(-b*c*a)/a;
    let e=['min', 'max'].iz();
    genAssertZ1000(d, 'Корень не должен быть слишком дробным');
    genAssertZ1000(h, 'Корень не должен быть слишком дробным');
    NAtask.setEquationTask({
    	parts: [a.texfrac(b)+'x^2+'+c,0],
	    roots: [d,h],
	    handleMultipleRoots: e,
    });	

}, 2000);})();
//VeronikaKit
//РешуОГЭ

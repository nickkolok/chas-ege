(function() { retryWhileError(function() {
    let a=sluchch(2,50).pm();
    let b=sluchch(1,50).pm();
    let c=sluchch(1,50).pm();
    let d=a*b/(c*a+c);
    genAssertZ1000(d, 'Корень не должен содержать больше трёх знаков после запятой');
    
    NAtask.setEquationTask({
    	    parts: ['x+' + (1).texfrac(a,'x'), b.texrndfrac(c)],
	    roots: d,
    });	

}, 1000);})();
//Решу ЕГЭ 338583: 338610 340975 338652
//VeronikaKit

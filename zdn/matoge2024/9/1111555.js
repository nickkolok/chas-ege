(function() { retryWhileError(function() {
    let a=sluchch(1,10).pm();
    let b=sluchch(1,10).pm();
    let c=sluchch(1,10).pm();
    let e=(a**2+c);
    let f=2*a*b;
    let g=b**2;
    let n=f**2-4*e*g;
    let d=(-f+Math.sqrt(n))/(2*a**2+2*c);
    let h=(-f-Math.sqrt(n))/(2*a**2+2*c);
    genAssert(n>0, 'Дискриминант не может быть отрицательным');
    genAssertZ1000(d, 'Корень не должен быть слишком дробным');
    genAssertZ1000(h, 'Корень не должен быть слишком дробным');
    NAtask.setEquationTask({
        parts: ['('+a+'x+'+b+')^2+'+c+'x^2',0],
        roots: [d,h],
    });	

}, 2000);})();
//VeronikaKit

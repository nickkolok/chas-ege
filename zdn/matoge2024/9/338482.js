(function() { retryWhileError(function() {
    let b=sluchch(1,30).pm();
    let a=slKrome(b,1,30).pm();
    let e=sluchch(1,30).pm();
    let d=(b*b-e*a)/(a-b);
    genAssertZ1000(d, 'Корень не должен быть слишком дробным');
    NAtask.setEquationTask({
        parts: ['\\frac{'+a+'}{'+'x+'+b+'}','\\frac{'+b+'}{'+'x+'+e+'}'],
        roots: d,
    });	
}, 2000);})();
//VeronikaKit
//Решу ОГЭ 338482

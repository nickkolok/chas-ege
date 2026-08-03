(function() { retryWhileError(function() {
    let a=sluchch(1,30).pm();
    let b=sluchch(1,30).pm();
    let c=sluchch(1,30).pm();
    let e=sluchch(1,30).pm();
    let v=sluchch(1,30).pm();
    let f=sluchch(1,30).pm();
    let g=sluchch(1,30).pm();
    let d=(v-b-c*e+f*g)/(a+c+f);
    genAssertZ1000(d, 'Корень не должен быть слишком дробным');
    NAtask.setEquationTask({
            parts: [a+'x+'+b+'+'+c+'(x+'+e+')', f+'('+g+'-x)+'+v],
	    roots: d,
    });	

}, 20);})();


//Решу ОГЭ 338495
//VeronikaKit

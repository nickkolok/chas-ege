(function() { retryWhileError(function() {
    let a=sluchch(1,30).pm();
    let b=sluchch(1,30).pm();
    let c=sluchch(1,30).pm();
    let e=sluchch(1,30).pm();
    let v=sluchch(1,30).pm();
    let f=sluchch(1,30).pm();
    let d=(v-b-c+f*e)/(a+1+e);
    genAssertZ1000(d, 'Корень не должен быть слишком дробным');
    NAtask.setEquationTask({
            parts: [a+'x+'+b+'+(x+'+c+')', e+'('+f+'-x)+'+v],
	    roots: d,
    });	

}, 20);})();
//338480

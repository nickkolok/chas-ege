(function() { retryWhileError(function() {
    let a=sluchch(1,30).pm();
    let b=sluchch(1,30).pm();
    let c=sluchch(1,30).pm();
    let e=sluchch(1,30).pm();
    let v=sluchch(1,30).pm();
    let f=sluchch(1,30).pm();
    let d=(v-a-e*b)/(b*c-f);
    genAssertZ1000(d, 'Корень не должен быть слишком дробным');
    NAtask.setEquationTask({
            parts: [a+'+'+b+'('+[c+'x',e].slag()+')', v +'+'+f+ 'x'],
	    roots: d,
    });	

}, 20000);})();
//137371

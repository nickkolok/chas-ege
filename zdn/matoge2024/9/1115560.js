(function() { retryWhileError(function() {
    let c=sluchch(1,30).pm();
    let a=sluchch(1,30).pm();
    let b=sluchch(1,30).pm();
    let e=sluchch(1,30).pm();
    let g=slKrome(c,1,30).pm();
    let f=slKrome(g,1,30).pm();
    let d=-(b*g+e*c*g)/(a*g-c*f);
    genAssertZ1000(d, 'Корень не должен быть слишком дробным');
    NAtask.setEquationTask({
        parts: [['\\frac{'+a+'x+'+b+'}{'+c+'}',e].slag(),'\\frac{'+f+'x'+'}{'+g+'}'],
	      roots: d,
    });	
}, 2000);})();
//VeronikaKit
//1115560

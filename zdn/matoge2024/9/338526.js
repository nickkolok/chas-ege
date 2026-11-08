(function() { retryWhileError(function() {
    let a=sluchch(1,30).pm();
    let b=slKrome(Math.abs(a),1,30).pm();
    let c=[1,-1].iz();
    let e=[1,-1].iz();
    let d;
    if (c!=e){
    	d=(a-b)/(c-e);
    } else if (c!=-e){
    	d=-(a+b)/(c+e);
    }
    genAssertZ1000(d,'Корень не должен быть слишком дробным');
    NAtask.setEquationTask({
	       parts: [[e+'x',a].slag(), [c+'x',b].slag()],
	       wrapper: ['(', ')^2'],
	       roots: [d]
    });
}, 1000);})();
//VeronikaKit
//РешуОГЭ 338526

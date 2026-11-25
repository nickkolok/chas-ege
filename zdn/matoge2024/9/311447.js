(function() { retryWhileError(function() {
    let a=sluchch(1,20).pm();
    let b=sluchch(1,40).pm();
    let d=0;
    let e=-b/a;
    genAssertZ1000(e, 'Корень не должен быть слишком дробным');
    NAtask.setEquationTask({
        parts: [a+'x^2+'+b+'x', 0],
        roots: [d,e],
        handleMultipleRoots: 'randomExceptList',
    });
}, 20);})();
//VeronikaKit
//РешуОГЭ 311447

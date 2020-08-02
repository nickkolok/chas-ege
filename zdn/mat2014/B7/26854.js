(function(){
    NAinfo.requireApiVersion(0, 0);
    var a = sluchch(2, 10);
    var b = 1;
    var c = 1;
    var e = 1;
    var d = 1;
    var y = 1;
    do {
        b = sluchch(2, 20);
        y = sluchch(2, 10);
        d = sluchch(y+1, 10);
        c = Math.pow(b, d);
        e = Math.pow(b, y);
    } while (c > 1000 || e > 1000);
	NAtask.setTask({
	    text: 'Найдите значение выражения $$\\frac{{'+a+'}^{\\log_{'+b+'}{'+c+'}}}{{'+a+'}^{\\log_{'+b+'}{'+e+'}}} $$',
	    answers: Math.pow(a, d-y),   
	},{
        tags: {log:1},
    });
})();
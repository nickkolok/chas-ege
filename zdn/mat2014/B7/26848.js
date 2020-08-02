(function(){
    NAinfo.requireApiVersion(0, 0);
    var b = 1; // Основание для логарифма 
    var a = 1; // Подлогарифмическое первого 
    var z = [0.5, 0.25].iz();
    var c = sluchch(1, 10, z); // Подлогарифмическое второго
    var y = 1;
    do {
        a = sluchch(c, 100, c);
        y = sluchch(1, 10);
        b = Math.pow(a/c, y);
    } while (b > 100 || y % 3 ===0 );
	NAtask.setTask({
	    text: 'Найдите значение выражения $$\\log_{'+b+'}{'+a+'} - \\log_{'+b+'}{'+c+'} $$',
	    answers: 1 / y,   
	},{
        tags: {log:1},
    });
})();  

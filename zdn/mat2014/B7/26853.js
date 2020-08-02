(function(){
    NAinfo.requireApiVersion(0, 0); // Не придумал, как исправить возникавшую роблему, теперь программа генерит немного другое задание, с той же сутью 
    var b = sluchch(2, 10);
    var y = [1, 3].iz();
    var d = 1;
    var a = 1;
    var c = 1;
    var e = 1;
    do {
        b = sluchch(2, 10);
        a = sluchch(2, 10); 
        c = sluchch(2, 10); 
        e = Math.pow(a, c);
        d = Math.pow(b, c);
    } while (e > 100 || d > 100);
	NAtask.setTask({
	    text: 'Найдите значение выражения $$\\log_{'+a+'}{'+d+'}\\cdot\\log_{'+b+'}{'+e+'} $$',
	    answers: c*c,   
	},{
        tags: {log:1},
    });
})();  

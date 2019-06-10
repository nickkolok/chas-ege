(function() {
	'use strict';
	var m = sluchch(1, 37),
		n = sluchch(1, m - 1),
		a = m * m - n * n,
		b = 2 * m * n,
		c = m * m + n * n,
		d = '-',
		variety = [a,b,c].shuffle(),
        h = variety[0],
        f = Math.max(variety[1],variety[2]),
        g = Math.min(variety[1],variety[2]);
        if(h == c){
            d = '+';
            f = variety[1];
            g = variety[2];//если знак "+", числа в случайном порядке, если "-", большее стоит первым
        }
	chas2.task.setTask({
		text: 'Найдите значение выражения $$\\sqrt{'+f+'^{2}'+d+g+'{^2}}$$',
		answers: ''+h,
	});
})();

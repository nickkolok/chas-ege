(function() {

    var body =  sklonlxkand((['мяч', 'стакан', 'тело', 'молот']).iz());
    var velbeg = sluchch(10.0, 30.0);
    var time = sluchch(1.0, 4.0);
    var phys_g = 10;

    var angname = ['alpha', 'beta', 'gamma'].iz();
    var angname_tex = '$\\' + angname + '$';

    chas2.task.setTask({
		text: body.ie.toZagl() + ' бросили под углом к плоской горизонтальной поверхности земли. ' +
            'Время полёта ' + body.re +' задаётся законом $t=\\frac{2v_0\\sin\\' + angname + '}{g} с.$ ' +
            'При каком наименьшем значении угла ' + angname_tex + ' время полёта ' +
            'будет не меньше, чем ' + chislitlx(time, 'секунда') + ', ' +
            ' если ' + body.ie + ' бросают с начальной скоростью $v_0=' + velbeg +'\\frac{м}{с}$? ' +
            'Считайте, что ускорение свободного падения $g=$' + phys_g + '$\\frac{м}{с^2}$. ' +
            'Дайте в качестве ответа синус угла $\\'+ angname +'$.',
        answers: time * phys_g / 2.0 / velbeg,
	});
    chas2.task.modifiers.roundUpTo(-1); //модификатор округления ответа
	//Синус больше единицы. Зло!
    window.vopr.kat['log'] = 0;
    window.vopr.kat['prz'] = 0;
    window.vopr.kat['drs'] = 0;
    window.vopr.kat['tri'] = 0;
})();
// kbsx32


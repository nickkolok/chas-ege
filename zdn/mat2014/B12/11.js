// kbsx32

(function() {

    var body =  sklonlxkand((['мяч', 'стакан']).iz());
    var velbeg = sluchch(10.0, 30.0);
    var time = sluchch(1.0, 4.0);
    var phys_g = 10;
    
    var angname = ['alpha', 'beta', 'gamma'].iz();
    var angname_tex = '$\\' + angname + '$';
    
    window.vopr.txt=(
            body.ie.toZagl() + ' бросили под углом к плоской горизонтальной поверхности земли. ' + 
            'Время полёта ' + body.re +' задаётся законом $t=\\frac{2v_0\\sin\\' + angname + '}{g} с.$ ' +
            'При каком наименьшем значении угла ' + angname_tex + ' время полёта ' + 
            'будет не меньше, чем ' + chislitlx(time, 'секунда') + ', ' +
            ' если ' + body.ie + ' бросают с начальной скоростью $v_0=' + velbeg +'\\frac{м}{с}$? ' +
            'Считайте, что ускорение свободного падения $g=$' + phys_g + '$\\frac{м}{с^2}$. ' +
            'Дайте в качестве ответа синус угла $\\'+ angname +'$. Ответ округлите до десятых.');

    window.vopr.ver=[(time * phys_g / 2.0 / velbeg * 10).round() / 10];
    window.vopr.kat['log'] = 0;
    window.vopr.kat['prz'] = 0;
    window.vopr.kat['drs'] = 0;
    window.vopr.kat['tri'] = 0;
})();

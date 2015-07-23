(function(){'use strict';
NAinfo.requireApiVersion(0, 0);

var material=sklonlxkand(['лейкопластырь','скотч','изолента'].iz());
var ed_izm=['мм','см','дм'].iz();
var diam=sluchch(1,50);
var ans=diam*diam;
var ed_ans;

switch (ed_izm) {
	case 'см':
		diam/=10;
		ed_ans = ['миллиметрах','дециметрах'].iz(); 
	break;   
	case 'дм':
		diam/=100;
		ed_ans = ['миллиметрах','сантиметрах'].iz();
	break;
	default:
	   ed_ans = ['сантиметрах','дециметрах'].iz(); 
}

if (ed_ans != 'миллиметрах')
	ans = (ed_ans=='сантиметрах')?(ans/100):(ans/10000);

NAtask.setTask({
	text: 'Двоечник Вася Головоластный в качестве талисмана на ЕГЭ '+ 
			'подкладывает под левую пятку пятак диаметром ' + diam + ' ' + 
			ed_izm + '. Чтобы пятак не натирал ногу, Вася решил заклеить ' + 
			'его ' + material.te + '. Помогите Васе найти минимальную площадь ' +
			'квадратного куска ' +  material.re + ', который покроет ' + 
			'монету. Ответ дайте в квадратных ' + ed_ans +'.',
	answers: ans,
});

})();
//kinolog
//Yana Polyuk

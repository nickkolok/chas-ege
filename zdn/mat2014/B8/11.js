(function() {

var t1 = NLsets.alphabets.english.get_random_items(4);
var t2=['центральный'	,'вписанный'	];
var t3=['больше'		,'меньше'		];
var t4=['вписанного'	,'центрального'	];
var v1=sl1();
var vpis=sl(1,89);

window.vopr.ver=[v1?vpis:vpis*2];
window.vopr.txt='Найдите '+t2[v1]+' угол '+t1[0]+t1[1]+t1[2]+', если он на '+vpis+
	'° '+t3[v1]+' '+t4[v1]+' угла '+t1[0]+t1[3]+t1[2]+
	', опирающегося на ту же дугу. Ответ дайте в градусах.';

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();

//Обзад 245393
//Николай Авдеев


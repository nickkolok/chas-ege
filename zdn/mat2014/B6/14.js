(function(){

var va=sl(0.01,0.95,0.01);
var vb=sl(0.01,1-va-0.02,0.01);
var t1=[
	'Теорема Ролля',
	'Теорема Лагранжа',
	'Теорема Дарбу',
	'Производные и дифференциалы высших порядков',
	'Теорема Коши',
	'Правило Лопиталя',
].iz(2);

window.vopr.txt='На коллоквиуме по математическому анализу студенту достаётся один из вопросов. '+
	'Вероятность того, что это вопрос по теме "'+t1[0]+'", равна '+va.ts()+'. Вероятность того, что это вопрос по '+
	'теме "'+t1[1]+'", равна '+vb.ts()+'. Вопросов, которые одновременно относятся к этим двум темам, нет. '+
	'Найдите вероятность того, что на коллоквиуме студенту достанется вопрос по одной из этих двух тем.';

window.vopr.ver=[(va+vb).ts()];

window.vopr.rsh='Вероятность одного из несовместных событий равна сумме вероятностей этих событий:'+
	'$'+va.ts()+'+'+vb.ts()+'='+(va+vb).ts()+'$.';

})();
//Обзад 319355

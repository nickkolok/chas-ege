(function(){

var napitka=['чая','кофе'].iz();//Вернёт случайным образом 'чая' или 'кофе'
var meropr=sklonlxkand(['конференция','мероприятие','слёт'].iz());
var up=sklonlxkand(['пачка','коробка','упаковка'].iz());
var dni=sluchch(2,10);
var pak=sluchch(50,200,10);
var rash=sluchch(20,100);

NAtask.setTask({
	text : 'В среднем за день во время '+meropr.re+' расходуется '+chislitlx(rash,'пакетик')+' '+napitka+'. '+
	meropr.ie.toZagl()+' длится '+chislitlx(dni,'день')+'. В '+up.pe+' '+napitka+' '+chislitlx(pak,'пакетик')+'. '+
	'Какого наименьшего количества '+up.rm+' '+napitka+' хватит на все дни '+meropr.re+'?',
	answers : (rash*dni/pak).ceil(),
});
})();
//Обзад 77339

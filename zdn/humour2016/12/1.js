//
//	12. Наблюдательный гопник Димон Чёткий намётанным глазом на выпускном 
//	определил, что у него в фужере конической формы осталось всего 50 грамм 
//	апельсинового сока, причём уровень сока достигает 1/3 высоты фужера. Сколько 
//	раз Димон совершит отточенное до автоматизма движение "ещё по пятьдесят", 
//	прежде чем фужер наполнится?
//

(function(){'use strict';
NAinfo.requireApiVersion(0, 0);

var gram = sl(50,250,50);
var k = sl(2,3);

NAtask.setTask({
	text: 'Наблюдательный гопник Димон Чёткий намётанным глазом на выпускном ' + 
	'определил, что у него в фужере конической формы осталось всего ' + gram + ' грамм ' + 
	'апельсинового сока, причём уровень сока достигает 1/' + k + ' высоты фужера. Сколько ' + 
	'раз Димон совершит отточенное до автоматизма движение "ещё по ' + gram + '", ' + 
	'прежде чем фужер наполнится?',
	answers: (k * k * k) - 1,
});
		
})();

//
//	Юмористически набор, №12
//	https://bitbucket.org/chas-ege-team/chas-ege/issues/55/
//	hripunov
//


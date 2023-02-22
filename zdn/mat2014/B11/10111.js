(function(){
	NAinfo.requireApiVersion(0, 0);
	var a = sluchch(2, 10);
	var b = sluchch(2, 10);

	NAtask.setTask({
		text: 'Найдите значение выражения $$ \\frac{'+a+'^{\\sqrt{\\log_{'+a+'}{'+b+'}}}}{'+b+'^{\\sqrt{\\log_{'+b+'}{'+a+'}}}} $$',
		answers: 1,
	},{
		tags: {
			log:1,
		},
	});
})();
//https://ege-ok.ru/2015/04/28/preobrazovanie-logarifmicheskix-vyrazhenij
//Задание 10 из т/р №111 А. Ларина
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

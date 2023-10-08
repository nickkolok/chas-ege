let a = sluchch(3, 11);
let b = sluchch(2, 4);
let n = sluchch(4, 11);

let progression = new ArithmeticProgression(a, b);

NAtask.setTask({
	text: ' Рабочие прокладывают тоннель длиной ' + chislitlx(progression.sum(n), 'метр') +  
		', ежедневно увеличивая норму прокладки на одно и то же число метров.' +
		' Известно, что за первый день рабочие проложили ' + chislitlx(a, 'метр')+  ' туннеля. ' +
		' Определите, сколько метров туннеля проложили рабочие в последний день,' +  
		' если вся работа была выполнена за ' + chislitlx(n, 'день') + '.',

	answers: progression.member(n),
});
//Сергей Алендарь

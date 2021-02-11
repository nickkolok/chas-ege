(function() {
	NAinfo.requireApiVersion(0, 2);

	do{
		var hours = sl(1,11);
		var minutes = slKrome(hours*5,0,59);
		var coincidenceNumber = sl(1,20);
		var bias = 1*(minutes > hours*5 + minutes/12);
		var answer = -minutes + 60 * (hours + 12* (coincidenceNumber - 1 + bias)) / 11;
		console.log(answer, bias);
	}while(!(1000*answer).isZ() || answer <= 0);

	NAtask.setTask({
		text:
			'Часы со стрелками показывают ' +
			chislitlx(hours, 'час') + ' ' +
			(minutes ? chislitlx(minutes, 'минута') : 'ровно') +
			'. ' +
			'Через сколько минут минутная стрелка в ' + om.porchisl[coincidenceNumber].i[0] + ' раз поравняется с часовой?',
		answers: answer.ts(),
	});
})();

//Николай Авдеев
// https://ege.sdamgia.ru/problem?id=114657

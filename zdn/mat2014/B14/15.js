(function() {
	NAinfo.requireApiVersion(0, 2);

	var stations = NLsets.alphabets.russian.getRandomItems(2);
	stations[0] += '.';
	stations[1] += '.';

	var name = sklonlxkand(window.imenaj.ie.iz());

	do{
		var distanceBetweenStations = sl(1.5,10,0.5);
		var distanceToLeftStation = sl(0.100,2.000,0.001);
		var answer = distanceBetweenStations * distanceToLeftStation / (distanceBetweenStations - 2 * distanceToLeftStation)
	}while(!(1000*answer).isZ() || answer <= 0 || answer >= 20);

	var questionsAndAnswers = [
		[
			'Каково сейчас расстояние (в км) между ' + name.te + ' и автобусом? ',
			answer + distanceToLeftStation,
		],
	];

	if ( (1000*answer / distanceToLeftStation).isZ() ){
		questionsAndAnswers.push([
			[
				'Во сколько раз скорость автобуса больше скорости велосипеда?',
				'Во сколько раз скорость велосипеда меньше скорости автобуса?',
			].iz(),
			answer / distanceToLeftStation,
		])
	}


	questionsAndAnswers = questionsAndAnswers.iz();


	NAtask.setTask({
		text: 'Между остановками ' + stations[0] + ' и ' + stations[1] + ' ' +
			chislitlx(distanceBetweenStations, 'километр') + ' прямой трассы. '+
			name.ie + ' выехала на велосипеде из леса между станциями в ' +
			chislitM(distanceToLeftStation*1000, 'метре', 'метрах', 'метрах')+
			' от ' + stations[0] + ' и увидела, что к ' + stations[0] + ' в направлении к ' + stations[1] +
			' с постоянной скоростью подъезжает автобус, на который ' + name.de + ' нужно успеть. '+
			'Она заметила, что если она сейчас поедет в сторону ' + stations[0] + ', она окажется там одновременно с автобусом. ' +
			'Но и если она поедет в сторону ' + stations[1] + ', она также окажется там одновременно с автобусом, '+
			'который успеет преодолеть весь участок от ' + stations[0] + ' до ' + stations[1] +
			', не останавливаясь на остановке ' + stations[0] + ' ' +
			 questionsAndAnswers[0] +
			' (Считайте, что автобус и велосипед движутся с постоянными скоростями и останавливаются мгновенно.)',
		answers: questionsAndAnswers[1].ts(),
		// TODO: во сколько раз cкорость призрака меньше скорости поезда?
	});
})();

//Николай Авдеев

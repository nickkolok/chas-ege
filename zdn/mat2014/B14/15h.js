(function() {
	NAinfo.requireApiVersion(0, 2);

	var stations = NLsets.alphabets.russian.getRandomItems(2);
	stations[0] += '.';
	stations[1] += '.';

	do{
		var distanceBetweenStations = sl(1.5,10,0.5);
		var distanceToLeftStation = sl(0.100,2.000,0.001);
		var answer = 1000 * distanceBetweenStations * distanceToLeftStation / (distanceBetweenStations - 2 * distanceToLeftStation)
	}while(!(1000*answer).isZ() || answer <= 0);

	NAtask.setTask({
		//.toZagl() делает заглавной первую букву строки, к которой вызвана
		text: 'Между станциями ' + stations[0] + ' и ' + stations[1] + ' ' +
			chislitlx(distanceBetweenStations, 'километр') + ' прямой дороги. '+
			'Призрак Анны Карениной вылетел к железной дороге между станциями из леса в '+
			chislitM(distanceToLeftStation*1000, 'метре', 'метрах', 'метрах')+
			' от ' + stations[0] + ' и увидел, что к ' + stations[0] + ' в направлении к ' + stations[1] +
			' с постоянной скоростью подъезжает поезд, который Анна хотела бы повидать. '+
			'Призрак заметил, что если он сейчас полетит в сторону ' + stations[0] + ', он окажется там одновременно с поездом. ' +
			'Но и если он полетит в сторону ' + stations[1] + ', он также окажется там одновременно с поездом, '+
			'который успеет преодолеть весь перегон от ' + stations[0] + ' до ' + stations[1] +
			', не останавливаясь ни на одной из станций. ' +
			'Каково сейчас расстояние (в км) между призраком и поездом?',
		answers: answer,
		// TODO: во сколько раз cкорость призрака меньше скорости поезда?
	});
})();

//Николай Авдеев

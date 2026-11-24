(function() { 'use strict'; retryWhileError(function() {
	/* Из городов А и В навстречу друг другу одновременно выехали мотоциклист и велосипедист. Мотоциклист приехал в город В на 10 часов раньше, чем велосипедист приехал в город А, а встретились они через 3 часа 45 минут после выезда. Сколько часов затратил на путь из города В в город А велосипедист? */

	let t=sl(1,10,0.01);
	let m=sl(1, 4,0.01)*60+sl(1, 59, 1,0.01);
	let n=60*(t-1/(60/m-1/t))
	
	genAssert(n>0.001, 'Время не может быть отрицательным');
	genAssert(t!=n, 'Время не может быть отрицательным');
	genAssert(n<50, 'Время не может быть отрицательным');
	genAssertZ1000(n, 'Время не должно быть слишком уж дробным');

	let the_humanSettlementDestination = sklonlxkand(["пункт","город","село","деревня","посёлок","п.","точка"].iz());
	let the_vehicleRacingOnRoad = sklonlxkand([["автомобиль","автомобилист"].iz(),["мотоцикл","мотоциклист"].iz(),["велосипед","велосипедист"].iz(),"электросамокат","гироскутер","гонщик","грузовик"].iz(2));

	NAtask.setTask({
		text: ['Из ' + the_humanSettlementDestination.rm +' A и B навстречу друг другу одновременно выехали ' + the_vehicleRacingOnRoad[1].ie +' и ' + the_vehicleRacingOnRoad[0].ie,
			   the_vehicleRacingOnRoad[1].ie.toZagl() +' и ' + the_vehicleRacingOnRoad[0].ie + ' выехали одновременно из '+ the_humanSettlementDestination.rm +' A и B навстречу друг другу'].iz() +
			'. ' + the_vehicleRacingOnRoad[1].ie.toZagl() +' '+['приехал','прибыл'].iz()+' в ' + the_humanSettlementDestination.ve +' B на ' +
			n.toChMin() + ' раньше, '+ 'чем ' + the_vehicleRacingOnRoad[0].ie +' '+['приехал','прибыл'].iz()+' в ' + the_humanSettlementDestination.ve +
			' A, а встретились они через ' + m.toChMin() + ' после '+['выезда','начала движения'].iz()+'. '+'Сколько '+['часов','времени'].iz()+
			[' затратил на '+['путь','дорогу'].iz()+' из ' + the_humanSettlementDestination.re +' B в ' + the_humanSettlementDestination.ve + ' A ' + the_vehicleRacingOnRoad[0].ie +'?',
			' ' + the_vehicleRacingOnRoad[0].ie +' затратил на '+['путь','дорогу'].iz()+' из ' + the_humanSettlementDestination.re +' B в ' + the_humanSettlementDestination.ve + ' A?',
			' затратил ' + the_vehicleRacingOnRoad[0].ie +' на '+['путь','дорогу'].iz()+' из ' + the_humanSettlementDestination.re +' B в ' + the_humanSettlementDestination.ve + ' A?',
			' ушло у ' + the_vehicleRacingOnRoad[0].re +' на '+['путь','дорогу'].iz()+' из ' + the_humanSettlementDestination.re +' B в ' + the_humanSettlementDestination.ve + ' A?'
			].iz(),
		answers: t,
		authors: ['Aisse-258'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
	NAtask.modifiers.variativeABC([],{preserve:['S','T']});
}, 2000);})();
// РешуЕГЭ: 99592: 113101 519512 519538 113081 113083 
//113085 113087 113089 113091 113093 113095 113097 113099 

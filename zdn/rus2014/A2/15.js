(function() {
	'use strict';
	chas2.task.setTask({
		text: 'В каком предложении вместо слова ПРАКТИЧЕСКИЙ нужно употребить ПРАКТИЧНЫЙ?;' + '<br/>',
		answers: [
			'Марина Васильевна очень взволновалась, но всё-таки прислушалась к мудрой и ПРАКТИЧЕСКОЙ своей приятельнице.',
		],
		wrongAnswers: [
			'Важное значение для дальнейшей жизни имеют ПРАКТИЧЕСКИЕ навыки, приобретённые в раннем детстве.',
			'Вихрев в ПРАКТИЧЕСКОЙ жизни отличался редкостным простодушием.',
			'Система ПРАКТИЧЕСКИХ занятий широко распространена в высшей школе.',
		],
		analys: 'ПРАКТИЧЕСКИЙ — занимающийся применением каких-либо знаний на деле, развивающий умения, знания, опыт в сфере какой-либо деятельности. По контексту подразумевается ПРАКТИЧНЫЙ.',
	});
	AtoB();
})();

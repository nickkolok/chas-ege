(function() {
	'use strict';
	chas2.task.setTask({
		text: 'В каком предложении вместо слова ЗЛОЙ нужно употребить ЗЛОСТНЫЙ?' + '<br/>',
		answers: [
			'Имейте в виду, что ЗЛЫЕ браконьеры являются уголовными преступниками и будут непременно наказаны.',
		],
		wrongAnswers: [
			'Здесь было так неуютно и страшно, как в заколдованном царстве, где всё уснуло по прихоти ЗЛОЙ феи.',
			'Не по ЗЛОЙ воле он допускал промахи и ошибки.',
			'Человек он был ЗЛОЙ: ему непременно нужно было кого-то мучить.',
		],
		analys: 'ЗЛЫЕ браконьеры — браконьеры, испытывающие злобу. По контексту подразумеваются ЗЛОСТНЫЕ браконьеры. ',
	});
	AtoB();

})();

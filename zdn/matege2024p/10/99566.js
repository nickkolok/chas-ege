(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let r = sl(1, 50);
	let day = [om.denned.pg['в'], om.denned.ve].T().iz(2).map((elem)=>elem.join(' '));
	let priceСhange = ['подорожали', 'подешевели'].shuffle();

	NAtask.setTask({
		text: `${day[0].toZagl()} акции компании ${priceСhange[0]} на некоторое число процентов, 
		а ${day[1]} ${priceСhange[1]} на то же самое число процентов. 
		В результате они стали стоить на $${r}\\%$ дешевле, чем при открытии торгов ${day[0]}. 
		На сколько процентов ${priceСhange[0]} акции компании ${day[0]}.`,
		answers: r.sqrt() * 10,
		author: 'Суматохина Александра'
	});
	NAtask.modifiers.multiplyAnswerBySqrt(50);
})();
// 99566 107393 107399 530822 530897 107395 107397 99566 107393 107399 530822 530897 107395 107397

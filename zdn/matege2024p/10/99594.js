(function() { 'use strict'; retryWhileError(function() {
	/* Расстояние между городами A и B равно 420 км. Из города A в город B выехал автомобиль, а через 1 час следом за ним со скоростью 80 км/чвыехал мотоциклист, догнал автомобиль в городе C и повернул обратно. Когда он вернулся в A, автомобиль прибыл в B. Найдите расстояние от A до C. Ответ дайте в километрах. */

	let x=sl(10, 200, 0.01);
	let y=sl(10, 90, 0.01);
	let delay=sl(0.5, 3, 0.01);
	let v=x*y/(x-y*delay);
	genAssertZ1000(v,'Скорость слишком дробная');
	genAssert(v>=5 && v<100,'Скорость не принадлежит диапазону');
	let S=x*y/v+x;
	genAssertZ1000(S,'Расстояние слишком дробное');


	let the_humanSettlementDestination = sklonlxkand(["пункт","город","село","деревня","посёлок","п."].iz());
	let the_orderToFind = decor.orderToFind.iz();
	let the_vehicleRacingOnRoad = sklonlxkand([["автомобиль","автомобилист"].iz(),["мотоцикл","мотоциклист"].iz(),["велосипед","велосипедист"].iz(),"электросамокат","гироскутер","грузовик"].iz(2));
	
	NAtask.setTask({
		text:
			'Расстояние между ' + the_humanSettlementDestination.tm +' A и B равно ' + S + ' км. '+
			'Из ' + the_humanSettlementDestination.re +' A в ' + the_humanSettlementDestination.ve +' B выехал ' + the_vehicleRacingOnRoad[0].ie +', '+
			'а через ' + [chislitlx(delay, 'час'),(delay*60).toChMin()].iz() + ' следом за ним со скоростью ' + v + ' км/ч выехал ' + the_vehicleRacingOnRoad[1].ie +', '+
			'догнал ' + the_vehicleRacingOnRoad[0].ie +' в ' + the_humanSettlementDestination.pe +' C и повернул обратно. '+
			'Когда он вернулся в A, ' + the_vehicleRacingOnRoad[0].ie +' прибыл в B. ' + the_orderToFind.toZagl() +' расстояние от A до C. Ответ дайте в километрах.',
		answers: x,
		authors: ['Aisse-258'],
	});
	NAtask.modifiers.allDecimalsToStandard();
	NAtask.modifiers.variativeABC();
}, 200000);})();
// РешуЕГЭ:
/* 99594: 520493 520513 642000 642018 113155 113157 113159 113161 113163 113165
	113167 113169 113171 113173 113175 113177 113179 113181 113183 113185 113187
	113189 113191 113193 113195 113197 113199 113201 113203 113205 113207 113209
	113211 113213 113215 113217 113219 113221 113223 113225 113227 113229 113231
	113233 113235 113237 113239 113241 113243 113245 113247 113249 113251 113253
	113255 113257 113259 113261 113263 113265 113267 113269 113271 113273 113275
	113277 113279 113281 113283 113285 113287 113289 113291 113293 113295 113297
	113299 113301 113303 113305 113307 113309 113311 113313 113315 113317 113319
	113321 113323 113325 113327 113329 113331 113333 113335 113337 113339 113341
	113343 113345 113347 113349 113351 113353 113355 113357 113359 113361 113363
	113365 113367 113369*/
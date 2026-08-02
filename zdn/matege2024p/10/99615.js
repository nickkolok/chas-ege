(function() {
	'use strict';
	retryWhileError(function() {
		/* Первый насос наполняет бак за 20 минут, второй — за 30 минут, а третий — за 1 час. За сколько минут наполнят бак три насоса, работая одновременно? */

		let timeFirst = sl(30, 250, 2);
		let timeSecond = slKrome(timeFirst, 30, 250, 2);
		let timeThird = slKrome([timeFirst, timeSecond], 30, 250, 2);
		let answer = timeFirst * timeSecond * timeThird / (timeFirst * timeSecond + timeFirst * timeThird + timeSecond * timeThird);
		genAssert(answer.isAlmostInteger(), "Ответ не целый");

		let container = sklonlxkand(decor.objectsFilledWithLiquid.iz());
		let pump = sklonlxkand(decor.objectsTransportingLiquids.iz());

		NAtask.setTask({
			text: om.porchisl[1].i[pump.rod].toZagl() + ' ' + pump.ie + ' наполняет ' + container.ve + ' за ' + timeFirst.randToChMin('v') + ', ' +
				om.porchisl[2].i[pump.rod] + ' — за ' + timeSecond.randToChMin('v') + ', ' +
				'а ' + om.porchisl[3].i[pump.rod] + ' — за ' + timeThird.randToChMin('v') + '. ' +
				'За сколько минут наполнят ' + container.ve + ' три ' + pump.re + ', ' +
				'работая одновременно?',
			answers: answer,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.allDecimalsToStandard( /*true*/ );
	}, 5000);
})();
// РешуЕГЭ: 
//99615 118555 118559 118295 118297 118299 118301 118303 118305 118307 118309 118311 118313 118315 118317 118319 118321 118323 118325 118327 118329 118331 118333 118335 118337 118339 118341 118343 118345 118347 118349 118351 118353 118355 118357 118359 118361 118363 118365 118367 118369 118371 118373 118375 118377 118379 118381 118383 118385 118387 118389 118391 118393 118395 118397 118399 118401 118403 118405 118407 118409 118411 118413 118415 118417 118419 118421 118423 118425 118427 118429 118431 118433 118435 118437 118439 118441 118443 118445 118447 118449 118451 118453 118455 118457 118459 118461 118463 118465 118467 118469 118471 118473 118475 118477 118479 118481 118483 118485 118487 118489 118491 118493 118495 118497 118499 118501 118503 118505 118507 118509 118511 118513 118515 118517 118519 118521 118523 118525 118527 118529 118531 118533 118535 118537 118539 118541 118543 118545 118547 118549 118551 118553 118557

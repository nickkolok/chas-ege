(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let pr1 = sluchch(2, 30);
		let r1 = sluchch(2, 6);
		let r2 = sluchch(r1 + 2, 10);
		let an = ((100 - pr1) * r2) / r1 - 100;
		genAssert(an > 0);
		genAssertZ1000(an);

		let things = sklonlxkand(([
			['рубашка', 'куртка', 'футболка', 'шапка', 'платье', 'жилет', 'майка', 'шарф'],
			['примочка', 'пиявка', 'зелье', 'отвар', 'жаба', 'порошок', 'амулет'],
			['плед', 'одеяло', 'подушка', 'простыня', 'пододеяльник', 'матрас', 'дакимакура'],
			['мишка', 'зайка', 'белочка', 'ёжик'],
		]).iz().iz(2));
		NAtask.setTask({
			text: `${chislitlx(r1,things[0].ie)} дешевле ${things[1].re} на ${pr1}%.` +
				` На сколько процентов ${r2} таких же ${chislit(r2,things[0].ie,things[0].re,things[0].rm)} дороже ${things[1].re}?`,
			answers: an,
		});
	}, 100000);
})();
// 99567 107401 107467 519807 519826 107403 107405 107407 107409 107411 107413 107415 107417 107419 107421 107423 107425 107427 107429 107431 107433 107435 107437 107439 107441 107443 107445 107447 107449 107451 107453 107455 107457 107459 107461 107463 107465

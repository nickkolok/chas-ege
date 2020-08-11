(function() {
	NAinfo.requireApiVersion(0, 0);
	var a = sluchch(1, 20);
	var d = a;
	var e = a;
	while (d % 1 === 0 && e % 1 === 0 || sl1()) {
		var c = [2, 5, d].iz();
		d = d / c;
		e = e * c;
	}
	var f = [d, e].shuffle();
	NAtask.setTask({
		text: "Найдите значение выражения $$\\sqrt{" + f[0].ts() + "} \\cdot \\sqrt{" + f[1].ts() + "}$$",
		answers: a,
	});
})();
//https://mathb-ege.sdamgia.ru/problem?id=510021
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let body =  sklonlxkand((['мяч', 'стакан', 'тело', 'молот', 'камень', 'бутылка', 'ботинок']).iz());
		let velbeg = sl(10,30,0.01);
		let time = sluchch(1,4,0.01);
		let sin_a = time * 10 / 2 / velbeg;
	
		genAssert(sin_a<=1,"Синус больше 1");
		genAssertZ1000(sin_a);
	
		let angname = ['alpha', 'beta', 'gamma'].iz();
	
		NAtask.setTask({
			text: [body.ve + ' бросили под углом к плоской горизонтальной поверхности земли',
				'под углом к плоской горизонтальной поверхности земли бросили '+body.ve].iz().toZagl() +
				'. Время полёта ' + body.re +' (в секундах) '+['задаётся законом','определяется по формуле'].iz()+
				' $t=\\dfrac{2v_0\\sin\\' + angname + '}{g}$. ' +
				'При каком наименьшем значении угла $\\' + angname + '$ время полёта ' +
				'будет не меньше, чем $'+time.ts()+ '$ ' + chislitlx(time, 'секунда').split(" ")[1] + ', ' +
				' если ' + body.ve + ' бросают с начальной скоростью $v_0=' + velbeg.ts() +'\\dfrac{\\text{м}}{\\text{с}}$? ' +
				'Считайте, что ускорение свободного падения $g=10\\dfrac{\\text{м}}{\\text{с}^2}$. ' +
				'Дайте в качестве ответа синус угла $\\'+ angname +'$.',
			answers: sin_a
		});
	}, 20000);

	chas2.task.modifiers.roundUpTo(-2); //модификатор округления ответа

	window.vopr.kat['log'] = 0;
	window.vopr.kat['prz'] = 0;
	window.vopr.kat['drs'] = 0;
	window.vopr.kat['tri'] = 0;
})();
// kbsx32
/*Рефакторинг: Aisse-258
Прямого аналога в РешуЕГЭ нет
Похожие задачи: 27998, 28519, 43175, 28521, 28523
		, 28525, 28527, 28529, 43147, 43149
		, 43151, 43153, 43155, 43157, 43159
		, 43161, 43163, 43165, 43167, 43169
		, 43171, 43173*/

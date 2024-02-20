(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let T = 12*sl(0.001,1.5,0.001);//период колебаний
		let t = (T/12)*([1,5,7,11].iz()+12*sl(-10,10));//время колебаний
		genAssert(t>0,'Время отрицательно: '+t);
		let v0 = sl(0.01,5,0.01);//начальная скорость
		let v = v0*Math.sin(2*Math.PI*t/T);//скорость
		let m = sl(0.01,1,0.01);//масса
		let E = m*v*v/2;

		genAssertZ1000(E*10,'Ответ слишком дробный: '+E);

		let gruz = sklonlxkand(['груз','грузик','мячик','кольцо','шарик'].iz());
		let pruzh = sklonlxkand(['пружина','резинка','мембрана','струна'].iz());

		NAtask.setTask({
			text: gruz.ie.toZagl() + ' массой $'+m+'$ $\\text{кг}$ колеблется на '+pruzh.pe+'. Его скорость $v$ ($\\dfrac{\\text{м}}{\\text{с}}$) меняется по '+['закону','формуле'].iz()+' $v=v_0\\sin\\dfrac{2\\pi t}{T}$, '+
				'где $t$ – время с момента начала колебаний в секундах, $T='+T+'$ $\\text{с}$ – период колебаний, $v_0='+v0+'$ $\\dfrac{\\text{м}}{\\text{с}}$. '+
				'Кинетическая энергия $E$ (в $\\text{Дж}$) '+gruz.re+' '+['вычисляется','рассчитывается'].iz()+' по формуле $E=\\dfrac{mv^2}{2}$, '+
				'где $m$ – масса '+gruz.re+' (в $\\text{кг}$), $v$ – скорость '+gruz.re+' (в $\\dfrac{\\text{м}}{\\text{с}}$). '+
				'Найдите кинетическую энергию '+gruz.re+' через $'+t+'$ секунд после начала колебаний. '+
				'Ответ дайте в джоулях.',
			answers: E,
			authors: ['Aisse-258'],
			analys: '$\\sin\\dfrac{2\\pi t}{T}='+Math.sin(2*Math.PI*t/T)+'$'
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000000);
})();

/*РешуЕГЭ: 28012: 513877 513878 513879 513880
		513881 513882 513883 513884 513885
		513886 513887 513888 513889 513890
		513891 513892 513893 513894 513895
		513896 513897 513898 513899 513900
		513901 513902 513903 513904 513905*/

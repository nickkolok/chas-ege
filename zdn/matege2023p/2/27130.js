(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let ratio = sl(2,10,0.5);
		
		let name=['ребро','площадь поверхности','объём','квадрат диагонали'];
		let question=name.iz(2);
		
		let number = [
			[0, ratio * ratio, ratio * ratio * ratio, ratio * ratio],
			[ratio.sqrt(), 0, ratio.pow(1.5), ratio],
			[Math.cbrt(ratio), Math.cbrt(ratio.pow(2)), 0, Math.cbrt(ratio.pow(2))],
			[ratio.sqrt(), ratio, ratio.pow(1.5), 0]
		];
		
		let answ=number[name.indexOf(question[0])][name.indexOf(question[1])];
		genAssert((answ*100).isZ(), 'Нецелый ответ');
		
		NAtask.setTask({
			text:'Во сколько раз увеличится '+question[1]+' куба, если его '+question[0]+' увеличить в '+chislitlx(ratio,'раз')+'?',
			answers: answ,
		});
	});
})();

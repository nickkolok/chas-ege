(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		
		let lengthA = sl(1,20);
		let lengthB = sl(1,20);
		
		let angle = [0,30,45,60,90,120,135,150,180].iz();
		
		NAtask.setTask({
			text: 'Длины векторов $\\vec{a}$ и $\\vec{b}$ равны $'+lengthA.texsqrt(1)+'$ и $'+lengthB.texsqrt(1)+'$, а угол между ними равен $'+angle+'^\\circ$. Найдите скалярное произведение $\\vec{a}\\cdot\\vec{b}$.',
			answers: (lengthA*lengthB).sqrt()*cosdeg(angle),
			analys: '',
		});
		NAtask.modifiers.multiplyAnswerBySqrt(13);
	}, 1000);
})();
//https://ege314.ru/2-vektory/reshenie-4504/
//4504

(function(){'use strict';retryWhileError(function(){
	let coins=[
		{
			weights: [1, 2, 5, 10, 50],
			counts: [sluchch(10, 30), sluchch(10, 25), sluchch(5, 15), sluchch(2, 8), sluchch(1, 5)],
		},
		{
			weights: [1, 2, 5, 10],
			counts: [sluchch(15, 40), sluchch(10, 30), sluchch(5, 20), sluchch(2, 10)],
		},
		{
			weights: [1, 5, 10, 50],
			counts: [sluchch(20, 40), sluchch(10, 20), sluchch(5, 15), sluchch(1, 4)],
		},
	].iz();
	
	let p=coins.weights;
	let counts=coins.counts;
	
	let sumCoins = counts.reduce((a, b) => a + b, 0);
	let s = 0;
	for(let i=0; i<p.length; i++){
		s += p[i] * counts[i];
	}
	s = s / sumCoins;
	
	let pStr=p.map(x=>x.toLocaleString('ru-RU'));
	let cStr=counts.map(x=>x.toLocaleString('ru-RU'));
	
	let y=['Номинал монеты (в рублях)'].concat(pStr).tr('th');
	let z=[['Количество монет'].concat(cStr).tr()];
	let table=(y+z.soed()).vTabl();
	
	let preference=['table','text'];
	let displayMode=getSelectedPreferenceFromList('misc_mathexphype2026_1_20260816002',preference);
	
	let condition='';
	let wordFunc = function(c) {
		let lastDigit = c % 10;
		let lastTwoDigits = c % 100;
		if(lastDigit === 1 && lastTwoDigits !== 11) return 'монета';
		if([2,3,4].includes(lastDigit) && ![12,13,14].includes(lastTwoDigits)) return 'монеты';
		return 'монет';
	};
	if(displayMode===0){
		condition=table;
	}else{
		for(let i=0; i<p.length; i++){
			condition += `монет достоинством ${pStr[i]} руб. — ${cStr[i]} ${wordFunc(counts[i])},<br/>`;
		}
	}
	
	let analys=`Математическое ожидание случайной величины равно сумме произведений её возможных значений на вероятности этих значений.<br/>`+
	`Вероятность вытащить монету каждого достоинства равна отношению количества таких монет к общему количеству монет в копилке (${sumCoins}).<br/>`+
	`$$M(X) = `;
	let terms = [];
	for(let i=0; i<p.length; i++){
		terms.push(`${pStr[i]} \cdot \frac{${cStr[i]}}{${sumCoins}}`);
	}
	analys += terms.join(' + ') + ` = ${s}$$`;
	
	NAtask.setTask({
		text: `Мальчик вытряхивает из копилки одну монетку. В копилке лежат только те монеты, распределение которых представлено ниже.<br/><br/>${condition}Найдите математическое ожидание достоинства вытряхнутой монеты. Ответ дайте в рублях.`,
		answers: s,
		analys: analys,
		preference: [preference],
	});
	NAtask.modifiers.allDecimalsToStandard(true);
},2000);})();

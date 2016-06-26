(function(){'use strict';
	var radius=(2);
	var mnozh = sl(2,20, 2);
	
    chas2.task.setCountableTask([
		[
			{vel:'образующая конуса', nah:1, vin:1, zna: mnozh*2+Math.sqrt(radius/2),}
			
		].iz(),
		
    ],{
		preambula: 'Около конуса описана сфера (сфера содержит окружность основания конуса и его вершину)/ Центр сферы совпадает с центром основания конуса. Радиус сферы равен '+mnozh+'$\\sqrt{'+(radius)+'}$. ',
	});
	
})();
//Обзад 70004
//Vivi

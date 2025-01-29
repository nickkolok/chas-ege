//Задание 320181
//В группе туристов 5 человек. 
//С помощью жребия они выбирают двух человек, 
//которые должны идти в село в магазин за продуктами. 
//Какова вероятность того, что турист Д., входящий в состав группы, пойдёт в магазин?

(function(){retryWhileError(function(){'use strict';
	NAinfo.requireApiVersion(0, 0);
	let numberOfPerson = sl(5,30);
	let numberOfSelectedPeople = sl(2,[numberOfPerson-1, 10].minE());
	let namePersons = sklonlxkand(['турист','пионер'].iz());
	
	genAssertZ1000(numberOfSelectedPeople/numberOfPerson);
	
    NAtask.setTask({
        text: `В группе ${namePersons.rm} ${chislitM(numberOfPerson, 'человек', 'человека', 'человек')}. С помощью жребия они выбирают ${chislitM(numberOfSelectedPeople, 'человек', 'человека', 'человек')}, 
        которые должны идти в ${sklonlxkand(om.naspunkt.iz()).ve} в магазин за продуктами. Какова вероятность того, что ${namePersons.ie} ${window.rusbukv.iz()}., входящий в состав группы, пойдёт в магазин?`,
        answers:numberOfSelectedPeople/numberOfPerson,
        authors: ['Суматохина Александра'],
	});
}, 20);})();

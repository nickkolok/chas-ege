(function(){'use strict';
NAinfo.requireApiVersion(0, 0);

	var goods=sklonlxkand(['тетрадь','шуруп','карандаш','ручка'].iz());//товар
	var cost=sluchch(5,25);                                            //стоимость
	var sum=sluchch(20,70);                                            //количество
	var sumd=sluchch(30,50,10);                                        //количество,необходимое для скидки
	var discount=sluchch(5,12);                                        // скидка
	var client=['покупатель','школьник','ученик'].iz();                // покупатель
	var build=['киоск','ларёк','магазин'].iz();                          // заведение
	if (sumd<sum){
		var m=(cost*sum*(1-discount/100)).ceil() ;   //чтобы лишний раз не пересчитывать
	}else{
		var m=(cost*sum).ceil();
	}

NAtask.setTask({

	text: goods.ie.toZagl()+' стоит '+chislitlx(cost,'рубль')+'. Сколько рублей заплатит '+
	client+' за '+chislitlx(sum,goods)+', если при покупке больше '+chislitlx(sumd,goods)+
	' '+build+' делает скидку '+discount+'% от стоимости всей покупки?',

	answers:  m,
});
})();
// Обзад 77343
// Павел Lopaste

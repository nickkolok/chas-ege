(function(){'use strict';
NAinfo.requireApiVersion(0, 0);

var clothes = sklonlxkand(['футболка','майка'].iz());
var oldprice = sluchch(600,1000,10);
var newprice = sluchch(400,oldprice-100,10);

NAtask.setTask({

    text: clothes.ie.toZagl() + " стоила " + chislitlx(oldprice,"рубль") + ". " +
		"После снижения цены она стала стоить " + chislitlx(newprice,"рубль") + ". " +
		"На сколько процентов была снижена цена на " + clothes.ve + "?",

    answers: (100-(newprice/(oldprice/100))).ceil(),

});
})();

//Обзад 26630
//Lincor

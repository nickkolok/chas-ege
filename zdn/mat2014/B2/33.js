(function(){'use strict';
var product=['пачка '+['масла','соли'].iz(),'пакет молока','батон хлеба','банка тушенки','упаковка пельменей'].iz(); //продукт
var cost = sluchch(50,70);                                      //стоимость
var people=sklonlxkand(['пенсионер','студент','ветеран'].iz()); //льготники
var build=['магазин','ларек','киоск'].iz();                     //заведение
var discount=sluchch(2,10);                                      //скидка
window.vopr.txt=product.toZagl()+' стоит '+chislitlx(cost,'рубль')+'.'+
                people.dm.toZagl()+' '+build+' делает скидку '+
                discount+'%. Сколько рублей стоит   '+product+' для '+people.re+'?'
window.vopr.ver=[(cost*(1-discount/100)).ts()]
})();
// Обзад 77342
// Павел Lopaste

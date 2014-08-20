(function(){'use strict';

var Assembly=sluchch(5,30);
var Price=sluchch(2000,40000,500);
var Where=['магазине','салоне'].iz();
var Who=['Покупатель','Клиент','Заказчик','Потребитель'].iz();
var What=sklonlxkand(['шкаф','диван','кресло','стол','стенка','стелаж'].iz());
window.vopr.txt='В '+Where+' вся мебель продаётся в разобранном виде. '+Who+' может заказать сборку мебели на дому, стоимость которой составляет '+Assembly+'% от стоимости купленной мебели. '+What.ie.toZagl()+' стоит '+chislitlx(Price,'рубль')+' . Во сколько рублей обойдётся покупка '+What.re+' вместе со сборкой?';
window.vopr.ver=[(Price*(1+Assembly/100)).ts()];
})();
//Обзад 323515
//nadraliev

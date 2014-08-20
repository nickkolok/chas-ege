(function(){'use strict';

var ForOne=sluchch(50,900,10);
var InCan=sluchch(1,20,0.5).ts();
var Area=sluchch(20,200,10);
var Surface=['потолка','стены'].iz();
window.vopr.txt='Для покраски 1 кв. м '+Surface+' требуется '+ForOne+' г краски. Краска продаётся в банках по '+InCan+' кг. Какое'+
' наименьшее количество банок краски нужно купить для покраски '+Surface+' площадью '+Area+' кв. м?';

window.vopr.ver=[(Area*ForOne/1000/InCan).ceil().ts()];

})();
//Обзад 323513
//nadraliev

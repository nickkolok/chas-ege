(function(){'use strict';

var One=sluchch(1,3,0.1);
var Length=sluchch(2,9,0.1);
var Width=sluchch(2,9,0.1);
var Roll=sklonlxkand(['рулон','упаковка','пачка'].iz());

window.vopr.txt=Roll.re.toZagl()+' обоев хватает для оклейки полосы от пола до потолка шириной '+One.ts()+' м. Сколько '+
	Roll.rm+' обоев нужно купить для оклейки прямоугольной комнаты размерами '+Width.ts()+' м на '+Length.ts()+' м?';
window.vopr.ver=[((Width+Length)*2/One).ceil().ts()];

})();
//Обзад 323514
//nadraliev

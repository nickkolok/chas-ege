(function(){'use strict';
var znam=[1,2,3,4,5,6,9,12,15,18,20].iz();
var chis=sl(znam==1?0:1,znam).pm();

window.vopr.txt='Переведите $'+chis.pina(znam)+'$ радиан в градусы.';
window.vopr.ver=[ (180*chis/znam).ts() ];
})();
//http://matematikalegko.ru/priyomy/radiany-v-gradusy-gradusy-v-radiany.html

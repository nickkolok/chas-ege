(function(){'use strict';
  var osn=sluchch(2,9);
  var razr=sluchch(2,5);
  var chislo=sluchch(osn.pow(razr-1),osn.pow(razr)-1);
  window.vopr.txt='Укажите наименьшее основание системы счисления, в которой запись десятичного числа ' + chislo +
                   ' имеет ровно ' + razr.chislitM('значащий разряд','значащих разряда','значащих разрядов')+'.'
                   
  window.vopr.ver=[osn];
})();

//opengia a00f62
//Яна Полюк
//kinolog

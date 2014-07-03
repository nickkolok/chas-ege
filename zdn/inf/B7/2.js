(function(){'use strict';
  var osn=sluchch(2,9);
  var razr=sluchch(2,5);
  var chislo=sluchch(osn.pow(razr-1),osn.pow(razr)-1);
  window.vopr.txt='”кажите наименьшее основание системы счислени€, в которой запись дес€тичного числа ' + chislo +
                   ' имеет ровно ' + razr.chislitM('значащий разр€д','значащих разр€да','значащих разр€дов')+'.'
                   
  window.vopr.ver=[osn];
})();

//демоверси€ ≈√Ё-2014
//яна ѕолюк
//kinolog
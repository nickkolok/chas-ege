(function(){'use strict';
 
  var osn=sluchch(2,9);
  var chislo=sluchch(20,200);
  var rez=intoAnotherSystem(chislo,10,osn);
 
   window.vopr.txt='В системе счисления с некоторым основанием число '+chislo+
                    ' записывается как '+rez+'. Укажите это основание.';
 
  window.vopr.ver=[osn];
})();
 
//opengia 056134
//Яна Полюк
//kinolog
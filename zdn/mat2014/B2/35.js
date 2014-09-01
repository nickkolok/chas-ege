	

    (function(){'use strict';
      var Tovar=['мобильный телефон','планшет','телевизор','ноутбук','роутер','холодильник','монитор','компьютер','маршрутизатор','принтер'].iz();
      var Sin=['этот товар','этот продукт','данную модель','это устройство','эту модель'].iz();
      var CenaOld=sluchch(6000,50000,100);
      var CenaNew=CenaOld-sluchch(1,29)*(CenaOld/100);
      var Gl=['стоил','имел стоимость'].iz();
      var Vr=['через','спустя'].iz();
      var GlCenaMn=['снизили','понизили'].iz();
      var GlCenaEd=['снижена','понижена'].iz();
      var Cena=sklonlxkand(['цена','стоимость'].iz());
      window.vopr.txt=Tovar.toZagl()+' '+Gl+' '+chislitlx(CenaOld,'рубль')+'. '+Vr.toZagl()+' некоторое время '+Cena.ve+' на '+Sin+' '+GlCenaMn+' до '+chislitlx(CenaNew,'рубль')+'.'+
                      ' На сколько процентов была '+GlCenaEd+' '+Cena.ie+' ?'
      window.vopr.ver=[(100*(CenaOld-CenaNew)/CenaOld).ts()];
    })()
    //Обзад 77346
    //nadraliev


(function() {


var a=sluchch(1,20);
var b=sluchch(2,3);

window.vopr.txt='В случайном эксперименте бросают '+b+' игральные кости. '+
				'Найдите вероятность того, что в сумме выпадет '+a+' '+chislit(a,'очко','очка','очков')+'. Результат округлите до сотых.';
window.vopr.ver=[''+(om.igrkosti[b][a]/(6).pow(b)).toFixedLess(2).toStandart()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();

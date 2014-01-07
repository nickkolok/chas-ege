(function() {

var a=sluchch(1,19);
var c='один из углов '+sluchiz(['равен 30$^\\circ$','равен 150$^\\circ$',sluchiz(['в 5 раз ','на 120 градусов '])[0]+sluchiz(['больше','меньше'])[0]+' другого угла'])[0];

window.vopr.txt='Найдите площадь ромба, если его сторона равна '+a+', а '+c+'.';
window.vopr.ver=[(a*a/2).ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();

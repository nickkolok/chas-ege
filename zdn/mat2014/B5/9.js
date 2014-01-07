(function() {

var a=sluchch(1,19);
var b=slKrome(a,1,19);
var c=['угол между ними','один из углов'].iz()+' '+
	[
		'равен '+[3,15].iz()+'0$^\\circ$',
		['в 5 раз ','на 120 градусов '].iz()+['больше','меньше'].iz()+' другого угла'
	].iz();

window.vopr.txt='Найдите площадь параллелограмма, если две его стороны равны '+a+' и '+b+', а '+c+'.';
window.vopr.ver=[(a*b/2).ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();

(function() {

var a=sluchch(1,19);
var b=slKrome(a,1,19);
var c=['угол между ними','один из углов'].iz()+' '+
	[
		'равен '+[3,15].iz()+'0$^\\circ$',
		['в 5 раз ','на 120 градусов '].iz()+['больше','меньше'].iz()+' другого угла'
	].iz();

window.vopr.text='Найдите площадь параллелограмма, если две его стороны равны '+a+' и '+b+', а '+c+'.';
window.vopr.correctAnswers=[(a*b/2).ts()];

window.vopr.categories['log']=0;
window.vopr.categories['prz']=0;
window.vopr.categories['drs']=0;
window.vopr.categories['tri']=0;
})();

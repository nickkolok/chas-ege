(function() {

var cement=sl(100,500,10);
var cena1=sl(2000,4000,50);
var cena2=sl(400,800,10);
var stroen=lx[om.stroenmal.iz()];
var mat=om.stroymat.iz(2);
var mat1=lx[mat[0]];
var mat2=lx[mat[1]];
var mera1=lx[om.izmergruz.iz()];
var mera2=lx[om.izmergruz.iz()];
var mesh1=sl(2,10);
var mesh2=sl(15,30);
var kolvo1=sl(2,8);
var kolvo2=sl(2,8);

window.vopr.txt='Для строительства '+stroen.re+' можно использовать один из двух типов фундамента: из '+
	mat1.re+' или из '+mat2.re+'. Для фундамента из '+mat1.re+' необходимо '+chislitlx(kolvo1,mera1.ie)+' '+mat1.re+
	' и '+chislitlx(mesh1,'мешок')+' цемента. Для фундамента из '+mat2.re+' необходимо '+chislitlx(kolvo2,mera2.ie)+
	' '+mat2.re+' и '+chislitlx(mesh2,'мешок')+
	' цемента. '+mera1.ie.toZagl()+' '+mat1.re+' стоит '+chislitlx(cena1,'рубль')+', '+mat2.ie+' стоит '+
	chislitlx(cena2,'рубль')+
	' за '+mera2.ve+', а мешок цемента стоит '+chislitlx(cement,'рубль')+'. Сколько рублей будет стоить материал, '+
	'если выбрать наиболее дешевый вариант?';
window.vopr.ver=[Math.min(cena1*kolvo1+mesh1*cement,cena2*kolvo2+mesh2*cement).ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();

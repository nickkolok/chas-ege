(function() {'use strict';

var a=sluchch(2,9);
var b=sluchch(2,9);
var h=sluchch(2,9);

switch(sluchch(2)){//Что домножаем на 3
	case 0:
		a*=(a%3)?3:1;
	break;
	case 1:
		b*=(b%3)?3:1;
	break;
	case 2:
		h*=(h%3)?3:1;
	break;
}

var figur=['прямоугольный треугольник','прямоугольник','ромб'];
var vFigur=sluchch(2);
var koefPl=[0.5,1,0.5];
var nazvOtr=['второй катет','вторая сторона','вторая диагональ'];
var nazvOtrV=['второй катет','вторую сторону','вторую диагональ'];
var nazvOtrRod=[0,1,1];
var mas=[
	{vel:nazvOtr[vFigur]+' основания',zna:b,nah:1,rod:nazvOtrRod[vFigur],vin:nazvOtrV[vFigur],},
	{vel:'высота пирамиды',zna:h,nah:1,rod:1,vin:'высоту пирамиды',},
	{vel:'объём пирамиды',zna:a*b*h/3*koefPl[vFigur],nah:1,rod:0,vin:1},
	{vel:['первый катет','первая сторона','первая диагональ'][vFigur],zna:a,rod:nazvOtrRod[vFigur],},
];

mas=svVel(mas);
window.vopr.ver=mas.splice(0,1);
window.vopr.txt='Основанием пирамиды является '+figur[vFigur]+'. '+mas.soed();

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;

})();

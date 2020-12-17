(function() {

var x=sluchch(1,99);
var f=[1,2,4,5,10,20,25].iz();
var d=sluchch(30,50);
var b=f+d;
var a=sluchch(1,d-f-1);
var c=x*(2*d-a-b)/10/f;
x/=10;
var g=sluchch(0,2);
var h=['первого','второго','третьего'];
var m=[x,x+c,2*x+c];


if(sl1()){ // Растворы
	var bulk = 'раствор';
	var mixin = ['соль','щёлочь','кислота'].iz();
	var juncture = 'Два раствора сливают и получают третий, содержащий';
} else { //Сплавы
	var bulk = 'сплав';
	var mixin = ['медь','олово','серебро','золото','алюминий'].iz();
	var juncture = 'Из этих двух сплавов получили третий сплав, содержащий';
}

bulk = sklonlxkand(bulk);
mixin = sklonlxkand(mixin);

var massUnits=[
	[ 'г', 'в граммах'],
	['кг', 'в килограммах'],
].iz();

window.vopr.txt=
	('Имеется два ' + bulk.re + '. ').esli(sl1()) +
	'Первый ' + bulk.ie + ' содержит '+a.ts()+'% ' + mixin.re + ', второй содержит '+b.ts()+'% ' + mixin.re + '.' +
	' Масса второго ' + bulk.re + ' больше массы первого ' + bulk.re + ' на '+c.ts()+' ' + massUnits[0] + '.' +
	' ' + juncture + ' '+d.toFixedLess(4)+'% ' + mixin.re + '.' +
	' Найдите массу '+h[g]+' ' + bulk.re + '.' +
	' Ответ дайте ' + massUnits[1] + '.';

window.vopr.ver=[''+m[g].ts()];

window.vopr.kat['log']=0;
window.vopr.kat['prz']=0;
window.vopr.kat['drs']=0;
window.vopr.kat['tri']=0;
})();
// В том числе РешуЕГЭ 99575

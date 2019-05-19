(function() {
NAinfo.requireApiVersion(0, 2);
var tank = ['резервуар','бассейн','ёмкость','цистерну'].iz();
var tank_cont;
var mechanic;
var vol_dif;
var time_dif;
var num1;
var num2;
var ono;
var doin = ['заполняет','опустошает'].iz();
if (tank == 'ёмкость') 
	tank_cont = ['объёмом','вместимостью'].iz();//чтобы без "ёмкость ёмкостью"
else 
	tank_cont = ['объёмом','ёмкостью','вместимостью'].iz();
vol_dif = sluchch(2,10);
time_dif = sluchch(2,15);
var i = [1,2].iz();//род механизма должен совпадать с родом числительного
if (i == 1)
{
	mechanic = ['труба'].iz();
	num1 = 'первая';
	num2 = 'вторая';
	ono = 'она';
}
else if (i == 2)
{
	if (doin != 'опустошает') 
		mechanic = ['насос','шланг'].iz();//чтобы шлангами не опустошать - странно это
	else 
		mechanic = ['насос'].iz();
	num1 = 'первый';
	num2 = 'второй';
	ono = 'он';
}
var vol_of_tank = vol_dif*time_dif*(Math.pow(sluchch(2,10),2)-1)/4;
//чтобы дискриминант при решении всегда был квадратом целого числа
var water = ['воды','жидкости'].iz();
var litr = sklonlxkand(['литр','кубометр'].iz());
NAtask.setTask({
text:   num1.toZagl()+' '+mechanic+' пропускает на '+chislitlx(vol_dif,litr)+' '+water+' в минуту меньше, чем '+num2+'.'+
	' Сколько '+litr.rm+' '+water+' в минуту пропускает '+num2+' '+mechanic+', если '+tank+' '+tank_cont+
	' '+chislitlx(vol_of_tank,litr)+' '+ono+' '+doin+' на '+chislitlx(time_dif,'минута')+' быстрее, чем '+num1+' '+mechanic+'?\n',
answers: ((Math.sqrt(Math.pow(vol_dif*time_dif,2)+4*vol_dif*time_dif*vol_of_tank))/(2*time_dif)+vol_dif/2),
});
})();
//Обзад 26599
//Aisse-258

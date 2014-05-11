(function() { 'use strict'; 
/*Исходный текст задачи:

Для ремонта квартиры требуется "37" "рулонов" обоев. 
Сколько пачек обойного клея нужно купить, если одна пачка клея рассчитана на "6" "рулонов"?

*/

var rul='рулон';  
var nyzhrul=sluchch(10,50,1);
var rulNApach=sluchch(1,10,1);

window.vopr.txt=  
	'Для ремонта '+['квартиры','дома','комнаты','кабинета','дачи','помещения'].iz()+' требуется '+
	chislitlx(nyzhrul,rul)+
	' обоев. Сколько пачек обойного клея нужно купить, если одна пачка клея рассчитана на '+ 
	chislitlx(rulNApach,rul) +
	'?';
	
window.vopr.ver=[ ( nyzhrul/rulNApach ).ceil().ts() ];  

window.vopr.kat['log']=0;  //Логарифмы
window.vopr.kat['prz']=0;  //Производная
window.vopr.kat['drs']=0;  //Дробные (нецелые) степени
window.vopr.kat['tri']=0;  //Тригонометрия

})(); 
//Обзад 323510
//DjUsagi

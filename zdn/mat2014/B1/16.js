(function(){

var kolvodet=sl(100,300);
var kolvovzr=sl(10,40);
var nazvdet=sklonlxkand(['школьник','ребёнок','пионер','учащийся',].iz());
var nazvvzr=sklonlxkand(['взрослый','педагог','учитель','преподаватель','вожатый','родитель',].iz());
var chel=sl(20,90);

NAtask.setTask({
	text : 'В '+
	['летнем','спортивном','пионерском','детском','детском оздоровительном','оздоровительном',].iz()+
	' лагере '+chislitlx(kolvovzr,nazvvzr.ie)+' и '+chislitlx(kolvodet,nazvdet.ie)+
	'. В автобус помещается не более '+chislitlx(chel,'пассажир')+
	'. Сколько автобусов требуется, чтобы перевезти всех из лагеря в город?',
	answers : ((kolvodet+kolvovzr)/chel).ceil().ts(),
});
})();
//Обзад 26635

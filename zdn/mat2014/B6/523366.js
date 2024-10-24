//47. Задание 4 № 523366
//Вероятность того, что на тестировании по истории учащийся Т.
//верно решит больше 8 задач, равна 0,76. Найдите вероятность
//того, что Т. верно решит ровно 8 задач или меньше.

(function(){'use strict';
NAinfo.requireApiVersion(0, 0);
var max = sluchch(6,12);
var ver = (sluchch(58,84))/100;
var answers = 1-ver;
	
var name = om.rusbukv.iz();
var man = ['школьник','ученик','учащийся','студент','абитуриент'].iz();
var exam;
if (man == 'школьник' || man == 'ученик' || man == 'учащийся'){
	exam = ['экзамене', 'проверочной работе', 'контрольной работе','тестировании','тесте'].iz();
} else if (man == 'студент'){
	exam = ['экзамене', 'коллоквиуме', 'зачете','проверочной работе','тестировании','тесте'].iz();
} else if (man == 'абитуриент') {
	exam =['экзамене','вступительном испытании','тестировании','тесте'].iz();
}

var predm = ['истории','биологии','физике','математике','химии','географии'].iz();

NAtask.setTask({
	text: 'Вероятность того, что на '+exam+' по '+predm+' '+man+' '+name+'. '+
		'верно решит больше '+max+' задач, равна '+ver+'. Найдите вероятность '+
		'того, что '+name+'. верно решит ровно '+max+' задач  или меньше.',
	answers,
	authors: ['aisse-258'],
});
NAtask.modifiers.allDecimalsToStandard();
})();

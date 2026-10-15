//Задача 21 ЕГЭ-база (smekalka): теннис круговой
(function(){
 'use strict';
 retryWhileError(function(){
  NAinfo.requireApiVersion(0, 2);

  var names = om.maleNames.iz(3);
  var a = slKrome([9, 10, 11, 12, 13], 3, 44);
  var b = 2 * a + 1;
  genAssert(b > a, 'второй сыграл больше партий');
  NAtask.setTask({
   text: names[0] + ', ' + names[1] + ' и ' + names[2] + ' играют в настольный теннис: игрок, проигравший партию, уступает место игроку, не участвовавшему в ней. В итоге оказалось, что ' + names[0] + ' сыграл ' + chislitlx(a, 'партия', '$v') + ', а ' + names[1] + ' — ' + b + '. Сколько партий сыграл ' + names[2] + '?',
   answers: b - a,
 });
 }, 1000);
})();
//11497144
//Открытый банк заданий, AF6EB8 (задание 21, ЕГЭ-база)
//chas-ege-selena

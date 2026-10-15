//Задача 21 ЕГЭ-база (smekalka): Маша и Медведь
(function(){
 'use strict';
 retryWhileError(function(){
  NAinfo.requireApiVersion(0, 2);

  var key = '10556397';
  var preference = ['bearCookies', 'mashaCookies'];
  var rand = getSelectedPreferenceFromList(key, preference);
  var C = 5 * sluchch(12, 400, 1);
  var bank = [51, 55, 68, 85, 100, 102, 110, 115, 120, 140, 160];
  genAssert(bank.indexOf(C) < 0, 'это число занято прототипом банка');
  var who = rand == 0 ? 'Медведь' : 'Маша';
  NAtask.setTask({
   text: 'Маша и Медведь съели ' + chislitlx(C, 'печенье', '$') + ' и банку варенья, начав и закончив одновременно. Сначала Маша ела варенье, а Медведь — печенье, но в какой-то момент они поменялись. Медведь и то и другое ест в два раза быстрее Маши. Сколько печений ' + (rand == 0 ? 'съел' : 'съела') + ' ' + who + ', если варенья они съели поровну?',
   answers: rand == 0 ? 4 * C / 5 : C / 5,
   preference: preference,
 });
 }, 1000);
})();
//10556397
//Открытый банк заданий, A113ED (задание 21, ЕГЭ-база)
//chas-ege-selena

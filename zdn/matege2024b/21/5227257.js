//Задача 21 ЕГЭ-база (smekalka): числа A, B, C
(function(){
 'use strict';
 retryWhileError(function(){
  NAinfo.requireApiVersion(0, 2);

  var lo = sl(3, 8);
  var hi = lo + sl(3, 6);
  var x = sluchch(5, 60, 1);
  var A = sl(lo + 1, hi - 1);
  var B = sl(lo + 1, hi - 1);
  var C = sl(lo + 1, hi - 1);
  var R = x * A + B - C;
  var xs = [];
  for (var A2 = lo + 1; A2 < hi; A2++)
   for (var B2 = lo + 1; B2 < hi; B2++)
    for (var C2 = lo + 1; C2 < hi; C2++) {
     var v = R - B2 + C2;
     if (v > 0 && v % A2 == 0 && xs.indexOf(v / A2) < 0) xs.push(v / A2);
    }
  genAssert(xs.length == 1, 'загаданное число единственно');
  NAtask.setTask({
   text: 'Про натуральные числа A, B и C известно, что каждое из них больше ' + lo + ', но меньше ' + hi + '. Загадали натуральное число, затем его умножили на A, потом прибавили к полученному произведению B и вычли C. Получилось ' + R + '. Какое число было загадано?',
   answers: x,
 });
 }, 1000);
})();
//5227257
//Открытый банк заданий, 4FC2F9 (задание 21, ЕГЭ-база)
//chas-ege-selena

//Задача 21 ЕГЭ-база (smekalka): квартиры и жители
(function(){
 'use strict';
 retryWhileError(function(){
  NAinfo.requireApiVersion(0, 2);

  var N = sluchch(12, 20, 1);
  var M = sl(3, 4);
  var i = sluchch(Math.ceil(N / 2), N - 1, 1);
  var j = sluchch(2, i, 1);
  var k = i - j + 1, A = j - 1, B = N - i;
  genAssert(A >= 1 && B >= 1 && k >= 1, 'невырожденные диапазоны');
  var X = sluchch(k, k * M, 1);
  var sumA = sluchch(A, A * M, 1);
  var sumB = sluchch(B, B * M, 1);
  var S1 = sumA + X, S2 = sumB + X;
  var lo = Math.max(k, S1 - A * M, S2 - B * M);
  var hi = Math.min(k * M, S1 - A, S2 - B);
  genAssert(lo == hi, 'число жильцов в пересечении определяется однозначно');
  NAtask.setTask({
   text: 'В доме всего ' + chislitlx(N, 'квартира', '$') + ', их номера от 1 до ' + N + '. В каждой квартире живёт не меньше одного и не больше ' + chislitlx(M, 'человек', '$r') + '. В квартирах с 1-й по ' + i + '-ю включительно живёт суммарно ' + chislitlx(S1, 'человек', '$') + ', а в квартирах с ' + j + '-й по ' + N + '-ю включительно живёт суммарно ' + chislitlx(S2, 'человек', '$') + '. Сколько всего человек живёт в этом доме?',
   answers: S1 + S2 - lo,
 });
 }, 1000);
})();
//2539187
//Открытый банк заданий, 26BEB3 (задание 21, ЕГЭ-база)
//chas-ege-selena

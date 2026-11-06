//Задача 21 ЕГЭ-база (smekalka): викторина и очки
(function(){
 'use strict';
 retryWhileError(function(){
  NAinfo.requireApiVersion(0, 2);

  var c = sluchch(10, 40, 1);
  var w = sluchch(1, 10, 1);
  var u = sl(0, 10);
  var p = sl(6, 10);
  var m = sluchch(9, 17, 1);
  var S = p * c - m * w;
  genAssert(S > 0, 'очки положительны');
  var Q = c + w + u;
  var cnt = 0;
  for (var cc = 0; cc <= Q; cc++) {
   var num = p * cc - S;
   if (num < 0 || num % m !== 0) continue;
   var ww = num / m;
   if (ww < 1 || cc + ww > Q) continue;
   cnt++;
  }
  genAssert(cnt == 1, 'число верных ответов единственно');
  NAtask.setTask({
   text: 'Список заданий викторины состоял из ' + chislitlx(Q, 'вопрос', '$r') + '. За каждый правильный ответ участник получал ' + chislitlx(p, 'очко', '$') + ', за неправильный ответ с него списывали ' + chislitlx(m, 'очко', '$') + ', а при отсутствии ответа давали 0 очков. Сколько верных ответов дал участник, набравший ' + chislitlx(S, 'очко', '$') + ', если известно, что по крайней мере один раз он ошибся?',
   answers: c,
 });
 }, 1000);
})();
//6616584
//Открытый банк заданий, 64F608 (задание 21, ЕГЭ-база)
//chas-ege-selena

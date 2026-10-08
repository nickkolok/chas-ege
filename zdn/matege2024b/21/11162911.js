//Задача 21 ЕГЭ-база (smekalka): улитка на дереве
(function(){
 'use strict';
 retryWhileError(function(){
  NAinfo.requireApiVersion(0, 2);

  var a = sl(2, 8);
  var b = sl(1, a - 1);
  var H = sluchch(a + 3, 50, 1);
  var d = ((H - a) / (a - b)).ceil() + 1;
  NAtask.setTask({
   text: 'Улитка за день заползает вверх по дереву на ' + a + ' м, а за ночь сползает на ' + b + ' м. Высота дерева ' + H + ' м. За какое наименьшее количество дней улитка доползёт до вершины дерева, начав путь от его основания?',
   answers: d,
 });
 }, 1000);
})();
//11162911
//Открытый банк заданий, AA551F (задание 21, ЕГЭ-база)
//chas-ege-selena

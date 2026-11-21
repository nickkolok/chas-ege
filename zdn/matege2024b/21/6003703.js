//Задача 21 ЕГЭ-база (smekalka): рыжики и грузди
(function(){
 'use strict';
 retryWhileError(function(){
  NAinfo.requireApiVersion(0, 2);

  var T = sl(30, 90);
  var d1 = sluchch(Math.floor(T / 2) + 1, T, 1);
  var d2 = T + 2 - d1;
  genAssert(d2 >= 2, 'грузди присутствуют');
  genAssert(!(T == 50 && d1 == 27), 'это число занято прототипом банка');
  NAtask.setTask({
   text: 'В корзине ' + chislitlx(T, 'гриб', '$') + ': рыжики и грузди. Известно, что среди любых ' + chislitlx(d1, 'гриб', '$r') + ' имеется хотя бы один рыжик, а среди любых ' + chislitlx(d2, 'гриб', '$r') + ' — хотя бы один груздь. Сколько рыжиков в корзине?',
   answers: d2 - 1,
 });
 }, 1000);
})();
//6003703
//Открытый банк заданий, 5B9BF7 (задание 21, ЕГЭ-база)
//chas-ege-selena

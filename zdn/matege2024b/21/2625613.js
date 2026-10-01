//Задача 21 ЕГЭ-база (smekalka): прямоугольник: периметры/площади
(function(){
 'use strict';
 retryWhileError(function(){
  NAinfo.requireApiVersion(0, 2);

  var key = '%(dec)d';
  var preference = ['perimetry', 'ploshadi'];
  var rand = getSelectedPreferenceFromList(key, preference);
  var x1 = sl(1, 9), x2 = sl(1, 9), y1 = sl(1, 9), y2 = sl(1, 9);
  var cw = 'Периметры трёх из них, начиная с левого верхнего и далее по часовой стрелке, равны ';
  var ans;
  if (rand == 0) {
   cw += 2 * (x1 + y1) + ', ' + 2 * (x2 + y1) + ' и ' + 2 * (x2 + y2) + '. Найдите периметр четвёртого прямоугольника.';
   ans = 2 * (x1 + y2);
  } else {
   cw = 'Площади трёх из них, начиная с левого верхнего и далее по часовой стрелке, равны ' + x1 * y1 + ', ' + x2 * y1 + ' и ' + x2 * y2 + '. Найдите площадь четвёртого прямоугольника.';
   ans = x1 * y2;
  }
  NAtask.setTask({
   text: 'Прямоугольник разбит на четыре меньших прямоугольника двумя прямолинейными разрезами. ' + cw,
   answers: ans,
   preference: preference,
 });
 }, 1000);
})();
//2625613
//Открытый банк заданий, 28104D (задание 21, ЕГЭ-база)
//chas-ege-selena

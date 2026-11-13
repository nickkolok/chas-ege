//Задача 21 ЕГЭ-база (smekalka): клетки таблицы
(function(){
 'use strict';
 retryWhileError(function(){
  NAinfo.requireApiVersion(0, 2);

  var m = sl(4, 11);
  var n = sl(4, 11);
  var grid = [];
  for (var i = 0; i < m; i++) { grid.push([]); for (var j = 0; j < n; j++) grid[i].push(sl1()); }
  var X = 0, Y = 0;
  for (var i2 = 0; i2 < m; i2++)
   for (var j2 = 0; j2 < n; j2++) {
    if (j2 + 1 < n) { if (grid[i2][j2] != grid[i2][j2 + 1]) X++; else if (grid[i2][j2]) Y++; }
    if (i2 + 1 < m) { if (grid[i2][j2] != grid[i2 + 1][j2]) X++; else if (grid[i2][j2]) Y++; }
   }
  var total = 2 * m * n - m - n;
  var W = total - X - Y;
  genAssert(X >= 2 && Y >= 2 && W >= 2, 'все три типа пар присутствуют');
  NAtask.setTask({
   text: 'Клетки таблицы ' + m + '$\\times$' + n + ' раскрашены в чёрный и белый цвета так, что ' + (X % 10 == 1 && X % 100 != 11 ? 'получилась' : 'получилось') + ' ' + chislitlx(X, 'пара', '$') + ' соседних клеток разного цвета и ' + chislitlx(Y, 'пара', '$') + ' соседних клеток чёрного цвета. (Клетки считаются соседними, если у них есть общая сторона.) Сколько пар соседних клеток белого цвета?',
   answers: W,
 });
 }, 1000);
})();
//2121218
//Открытый банк заданий, 205E02 (задание 21, ЕГЭ-база)
//chas-ege-selena

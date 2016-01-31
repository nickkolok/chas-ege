(function() {
  NAinfo.requireApiVersion(0, 2);

  var number = sl(3, 5);
  var c = [
    [0, 2, 4, 3, 2],
    [1, 1, 3, 'n', '(n - 1)'],
  ].iz();

  function F(n) {
    if (n == 1)
      return c[1];
    else if (n == 2)
      return c[2];
    else
      switch (c[0]) {
      case 0:
        return 3 * F(n - 1) + F(n - 2) * 2;
        break;
      case 1:
        return n * F(n - 1) + F(n - 2) * (n - 1);
        break;
      }
  }
  NAtask.setTask({
    text: 'Алгоритм вычисления значенияфункции $ F(n) $ , где $ n $ - натуральное число, задан следущими отношениями:$ F(1) = ' +
            c[1] + '; F(2) = ' + c[2] + '; F(n) = F(n-1) * ' + c[3] + ' + F(n - 2) * ' + c[4] +
            ' $,где $ n > 2 $. Чему равно значение функции $ F(' + number + ') $? В ответе запишите тоько натуральное число.',
    answers: F(number),
  })
})();

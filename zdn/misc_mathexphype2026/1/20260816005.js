(function(){'use strict';retryWhileError(function(){
  NAinfo.requireApiVersion(0, 2);
  
  let fat = [1.5, 2.5, 3.2, 3.6];
  let variants = [
    {counts: [4, 10, 25, 10]},
    {counts: [18, 20, 10, 10]},
    {counts: [5, 5, 10, 5]},
    {counts: [3, 6, 6, 2]},
    {counts: [5, 25, 10, 2]},
  ].iz();
  
  let c = variants.counts;
  let total = c[0] + c[1] + c[2] + c[3];
  
  let M = (fat[0]*c[0] + fat[1]*c[1] + fat[2]*c[2] + fat[3]*c[3]) / total;
  M = Math.round(M * 10) / 10;
  let Mstr = M.toFixed(1);
  
  let fatStr = fat.map(f => f.toFixed(1));
  
  let paketForm = c.map(x => x + ' ' + chislit(x, 'пакет', 'пакета', 'пакетов'));
  
  let condition = 'Для приготовления картофельного пюре любимому внуку бабушка случайным образом берёт пакет молока из холодильника. ' +
    'В холодильнике хранятся пакеты молока разной жирности: ' +
    fatStr[0] + '% — ' + paketForm[0] + ', ' +
    fatStr[1] + '% — ' + paketForm[1] + ', ' +
    fatStr[2] + '% — ' + paketForm[2] + ' и ' +
    fatStr[3] + '% — ' + paketForm[3] + '. ' +
    'Найдите математическое ожидание жирности (в процентах) молока в случайно выбранном пакете.';
  
  let analys = 'Математическое ожидание случайной величины $X$ (жирности молока) равно сумме произведений её возможных значений на вероятности этих значений.<br/>' +
    'Общее количество пакетов молока: $' + total + '$.<br/>' +
    'Вероятность взять пакет каждого вида равна отношению количества таких пакетов к общему числу пакетов.<br/>' +
    '$$M(X) = ' + fatStr[0] + ' \\cdot \\frac{' + c[0] + '}{' + total + '} + ' +
    fatStr[1] + ' \\cdot \\frac{' + c[1] + '}{' + total + '} + ' +
    fatStr[2] + ' \\cdot \\frac{' + c[2] + '}{' + total + '} + ' +
    fatStr[3] + ' \\cdot \\frac{' + c[3] + '}{' + total + '} = ' + Mstr + '$$';
  
  NAtask.setTask({
    text: condition,
    answers: M,
    analys: analys,
  });
  NAtask.modifiers.allDecimalsToStandard(true);
}, 2000);})();

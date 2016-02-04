(function() {
  NAinfo.requireApiVersion(0, 2);

  var ab = sl(20, 90, 10);
  var ak = 10;
  var ok = (ab * ab - ak * ak) / (2 * ak);

  NAtask.setTask({
    text: 'К окружности с центром в точке $ O $ проведены касательная' +
      ' $ AB $ и секущая $ AO $. Найдите радиус окружности, если $ AB = ' + ab + ', AO = ' + (ok + ak) + '$.',
    answers: ok,
  })
})();

//  hripunov
//  324689 http://ege-ok.ru/2015/02/20/okruzhnost-vpisannyie-uglyi-oge-gia-zadanie-10-ege-zadanie-

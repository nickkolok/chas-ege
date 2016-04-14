(function() {
  NAinfo.requireApiVersion(0, 2);

  var firstMember = sl(-100, 100);
  var d = sl(-10, 10);
  var targetNumber = (5, 45);

  NAtask.setTask({
    text: 'Дана арифметическая прогрессия ' + firstMember + '; ' + (firstMember + d) + '; ... Найдите ' + targetNumber + '-й член прогрессии.',
    answers: firstMember + d * (targetNumber - 1),
  });
})();

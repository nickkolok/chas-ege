//Задача 21 ЕГЭ-база (smekalka): выпавшие листы
(function(){
 'use strict';
 retryWhileError(function(){
  NAinfo.requireApiVersion(0, 2);

  var P = sluchch(102, 798, 2);
  var bank = [254, 274, 276, 294, 296, 298, 324, 326, 328, 352, 372, 392, 476, 496, 498];
  genAssert(bank.indexOf(P) < 0, 'это число занято прототипом банка');
  var ds = String(P).split('');
  var perms = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
  var qs = [];
  for (var t = 0; t < perms.length; t++) {
   var Q = parseInt(ds[perms[t][0]] + ds[perms[t][1]] + ds[perms[t][2]], 10);
   if (Q == P || Q <= P + 1 || Q % 2 == 0) continue;
   if (qs.indexOf(Q) < 0) qs.push(Q);
  }
  genAssert(qs.length == 1, 'первая страница после листов единственна');
  var Q0 = qs[0];
  NAtask.setTask({
   text: 'Из книги выпало несколько идущих подряд листов. Номер последней страницы перед выпавшими листами — ' + P + ', номер первой страницы после выпавших листов записывается теми же цифрами, но в другом порядке. Сколько листов выпало?',
   answers: (Q0 - P - 1) / 2,
 });
 }, 1000);
})();
//14787143
//Открытый банк заданий, E1A247 (задание 21, ЕГЭ-база)
//chas-ege-selena

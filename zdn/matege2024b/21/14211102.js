//Задача 21 ЕГЭ-база (smekalka): отметки и умножение
(function(){
 'use strict';
 retryWhileError(function(){
  NAinfo.requireApiVersion(0, 2);

  var two = [22, 23, 24, 25, 32, 33, 34, 35, 42, 43, 44, 45, 52, 53, 54, 55];
  var chunks = [sl(2, 5), sl(2, 5), two.iz()];
  var P = chunks[0] * chunks[1] * chunks[2];
  var digs = (chunks.join('')).split('').map(Number);
  var N = digs.length;
  genAssert(N <= 6, 'не больше шести отметок');
  var bankP = [414, 1150, 1338, 1398, 2007, 2097, 2118, 2230, 2330, 3138, 3177, 3345, 3440, 3495, 3530, 4707, 5230, 5295, 5575, 5825, 7845, 8825, 13075];
  genAssert(N != 5 || bankP.indexOf(P) < 0, 'это произведение занято прототипом банка');
  var means = [];
  for (var mask = 1; mask < (1 << (N - 1)); mask++) {
   for (var code = 0; code < Math.pow(4, N); code++) {
    var seq = [], cc = code;
    for (var t = 0; t < N; t++) { seq.push(2 + cc % 4); cc = Math.floor(cc / 4); }
    var ch = [seq[0]], pr = 1;
    for (var t2 = 1; t2 < N; t2++) {
     if (mask >> (t2 - 1) & 1) ch.push(seq[t2]);
     else ch[ch.length - 1] = ch[ch.length - 1] * 10 + seq[t2];
    }
    var pp = 1;
    for (var t3 = 0; t3 < ch.length; t3++) pp *= ch[t3];
    if (pp == P) {
     var sm = 0;
     for (var t4 = 0; t4 < N; t4++) sm += seq[t4];
     var mn = Math.floor(sm / N + 0.5);
     if (means.indexOf(mn) < 0) means.push(mn);
    }
   }
  }
  genAssert(means.length == 1, 'итоговая отметка единственна');
  var name = om.maleNames.iz();
  var gen = sklonlxkand(name).re;
  NAtask.setTask({
   text: 'В конце четверти ' + name + ' выписал подряд все свои отметки по одному из предметов, их оказалось ' + N + ', и поставил между некоторыми из них знаки умножения. Произведение получившихся чисел оказалось равным ' + P + '. Какая отметка выходит у ' + gen + ' в четверти по этому предмету, если учитель ставит только отметки «2», «3», «4» или «5» и итоговая отметка в четверти является средним арифметическим всех текущих отметок, округлённым по правилам округления? (Например: 3,2 округляется до 3; 4,5 — до 5; 2,8 — до 3.)',
   answers: means[0],
 });
 }, 1000);
})();
//14211102
//Открытый банк заданий, D8D81E (задание 21, ЕГЭ-база)
//chas-ege-selena

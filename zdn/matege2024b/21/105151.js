//Задача 21 ЕГЭ-база (smekalka): подъезд по номеру квартиры
(function(){
 'use strict';
 retryWhileError(function(){
  NAinfo.requireApiVersion(0, 2);

  var F = sl(4, 9);
  var q = sl(2, 4);
  var ent = sl(2, 5);
  var apt = sluchch(F * q * (ent - 1) + 1, F * q * ent, 1);
  var name = sklonlxkand([om.maleNames.iz(), om.femaleNames.iz()][sl1()]);
  NAtask.setTask({
   text: 'В доме, в котором живёт ' + name.ie + ', ' + chislitlx(F, 'этаж', '$') + ' и несколько подъездов. В каждом подъезде на каждом этаже находится по ' + q + ' квартиры. ' + name.ie + ' живёт в квартире № ' + '$' + apt + '$' + '. В каком подъезде живёт ' + name.ie + '?',
   answers: ent,
 });
 }, 1000);
})();
//105151
//Открытый банк заданий, 019ABF (задание 21, ЕГЭ-база)
//chas-ege-selena

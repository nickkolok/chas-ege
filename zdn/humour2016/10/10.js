//
//  10. Потомственный коррупционер Федя Взяткин планирует откосить от армии под 
//  углами 4 и 266. Помогите Феде рассчитать сумму, которую нужно попросить у 
//  отца, если она выражается формулой |161293 (cos 4°)/(-sin 266°)|
//

(function(){'use strict';
NAinfo.requireApiVersion(0, 0);

var PI = 3.14;
var angle1 = sl(3,15);
var angle2 = sl(220,300);
var angle1rad = angle1 * (PI / 180);
var angle2rad = angle2 * (PI / 180);

NAtask.setTask({
  text: 'Потомственный коррупционер Федя Взяткин планирует откосить от армии под ' + 
  'углами ' + angle1 + ' и ' + angle2 + '. Помогите Феде рассчитать сумму, которую нужно попросить у ' + 
  'отца, если она выражается формулой $|161293 (cos ' + angle1 + '°)/(-sin ' + angle2 + '°)|$',
  answers: Math.abs((161293 * Math.cos(angle1rad)) / (-1) * (Math.sin(angle2rad))).okrugldo(0.01),
});
    
})();

//
//  Юмористически набор, №10
//  https://bitbucket.org/chas-ege-team/chas-ege/issues/55/
//  hripunov
//


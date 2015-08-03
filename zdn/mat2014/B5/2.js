(function(){'use strict';

var nS=sluchch(11,99);
var aV=[1,2,3,4].shuffle();
var nS1=nS*aV[0];
var nS2=nS*aV[1];
var tTr=[
	'',
	'треугольника $'+[ ['A','B','C'].iz()+'DE', ['D','E'].iz()+'AB' ].iz().mesh()+'$',
	'треугольника $'+['CDB','CEA'].iz().mesh()+'$',
	'трапеции $'+['ADEB','BEDA'].iz()+'$',
	'треугольника $'+'ABC'.mesh()+'$',
];

NAtask.setTask({
	text: 'В треугольнике $ABC$ $DE$ – средняя линия, $D\\in AC$, $E\\in CB$. Площадь '+tTr[aV[0]]+'равна '+nS1+
		'. Найдите площадь '+tTr[aV[1]]+'.',
	answers: nS2,
});
chas2.task.modifiers.variativeABC();

})();

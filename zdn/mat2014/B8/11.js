(function(){'use strict';

var t2=['центральный'	,'вписанный'	];
var t3=['больше'		,'меньше'		];
var t4=['вписанного'	,'центрального'	];
var v1=sl1();
var vpis=sl(1,89);

NAtask.setTask({
	text: 'Найдите '+t2[v1]+' угол $ABC$, если он на '+vpis+
		'° '+t3[v1]+' '+t4[v1]+' угла $ADC$, опирающегося на ту же дугу. Ответ дайте в градусах.',
	answers: v1?vpis:vpis*2,
});
chas2.task.modifiers.variativeABC();

})();
//Обзад 245393
//Николай Авдеев

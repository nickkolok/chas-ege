(function() { 'use strict'; retryWhileError(function() {
    let R1 = sl(2, 150);
    let R = sl(1, R1);
    let ans = R*R1/(R1-R);
    genAssertZ1000(ans);

	NAtask.setTask({
		text: `В розетку электросети подключена электрическая духовка, сопротивление которой составляет $R_1$ = ${R1} Ом. Параллельно с ней в розетку 
        предполагается подключить электрообогреватель, сопротивление которого $R_2$ (в Ом). При параллельном соединении двух электроприборов с 
        сопротивлениями $R_1$ и $R_2$ их общее сопротивление вычисляется по формуле $R_{\\mbox{общ}} = \\frac{R_1 R_2}{R_1 + R_2}$. Для
        нормального функционирования электросети общее сопротивление в ней должно быть не меньше ${R} Ом. Определите наименьшее возможное сопротивление 
        $R_2$ электрообогревателя. Ответ дайте в омах.`,
		answers: ans,
		authors: ['mcFrene'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
}, 2000);})();
//mcFrene
/*РешуЕГЭ: 27975: 28257, 42107, 42111, 42113, 627983, 28259, 28261, 28263, 28265, 
42051, 42053, 42055, 42057, 42059, 42061, 42063, 42065, 42067, 42069, 42071, 
42073, 42075, 42077, 42079, 42081, 42083, 42085, 42087, 42089, 42091, 42093, 
42095, 42097, 42099, 42101, 42103, 42105, 42109
*/

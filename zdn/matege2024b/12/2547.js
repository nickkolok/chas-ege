(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let rhombus = new Rhombus({ 
            length: sl(1,50), 
            angles: { 
                angle: { angleA: 60 },
                angleInDegree: true,
            },
        });
        
        let answ = rhombus.lengthDiagonalBD;

		NAtask.setTask({
				text: `В параллелограмме $ABCD$ диагонали перпендикулярны. Сумма углов ${[`$A$ и $C$ равна $120^\\circ$`, `$B$ и $D$ равна $240^\\circ$`].iz()}, $${['AB', 'BC', 'CD', 'DA'].iz()}=${rhombus.lengthAB}$. Найдите $BD$.`,
			answers: answ,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.variativeABC();
		NAtask.modifiers.allDecimalsToStandard(true);

	}, 2000);
})();
// https://self-edu.ru/ege2023_base_30.php?id=2_12

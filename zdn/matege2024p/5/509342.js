(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = '509342';
		
		// Генерация вероятностей на ветвях дерева
		// P(A) и P(not A) - первая развилка
		let p1 = sluchch(1, 9) / 10; // 0.2 ... 0.8
		let pNot1 = 1 - p1;
		
		// Условные вероятности на второй развилке (слева)
		let q1 = sluchch(1, 9) / 10;
		let qNot1 = 1 - q1;
		
		// Условные вероятности на второй развилке (справа)
		let q2 = sluchch(1, 9) / 10;
		let qNot2 = 1 - q2;

		// Расчет вероятностей элементарных событий (листьев дерева)
		// a: левая-верхняя (p1 * q1) - по условию задачи входит в A
		let p_a = p1 * q1;
		// b: левая-нижняя (p1 * qNot1) - входит в A и B
		let p_b = p1 * qNot1;
		// c: правая-верхняя (pNot1 * q2) - входит в A и B
		let p_c = pNot1 * q2;
		// d: правая-нижняя (pNot1 * qNot2) - входит только в B
		let p_d = pNot1 * qNot2;

		// Событие A благоприятствуют исходы: a, b, c
		// Событие B благоприятствуют исходы: b, c, d
		// Пересечение A и B: b, c

		let p_B = p_b + p_c + p_d;
		let p_A_intersect_B = p_b + p_c;
		
		genAssert(p_B > 0.001, "Вероятность B слишком мала");
		
		let answer = math.divide(p_A_intersect_B, p_B);
		
		genAssertZ1000(answer);
		genAssert(answer < 1, "Вероятность не может быть >= 1");

		let paint = function(ctx) {
			let w = 400;
			let h = 400;
			ctx.translate(w / 2, h / 2 + 70);
			ctx.scale(20, -20);
			ctx.lineWidth = 0.1;
			
			// --- Рисуем линии ---
			// Левая ветвь от корня
			ctx.drawLine(0, 10, -5, 4);
			// Правая ветвь от корня
			ctx.drawLine(0, 10, 5, 4);
			
			// От левой развилки (-5, 4)
			ctx.drawLine(-5, 4, -7, -1); // к a
			ctx.drawLine(-5, 4, -3, -1); // к b
			
			// От правой развилки (5, 4)
			ctx.drawLine(5, 4, 3, -1);  // к c
			ctx.drawLine(5, 4, 7, -1);  // к d
			
			let r = 0.2; 
			
			// Корень S (0, 10)
			ctx.drawFilledCircle(0, 10, r);
			
			// Первая развилка слева (-5, 4)
			ctx.drawFilledCircle(-5, 4, r);
			
			// Первая развилка справа (5, 4)
			ctx.drawFilledCircle(5, 4, r);
			
			// Листья (концы линий)
			ctx.drawFilledCircle(-7, -1, r); // a
			ctx.drawFilledCircle(-3, -1, r); // b
			ctx.drawFilledCircle(3, -1, r);  // c
			ctx.drawFilledCircle(7, -1, r);  // d
			
			ctx.drawEllipse(-2, -1, 7, 2);
			ctx.drawEllipse(2, -1, 7, 2);
			
			// --- Подписи ---
			ctx.font = "18px liberation_sans";
			ctx.scale(1/20, -1/20);
			ctx.lineWidth = 1;
			
			// Вероятности на ребрах
			ctx.signSegmentInMiddle(0, -12*20, -7*20, -6*20, p1.ts(), 15, 30);
			ctx.signSegmentInMiddle(-8*20, -4*20, -6*20, 1*20, q1.ts(), 15, 30);
			ctx.signSegmentInMiddle(-4*20, -4*20, -2*20, 1*20, qNot1.ts(), 15, 30);
			
			ctx.signSegmentInMiddle(0, -12*20, 5*20, -6*20, pNot1.ts(), 15, 30);
			ctx.signSegmentInMiddle(2*20, -4*20, 1*20, 1*20, q2.ts(), 15, 30);
			ctx.signSegmentInMiddle(7*20, -4*20, 8*20, 1*20, qNot2.ts(), 15, 30);
			
			// Подписи вершин и листьев
			ctx.fillText('S', 0, -10.5*20);
			
			// Листья a, b, c, d (чуть ниже точек)
			ctx.fillText('a', -7*20, -1*20 + 60);
			ctx.fillText('b', -3*20, -1*20 + 60);
			ctx.fillText('c', 3*20, -1*20 + 60);
			ctx.fillText('d', 7*20, -1*20 + 60);
			
			ctx.fillText('A', -8*20, 0.5*20 + 60);
			ctx.fillText('B', 8*20, 0.5*20 + 60);
		};

		NAtask.setTask({
			text: `На рисунке показано дерево некоторого случайного эксперимента. Событию $A$ благоприятствуют элементарные события $a$, $b$ и $c$, а событию $B$ благоприятствуют элементарные события $b$, $c$ и $d$. Найдите $P(A|B)$ — условную вероятность события $A$ при условии $B$.`,
			answers: answer,
			analys: `По определению условной вероятности: $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$.` +
					`<br/>Из условия задачи: $A = \\{a, b, c\\}$, $B = \\{b, c, d\\}$.` +
					`<br/>Тогда пересечение $A \\cap B = \\{b, c\\}$.` +
					`<br/>Найдем вероятности элементарных событий по дереву:` +
					`<br/>$P(a) = ${p1.ts()} \\cdot ${q1.ts()} = ${p_a.ts()}$;` +
					`<br/>$P(b) = ${p1.ts()} \\cdot ${qNot1.ts()} = ${p_b.ts()}$;` +
					`<br/>$P(c) = ${pNot1.ts()} \\cdot ${q2.ts()} = ${p_c.ts()}$;` +
					`<br/>$P(d) = ${pNot1.ts()} \\cdot ${qNot2.ts()} = ${p_d.ts()}$.` +
					`<br/>$P(B) = P(b) + P(c) + P(d) = ${p_b.ts()} + ${p_c.ts()} + ${p_d.ts()} = ${p_B.ts()}$.` +
					`<br/>$P(A \\cap B) = P(b) + P(c) = ${p_b.ts()} + ${p_c.ts()} = ${p_A_intersect_B.ts()}$.` +
					`<br/>$P(A|B) = \\frac{${p_A_intersect_B.ts()}}{${p_B.ts()}} = ${answer.ts()}$.`
		});
		
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint,
		});
	});
})();
//509342

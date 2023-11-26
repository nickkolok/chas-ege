(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let score1 = [1, 2, 3, 4, 5, 6];
		let score2 = [1, 2, 3, 4, 5, 6];
		let deleted = sl(0, 5);
		score1.splice(deleted, 1);
		score2.splice(deleted, 1);
		let result = score1[sl(0, 4)] + score2[sl(0, 4)];
		let count = 0;
		for (let i = 0; i < 5; i++)
			for (let j = 0; j < 5; j++)
				if (score1[i] + score2[j] == result)
					count++;
		NAtask.setTask({
			text: 'Игральную кость бросили два раза. ' +
				'Известно, что ' + (deleted + 1) + ' ' + chislit((deleted + 1), 'очко', 'очка', 'очков') +
				' не выпало ни разу. ' +
				'Найдите при этом условии вероятность события "сумма очков равна ' + result + '".',
			answers: count / 25,
			analys: '',
		});
	});
})();
//508769 508770 508771 508772 508773 508774 508775 508776 508777 508778 508779
//SugarHedgehog

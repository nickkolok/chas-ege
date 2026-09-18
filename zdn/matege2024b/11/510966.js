(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let k_r_opts = [
			{text: 'вдвое', val: 2},
			{text: 'втрое', val: 3},
			{text: 'вчетверо', val: 4},
			{text: 'впятеро', val: 5}
		];
		let k_h_opts = [
			{text: 'в полтора раза', val: 1.5},
			{text: 'вдвое', val: 2},
			{text: 'втрое', val: 3},
			{text: 'вчетверо', val: 4}
		];

		let k_h = k_h_opts.iz();
		let k_r;
		if (k_h.val === 1.5) {
			k_r = [{text: 'вдвое', val: 2}, {text: 'вчетверо', val: 4}].iz();
		} else {
			k_r = k_r_opts.iz();
		}
		
		let ans = k_r.val * k_r.val * k_h.val;

		NAtask.setTask({
			text: 'Даны две кружки цилиндрической формы. Первая кружка ' + k_h.text + ' ниже второй, ' +
			      'а вторая ' + k_r.text + ' шире первой. Во сколько раз объём второй кружки больше объёма первой?',
			answers: ans,
		});
	}, 1000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=510966

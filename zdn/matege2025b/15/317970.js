(function() {
	let difference = ['уменьшилась', 'увеличилась'];
	let deIncreased = ['уценки', 'наценки'];
	let slTime1 = sl1();
	let newPrice = sluchch(0.39, 0.99, 0.01) + slTime1;
	let answer = Math.abs(1 - newPrice) * 100;
	let products = [' телефона ', '  телевизора ', ' миксера ', ' фена ', ' утюга ',
		' пылесоса ', ' холодильника ', ' кондиционера ', ' ноутбука ',
		' компьютера ', ' обогревателя ', ' планшета ', ' мотоцикла ', ' велосипеда ',
		' стола ', ' шкафа ', ' чайника ', ' автомобиля '
	].iz();
	NAtask.setTask({
		text: 'После ' + deIncreased[slTime1] + ' ' + products + 'его новая цена составила ' + newPrice.ts() +
			' от старой цены. На сколько процентов ' + difference[slTime1] +
			' цена' + products + 'в результате ' + deIncreased[slTime1] + '?',
		answers: answer,
	});
})();
//317970

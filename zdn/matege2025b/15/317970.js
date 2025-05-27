(function() {
	let difference = ['уменьшилась', 'увеличилась'];
<<<<<<< HEAD
	let deIncreased = ['уценки', 'подорожания'];
	let slTime1 = sl1();
	let newPrice = sluchch(0.39, 0.99, 0.01) + slTime1;
	let answer = Math.abs(1 - newPrice) * 100;
	let products = ['телефона', 'телевизора', 'миксера', 'фена', 'утюга',
		'пылесоса', 'холодильника', 'кондиционера', 'ноутбука',
		'компьютера', 'обогревателя', 'планшета', 'мотоцикла', 'велосипеда',
		'стола', 'шкафа', 'чайника', 'автомобиля'
	].iz();
	NAtask.setTask({
		text: 'После ' + deIncreased[slTime1] + ' ' + products + ' его новая цена составила ' + newPrice.ts() +
=======
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
>>>>>>> d0c86315636833ca113a44d84f4e295517759f18
			' от старой цены. На сколько процентов ' + difference[slTime1] +
			' цена' + products + 'в результате ' + deIncreased[slTime1] + '?',
		answers: answer,
	});
})();
//317970
